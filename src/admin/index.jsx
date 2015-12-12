'use strict';

import React, { Component, PropTypes }  from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Layout from './partials/Layout.jsx';
import '../../style//admin/amazeui.scss';

const LINKS = [
	{ url: '/admin/items', text: '物品管理' },
	{ url: '/admin/users', text: '使用者管理' },
	{ url: '/admin/exchange', text: '交易管理' },
	{ url: '/admin/exceptions', text: '錯誤清單' },	
];
class Admin extends Component {
	
	constructor(props, context) {
		super(props, context);
	}

	getChildContext() {
		return {
			history: this.props.history,
		};
	}

	render() {
		return (
			<Layout 
				pathname={this.props.location.pathname}
				navItems={LINKS}
			>
				{this.props.children}
			</Layout>
		);
	}
}

Admin.childContextTypes = {
	history: PropTypes.object,
};

import Overview from './views/Overview.jsx';
import Items from './views/Items/List.jsx';

ReactDOM.render(
	(
		<Router history={createBrowserHistory({queryKey: false})}>
			<Route path="/admin" component={Admin}>
				<IndexRoute component={Overview} />
				<Route path="items" component={Items} />
			</Route>
	  	</Router>
	),
	document.getElementById('root')
);