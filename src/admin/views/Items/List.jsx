'use strict';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { API } from '../../../utils/';
import { Table } from '../../../components/';
import Switch from '../../../components/Switch.jsx';
import Card from '../../../components/Card.jsx';

class ItemsFilter extends React.Component {

	render() {
		return (
			<div>
				ItemsFilter
			</div>
		);
	}

}

class ItemsTable extends React.Component {
	render() {
		return (
			<div>
				<Switch />
				<Switch checked/>
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
		API.get('/goods/search', (items) => {
			this.setState({items});
		});
	}

	render() {
		return (
			<div>
				<ItemsFilter />
				<ItemsTable />

			</div>
		);
	}

}

