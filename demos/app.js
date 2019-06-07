/* eslint-disable */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
docs.forEach(({ path, result }, key) => {
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
			component={() => <Markdown title={title} html={html} />} />
	);
});


function App() {
	const infinity = Math.pow(2, 32);
	const menuDataSource = [];

	Object.keys(menuConf).map(key => {
		if (!key) {
			menuDataSource.push(...menuConf[key].subMenu);
		} else {
			menuDataSource.push(menuConf[key]);
		}
	});

	menuDataSource.sort(({ order: pOrder = infinity }, { order: nOrder = infinity }) => {
		return pOrder - nOrder;
	});

	return (
		<section className={classes.app}>
			<Menu dataSource={menuDataSource} />

			<div className={classes.content}>
				<Switch>
					{routeViews}
				</Switch>
			</div>
		</section>
	);
}

export default App;
