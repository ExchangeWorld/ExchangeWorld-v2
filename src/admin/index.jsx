import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Layout from './partials/Layout.jsx';

class Admin extends React.Component {
	
	constructor(props, context) {
		super(props, context);
	}	

	render() {
		return (
			<Layout>
				{this.props.children}
			</Layout>
		);
	}
}

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