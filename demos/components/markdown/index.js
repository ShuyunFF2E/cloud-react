import React from 'react';
import classes from './index.less';

export default function MarkdownOutput({ title, html, subtitle, className, ...props }) {
	return (
		<section className={classes.markdownBody} {...props}>
			<h1 className={classes.title}>{title} {subtitle}</h1>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</section>
	);
}
