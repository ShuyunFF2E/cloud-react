/* eslint-disable */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* <% dynamicDocs begin %> */
/**
 * import  abc './abc.md'
 * import ...
 *
 * const docs = [
 * 	{ path: '/abc', label: 'abc', result: abc },
 * 	...
 * ]
 *
 */
/* <% dynamicDocs end %> */

import Menu from './components/menu';
import Markdown from './components/markdown';
import classes from './app.less';

const menuConf = {};
const routeViews = [];

/**
 * docs 这个变量是生成的
 * 注意那段的注释
 */
docs.forEach(({ path, result, demos = [] }, key) => {
	const { html, attributes: { title, subtitle, order, category = '' } } = result;
	const routePath = `/${category}${path}`.replace(/\/+/g, '/').toLocaleLowerCase();

	if (!menuConf[category]) {
		menuConf[category] = {
			title: category,
			subMenu: []
		};
	}

	menuConf[category].subMenu.push({
		title,
		order,
		subtitle,
		path: routePath
	})

	routeViews.push(
		<Route
			key={key}
			path={routePath}
			component={() => <Markdown title={title} subtitle={subtitle} html={html} demos={demos} />} />
	);
});


function App() {
	const infinity = Math.pow(2, 32);
	const menuDataSource = [];

	Object.keys(menuConf).map(key => {
		!key
			? menuDataSource.push(...menuConf[key].subMenu)
			: menuDataSource.push(menuConf[key]);
	});
	menuDataSource.sort(({ order: p = infinity }, { order: n = infinity }) => p - n);

	const [first] = menuDataSource;

	return (
		<section className={classes.app}>
			<Menu dataSource={menuDataSource} />

			<div className={classes.content}>
				<Switch>
					{routeViews}
					<Redirect to={first.path ? first.path : first.subMenu[0].path} />
				</Switch>
			</div>
		</section>
	);
}

export default App;
