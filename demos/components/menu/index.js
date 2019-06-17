/* eslint-disable */
import React, { useState, useEffect } from 'react';
import mixClass from 'classnames';
import classes from './index.less';

const getHash = (href = window.location.href) => {
	return decodeURIComponent(href.split('#').pop());
}

function MenuCategory({ title, children }) {
	return (
		<dl className={classes.menuCategory}>
			<dt>{title}</dt>
			<dd>{children}</dd>
		</dl>
	);
}

function MenuItem({ path, title, subtitle, activeKey, ...props }) {
	const className = mixClass(classes.item, {
		[classes.active]: activeKey === path
	});

	return (
		<a className={className} href={`#${path}`} {...props}>
			<span>{title}</span>
			<span className={classes.subtitle}>{subtitle}</span>
		</a>
	)
}

export default function Menu({ dataSource }) {

	const [activeKey, setActiveKey] = useState(getHash());
	const onChangeActiveKey = ({ target }) => setActiveKey(getHash(target.href));

	useEffect(() => {
		setActiveKey(getHash());
	}, []);

	return (
		<div className={classes.menu}>
			{
				dataSource.map(({title, subtitle, path, subMenu = []}, key) => {
					if (!subMenu.length) {
						return (
							<MenuItem
								key={key}
								path={path}
								title={title}
								subtitle={subtitle}
								activeKey={activeKey}
								onClick={onChangeActiveKey} />
						);
					}

					return (
						<MenuCategory key={key} title={title} subMenu={subMenu}>
							{
								subMenu.map((props, subKey) => (
									<MenuItem
										{...props}
										key={subKey}
										activeKey={activeKey}
										onClick={onChangeActiveKey} />
								))
							}
						</MenuCategory>
					);

				})
			}
		</div>
	);
}
