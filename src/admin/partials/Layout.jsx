import React, { Component, PropTypes }  from 'react';
import { Link } from 'react-router';
import { Topbar, CollapsibleNav, Nav, NavItem } from 'amazeui-react';

const styles = {
	content: {
		position: 'fixed',
		overflow: 'auto',
		left: 200,
		top: 50,
		right: -15,
		bottom: -15,
	},
	leftNav: {
		// display: 'initial',
		position: 'fixed',
		top: 0,
		zIndex: 100,
		width: 200,
		height: '100%',
		marginTop: 50,
		paddingBottom: 50,
		boxSizing: 'border-box',
		overflowY: 'auto',
		backgroundColor: '#fafafa',
		boxShadow: '0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12),0 3px 5px -1px rgba(0,0,0,.2)',
	},
	headerNav: {
		float: 'right',
	},
};

let _instance = null;
let waitingTitle = '';
class Layout extends Component {
	
	// constructor
	constructor(props, context) {
		super(props, context);
		// console.log(context);
		this.state = {
			title: 'EXWD 後台',
			isNavOpen: false,
		};
		this.setTitle = this.setTitle.bind(this);
	}

	// optional static methods
	static setTitle(title) {
		if (_instance) {
			_instance.setTitle(title);
		} else {
			waitingTitle = title;
		}
	}

	static scrollTop() {
		if (isInstanceAlive()) {
			_instance.scrollTop();
		}

		function isInstanceAlive() {
			return _instance &&
				_instance.refs &&
				_instance.refs.layout;
		}
	};

	// getChildContext
	// componentWillMount
	componentWillMount() {
		if (waitingTitle) {
			this.setState({title: waitingTitle});
		}
	}

	// componentDidMount
	componentDidMount() {
		_instance = this;
	}

	// componentWillReceiveProps
	componentWillReceiveProps(nextProps) {
		this.scrollTop();
	}

	// shouldComponentUpdate
	// componentWillUpdate
	// componentDidUpdate

	// componentWillUnmount
	componentWillUnmount() {
		_instance = null;
	}

	// clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
	scrollTop() {
		this.refs.content.scrollTop = 0;
	}

	onClickLink() {
		this.setState({
			isNavOpen: false,
		});
	}

	onClickMask() {
		this.setState({
			isNavOpen: false,
		});
	}

	// getter methods for render like getSelectReason() or getFooterContent()
	setTitle(title) {
		this.setState({
			title : title,
		});
	}

	// Optional render methods like renderNavigation() or renderProfilePicture()
	renderTopbar() {
		return (
			<Topbar toggleNavKey="nav" fluid fixedTop>
				<div className="am-topbar-brand">
					{/*
						<button
							className="for-test-openNav"
							style={styles.brand.expand}
							onClick={this.openNav.bind(this)}
						>
							<Icon icon="bars" />
						</button>
					*/}
					<h3>
						{this.state.title}
					</h3>
				</div>
				<CollapsibleNav eventKey="nav">
					<Nav topbar style={styles.headerNav}>
						<NavItem>
							<Link to="/admin">總覽</Link>
						</NavItem>
						<NavItem href="/">回到前台</NavItem>
					</Nav>
				</CollapsibleNav>
			</Topbar>
		);
	}

	renderLeftNav() {
		const navLinks = this.props.navItems.map(nav => {
			return (
				<NavItem active={this.props.pathname === nav.url} key={nav.url}>
					<Link
						to={nav.url}
						onClick={this.onClickLink.bind(this)}
					>
						{nav.text}
					</Link>
				</NavItem>
			);
		});

		return (
			<Nav style={styles.leftNav}>
				{navLinks}
			</Nav>
		);
	}

	//render
	render() {
		return (
			<div>
				{this.renderTopbar()}
				{this.renderLeftNav()}
				<main ref="content" style={styles.content}>
					{this.props.children}
				</main>
			</div>
		);
	}
}

export default Layout;