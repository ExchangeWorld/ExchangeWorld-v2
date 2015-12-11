import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { API } from '../../../utils/';

class ItemsFilter extends React.Component {

	render() {
		return (
			<div>
				ItemsFilter
			</div>
		);
	}

}

export default class ItemList extends React.Component {
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			items: [],
		};
		console.log(API);
		this.fetch = this.fetch.bind(this);
	}

	componentWillMount() {
		// Layout.setTitle
		this.fetch(this.props.location.query);
	}

	fetch(query) {
		API.get('/goods/search', (data) => {
			console.log(data);
		});
	}

	render() {
		return (
			<div>
				ItemList
			</div>
		);
	}

}

