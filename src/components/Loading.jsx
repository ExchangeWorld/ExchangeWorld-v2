'use strict';

import React from 'react';

export default class Loading extends React.Component {
	render() {
		const {children, className, ...props} = this.props;
		return (
			<div className={`sk-fading-circle${ ' ' + className || ''}`} {...props}>
				<div className="sk-circle1 sk-circle"></div>
				<div className="sk-circle2 sk-circle"></div>
				<div className="sk-circle3 sk-circle"></div>
				<div className="sk-circle4 sk-circle"></div>
				<div className="sk-circle5 sk-circle"></div>
				<div className="sk-circle6 sk-circle"></div>
				<div className="sk-circle7 sk-circle"></div>
				<div className="sk-circle8 sk-circle"></div>
				<div className="sk-circle9 sk-circle"></div>
				<div className="sk-circle10 sk-circle"></div>
				<div className="sk-circle11 sk-circle"></div>
				<div className="sk-circle12 sk-circle"></div>
			</div>
		);
	}
}