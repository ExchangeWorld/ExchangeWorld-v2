import React, { Component }  from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import { Topbar, CollapsibleNav, Nav, NavItem, Icon } from 'amazeui-react';
import '../../../style/admin/Layout.scss';

let _instance = null;
let waitingTitle = '';
class Layout extends Component {
	
	// constructor
	constructor(props, context) {
		super(props, context);
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

	openNav() {
		this.setState({
			isNavOpen: true,
		});
	}

	closeNav() {
		this.setState({
			isNavOpen: false,
		});
	}

	// getter methods for render like getSelectReason() or getFooterContent()
	setTitle(title) {
		this.setState({ title });
	}

	// Optional render methods like renderNavigation() or renderProfilePicture()
	renderTopbar() {
		return (
			<Topbar toggleNavKey="nav" fluid fixedTop>
				<div className="am-topbar-brand brand">
					<button
						className="layout-sidenav--menu"
						onClick={this.openNav.bind(this)}
					>
						<Icon icon="bars" />
					</button>
					<h3 className="topbar--brand">
						{this.state.title}
					</h3>
				</div>
				<CollapsibleNav eventKey="nav">
					<Nav topbar className="header--nav__right">
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
						onClick={this.closeNav.bind(this)}
					>
						{nav.text}
					</Link>
				</NavItem>
			);
		});

		const className = cx({
			"layout-sidenav": true,
			"layout-sidenav__open": this.state.isNavOpen,
			"layout-sidenav__close": !this.state.isNavOpen,
		});

		return (
			<Nav className={className}>
				{navLinks}
			</Nav>
		);
	}

	//render
	render() {

		const maskClass = cx({"layout--mask": this.state.isNavOpen});

		return (
			<div>
				{this.renderTopbar()}
				<main ref="content" className="layout-content">
					{this.props.children}
				</main>
				{this.renderLeftNav()}

				<div className={maskClass} onClick={this.closeNav.bind(this)} />
			</div>
		);
	}
}

export default Layout;