import React, { useEffect, useRef } from 'react';
import classes from './index.less';

export default function MarkdownOutput({ title, html, subtitle, className, ...props }) {
	const markdownRef = useRef();

	// reset scrollTop
	useEffect(() => {
		markdownRef.current.parentNode.scrollTop = 0;
	}, []);

	return (
		<section ref={markdownRef} className={classes.markdownBody} {...props}>
			<h1 className={classes.title}>{title} {subtitle}</h1>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</section>
	);
}
