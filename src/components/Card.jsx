'use strict';

import React, {PropTypes} from 'react';
import cx from 'classnames';
import { includes } from 'lodash'; 
import '../style/admin/Card.scss';

const CARD_COMPONENTS = [
	'CardAction',
	'CardMedia',
	'CardMenu',
	'CardSupportingText',
	'CardTitle',
];

class CardAction extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.getClassName = this.getClassName.bind(this);
	}

	getClassName() {
		return cx({
			'card__actions': true,
			'card--border': this.props.border,
		});
	}

	render() {
		const {style, children, ...props} = this.props;
		const className = typeof(this.props.className) === 'string'
			? ` ${this.props.className}`
			: '';

		return (
			<div
				className={`${this.getClasses()}${className}`}
				style={style}
				{...props}
			>
				{children}
			</div>
		);
	}
}
CardAction.propTypes = {
	border : PropTypes.bool,
	style : PropTypes.object,
	className : PropTypes.string,
};
CardAction.defaultProps = {
	border: false,
	className: '',
	style: null,
};


class CardMedia extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		const {style, children, ...props} = this.props;
		const className = typeof(this.props.className) === 'string'
			? ` ${this.props.className}`
			: '';

		return (
			<div
				className={`card__actions${className}`}
				style={style}
				{...props}
			>
				{children}
			</div>
		);
	}
}
CardMedia.propTypes = {
	style : PropTypes.object,
	className : PropTypes.string,
};
CardMedia.defaultProps = {
	className: '',
	style: null,
};

class CardMenu extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		const {style, children, ...props} = this.props;
		const className = typeof(this.props.className) === 'string'
			? ` ${this.props.className}`
			: '';

		return (
			<div
				className={`card__menu${className}`}
				style={style}
				{...props}
			>
				{children}
			</div>
		);
	}
}
CardMenu.propTypes = {
	style : PropTypes.object,
	className : PropTypes.string,
};
CardMenu.defaultProps = {
	className: '',
	style: null,
};


class CardSupportingText extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		const {style, children, ...props} = this.props;
		const className = typeof(this.props.className) === 'string'
			? ` ${this.props.className}`
			: '';

		return (
			<div
				className={`card__supporting-text${className}`}
				style={style}
				{...props}
			>
				{children}
			</div>
		);
	}
}
CardSupportingText.propTypes = {
	style : PropTypes.object,
	className : PropTypes.string,
};
CardSupportingText.defaultProps = {
	className: '',
	style: null,
};


class CardTitle extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.getClassName = this.getClassName.bind(this);
	}

	getClassName() {
		return cx({
			'card__title': true,
			'card--border': this.props.border,
			'card--expand': this.props.expand,
		});
	}

	render() {
		const {style, children, ...props} = this.props;
		const className = typeof(this.props.className) === 'string'
			? ` ${this.props.className}`
			: '';

		return (
			<div
				className={`${this.getClassName()}${className}`}
				style={style}
				{...props}
			>
				{getChildren(this.props.children)}
			</div>
		);
		
		function getChildren(children) {
			if (typeof children === 'string') {
				return <h2 className="card__title-text">{children}</h2>;
			} 

			return children;
		}
	}

}
CardTitle.propTypes = {
	style : PropTypes.object,
	expand : PropTypes.bool,
	border : PropTypes.bool,
	// titleText: PropTypes.bool,
	className: PropTypes.string,
};
CardTitle.defaultProps = {
	style: null,
	className: '',
	expand: true,
	border: true,
	// titleText: false,
};

class Card extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.getClassName = this.getClassName.bind(this);
	}

	getClassName() {
		return cx({
			card: true,
			[`shaodw-depth-${this.props.shadow}`]: 
				this.props.shadow >= 1 && 
				this.props.shadow <= 7,
		});
	}

	render() {
		const {children, style, ...props} = this.props;
		const className = typeof(this.props.className) === 'string'
			? ` ${this.props.className}`
			: '';

		return (
			<div 
				style={style} 
				className={`${this.getClassName()}${className}`}
			>
				{children}
			</div>
		);
	}
}
Card.propTypes = {
	className: PropTypes.string,
	style: PropTypes.object,
	shadow : PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7]),
	children: (props, name) => {
		const children = props[propName];
		if (!children) {
			return new Error('There must be one children at least in Card.');
		}

		let hasError = false;
		if (children instanceof Array) {
			children.forEach(function(child) {
				if (!includes(CARD_COMPONENTS, getType(child))) {
					console.error(`${type} is not one of ${CARD_COMPONENTS.join(', ')}.`);
					hasError = true;
				}
			});
		} else {
			if (!includes(CARD_COMPONENTS, getType(children))) {
				console.error(`${type} is not one of ${CARD_COMPONENTS.join(', ')}.`);
				hasError = true;
			}
		}

		if (hasError) {
			return new Error(`The children of Card should be ${CARD_COMPONENTS.join(', ')}.`);
		}

		function getType(child) {
			return typeof child.type === 'string'
				? child.type
				: child.type.displayName;
		}
	},
};
Card.defaultProps = {
	className: '',
	style: null,
	shadow : 1,
};

Card.Action = CardAction;
Card.Media = CardMedia;
Card.Menu = CardMenu;
Card.SupportingText = CardSupportingText;
Card.Title = CardTitle;

export default Card;