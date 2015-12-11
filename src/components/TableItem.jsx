'use strict';

import React, { PropTypes } from 'react';
import { UCheck } from 'amazeui-react';
import { assign } from 'lodash';

const styles = {
	checkbox: {
		width: 39,
	},
};

class TableItem extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	componentWillReceiveProps(nextProps) {
		if (
			!this.props.disabled &&
			nextProps.active !== this.props.active &&
			React.findDOMNode(this.refs.check)
		) {
			const checkboxEle = React.findDOMNode(this.refs.check).children[0];
			checkboxEle.checked = nextProps.active;
			this.props.onChangeCheckbox(this.props.index, checkboxEle.checked);
		}
	}

	onClickCheckbox() {
		if (this.props.disabled) {
			return;
		}
		const checkboxEle = React.findDOMNode(this.refs.check).children[0];
		checkboxEle.checked = !checkboxEle.checked;
		this.props.onChangeCheckbox(this.props.index, checkboxEle.checked);
	}

	render() {
		const {
			active,
			selectable,
			children,
			style,
			className,
			...props
		} = this.props;
		const activeClass = active && !this.props.disabled ? 'am-active' : '';
		const checkboxStyle = assign(styles.checkbox, this.props.checkboxStyle);

		const checkboxEle = selectable &&
			<td
				style={checkboxStyle}
				onClick={this.onClickCheckbox.bind(this)}
				key={this.props.key}
			>
				<UCheck
					ref="check"
					type="checkbox"
					defaultChecked={active}
					disabled={this.props.disabled}
				/>
			</td>;

		return (
			<tr
				className={`${activeClass} ${className || ''}`}
				style={style}
				{...props}
			>
				{checkboxEle}
				{children}
			</tr>
		);
	}
}

TableItem.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	style: PropTypes.object,
	active: PropTypes.bool,
	selectable: PropTypes.bool,
};

TableItem.defaultProps = {
	active: false,
	selectable: false,
};

export default TableItem;
