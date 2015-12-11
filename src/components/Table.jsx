'use strict';

import React, { PropTypes } from 'react';
import { assign, forEach, isBoolean } from 'lodash';

import { Table, UCheck, } from 'amazeui-react';

const styles = {
	tr: {
		verticalAlign: 'middle',
		height: 10,
		textAlign: 'center',
	},
};

class Table extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedItems : {},
		};
	}

	componentWillReceiveProps(nextProps) {
		const selectedItems = {};
		let uncheckedCount = 0;
		nextProps.children.forEach((child, index) => {
			if (
				!this.props.children[index] ||
				child.key !== this.props.children[index].key
			) {
				selectedItems[index] = false;
				uncheckedCount++;
			}
		});

		if (uncheckedCount === nextProps.children.length) {
			this.checkAll(false);
		}
		this.setState({selectedItems});
	}

	getCheckedIndexes() {

		if (!this.props.selectable) return;

		let checkeds = [];
		forEach(this.state.selectedItems, function(val, key) {
			if (val) {
				checkeds.push(key);
			}
		});
		return checkeds;
	}

	setChecked(index, checked) {
		if (!this.props.selectable) return;

		const selectedItems = this.state.selectedItems;
		selectedItems[index] = checked;
		this.setState({ selectedItems });
	}

	checkAll(e) {
		if (this.props.selectable) {
			if (
				e instanceof Object &&
				e.target instanceof Object &&
				!isBoolean(e)
			) {
				e = e.target.checked;
			}

			const selectedItems = {};
			ReactDOM.findDOMNode(this.refs.checkAll).children[0].checked = e;
			this.props.children.forEach(function(c, index) {
				selectedItems[index] = e;
			});
			this.setState({ selectedItems });
		}
	}

	render() {
		const {
			selectable,
			headers,
			children,
			bordered,
			hover,
			radius,
			striped,
			compact,
			responsive,
			...props,
		} = this.props;

		let tableHeader = [];
		let tbodyChildren = children;

		if (selectable) {
			tableHeader.push(
				<th
					key="checkAll"
				>
					<UCheck
						ref="checkAll"
						type="checkbox"
						onClick={this.checkAll.bind(this)}
					/>
				</th>
			);
			tbodyChildren = children.map(function(child, index) {
				return React.cloneElement(child, {
					selectable: true,
					active: this.state.selectedItems[index],
					onChangeCheckbox: this.setChecked.bind(this),
					index : index,
				});
			}.bind(this));
		}

		headers.forEach(function(header, index) {
			const style = assign(styles.tr, header.style);
			tableHeader.push(
				<th
					style={style}
					key={`header-${index}`}
				>
					{header.title}
				</th>
			);
		}.bind(this));

		return (
			<Table
				bordered={bordered}
				hover={hover}
				radius={radius}
				striped={striped}
				compact={compact}
				responsive={responsive}
				{...props}
			>
				<thead>
					<tr>
						{tableHeader}
					</tr>
				</thead>
				<tbody>
					{tbodyChildren}
				</tbody>
			</Table>
		);
	}
}

Table.propTypes = {
	headers: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.element,
		]),
		style: PropTypes.object,
	})).isRequired,
	children: PropTypes.node,
	selectable: PropTypes.bool,
	onRowSelected: PropTypes.func,
	bordered: PropTypes.bool,
	hover: PropTypes.bool,
	radius: PropTypes.bool,
	striped: PropTypes.bool,
	compact: PropTypes.bool,
	responsive: PropTypes.bool,
};

Table.defaultProps = {
	children: [],
	selectable: false,
	bordered: false,
	hover: false,
	radius: false,
	striped: false,
	compact: false,
	responsive: false,
};

export default TableV2;
