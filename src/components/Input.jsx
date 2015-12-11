'use strict';

import React, { PropTypes } from 'react';
import { Input } from 'amazeui-react';

class TextInput extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.defaultText !== this.props.defaultText) {
			if (React.findDOMNode(this).children[0].type === this.props.type) {
				React.findDOMNode(this).children[0].value = nextProps.defaultText;
			} else if (React.findDOMNode(this).children[0].children[0].type === this.props.type) {
				React.findDOMNode(this).children[0].children[0].value = nextProps.defaultText;
			} else if (
				React.findDOMNode(this).children[0].children[1] &&
				React.findDOMNode(this).children[0].children[1].type === this.props.type
			) {
				React.findDOMNode(this).children[0].children[1].value = nextProps.defaultText;
			} else {
				React.findDOMNode(this).children[1].children[0].value = nextProps.defaultText;
			}
		}
	}

	getValue() {
		const self = this;
		if (this.props.type === 'file' && this.props.multiple) {
			return getInputChild().files;
		} else if (this.props.type === 'file') {
			return getInputChild().files[0];
		} else {
			return getInputChild().value;
		}

		function getInputChild() {
			if (React.findDOMNode(self).children[0].type === self.props.type) {
				return React.findDOMNode(self).children[0];
			} else if (React.findDOMNode(self).children[0].children[0].type === self.props.type) {
				return React.findDOMNode(self).children[0].children[0];
			} else if (
				React.findDOMNode(self).children[0].children[1] &&
				React.findDOMNode(self).children[0].children[1].type === self.props.type
			) {
				return React.findDOMNode(self).children[0].children[1];
			} else {
				return React.findDOMNode(self).children[1].children[0];
			}
		}
	}

	render() {
		const {style, defaultText, ...props} = this.props;

		return (
			<Input
				ref="input"
				style={style}
				defaultValue={this.props.defaultText}
				{...props}
			/>
		);
	}
}
TextInput.propTypes = {
	defaultText: PropTypes.string,
	type: React.PropTypes.string,
	disabled: React.PropTypes.bool,
	radius: React.PropTypes.bool,
	round: React.PropTypes.bool,
	amSize: React.PropTypes.oneOf(['sm', 'lg']),
	amStyle: React.PropTypes.string,
	validation: React.PropTypes.oneOf(['success', 'warning', 'error']),
	label: React.PropTypes.node,
	help: React.PropTypes.node,
	addonBefore: React.PropTypes.node,
	addonAfter: React.PropTypes.node,
	btnBefore: React.PropTypes.node,
	btnAfter: React.PropTypes.node,
	id: React.PropTypes.string,
	groupClassName: React.PropTypes.string,
	wrapperClassName: React.PropTypes.string,
	labelClassName: React.PropTypes.string,
	helpClassName: React.PropTypes.string,
	icon: React.PropTypes.string,
	standalone: React.PropTypes.bool,
	inline: React.PropTypes.bool,
	hasFeedback: React.PropTypes.bool
};

TextInput.defaultProps = {
	type: 'text',
};

export default TextInput;
