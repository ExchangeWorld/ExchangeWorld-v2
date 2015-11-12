import React from 'react';

export default class Layout extends React.Component {
	
	constructor(props, context) {
		super(props, context);
	}	

	render() {
		return (
			<div>
				Admin
				{this.props.children}
			</div>
		);
	}
}
