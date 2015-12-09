import React, { Component, PropTypes }  from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Layout from './partials/Layout.jsx';
import '../../style/amazeui.scss';

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
			<Layout pathname={this.props.location.pathname}>
				{this.props.children}
			</Layout>
		);
	}
}

Admin.childContextTypes = {
	history: PropTypes.func,
};

import Overview from './views/Overview.jsx';

ReactDOM.render(
	(
		<Router history={createBrowserHistory({queryKey: false})}>
			<Route path="/admin" component={Admin}>
				<IndexRoute component={Overview} />
			</Route>
	  	</Router>
	),
	document.getElementById('root')
);