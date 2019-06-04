import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import classes from './app.less';

/* <% dynamicExample begin %> */

/* eslint-disable */

// import Demo from './demo'

// const menus = [
// 	{ path: '/demo', label: 'Demo', component: Demo }
// ]

/* <% dynamicExample end %> */
const menuView = [];
const routeView = [];

menus.forEach(({ label, path, component }, key) => {
	routeView.push(<Route path={path} component={component} key={key} />);
	menuView.push(
		<NavLink
			to={path}
			key={key}
			className={classes.menuItem}
			activeClassName={classes.activeLink}
		>{label}</NavLink>
	);
});

function Menu({ children, ...props }) {
	return (
		<div className={classes.menu}>
			{children}
		</div>
	);
}

function App() {
	return (
		<section className={classes.app}>
			<Menu>
				{menuView}
			</Menu>

			<div className={classes.content}>
				<Switch>
					{routeView}
				</Switch>
			</div>
		</section>
	);
}

export default App;
