'use strict';

import React, {PropTypes} from 'react';
import '../../style/admin/Switch.scss';

let id = 1;
class Switch extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			id: id++,
		};

		this.getValue = this.getValue.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.checked !== nextProps.checked) {
			this.refs.input.checked = nextProps.props.checked;
		}
	}

	componentDidMount() {
		if (this.props.checked) this.refs.input.checked = true;
	}

	setValue(checked) {
		return this.refs.input.checked = checked;
	}

	getValue() {
		return this.refs.input.checked;
	}

	render() {
		const {
			style,
			labelStyle,
			className,
			labelClassName,
			children, 
			...props
		} = this.props;

		return (
			<div 
				className={`material-switch pull-right ${className}`}
				{...props}
			>
                <input
                	ref="input"
                	id={`switch-${this.state.id}`} 
                	name={`switch-${this.state.id}`} 
                	type="checkbox"
                />
                <label
                	htmlFor={`switch-${this.state.id}`}
                	className={labelClassName}
                	style={labelStyle}
                />
            </div>
		);
	}
}
Switch.propTypes = {
	style : PropTypes.object,
	labelStyle: PropTypes.object,
	className : PropTypes.string,
	labelClassName : PropTypes.string,
	checked : PropTypes.bool,
	color: PropTypes.oneOf(['primary', 'accent', 'danger', ])
};
Switch.defaultProps = {
	style: null,
	labelStyle: null,
	className: '',
	labelClassName: '',
	checked: false,
	id: id++,
};

export default Switch;