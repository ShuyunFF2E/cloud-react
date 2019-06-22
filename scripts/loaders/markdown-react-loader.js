const frontmatter = require('front-matter');
const md = require('markdown-it')({
	html: true
});

const EXPORT_DEFAULT_REG = 'export\\s+default\\s+';
const CONSTRUCTOR_REG = '(class|function)';
const tempalte = `
	import React from 'react';

	export default function Noop() {
		return null;
	}
`

module.exports = function(source) {
	const { attributes = {}, body } = frontmatter(source);

	let code = tempalte;
	let staticDefine = '';

	md.render(body).replace(/<code.*>([^<]+)<\/code>/g, (_, $1) => (code = $1));

	const [matchCode = ''] = code.match(new RegExp(`${EXPORT_DEFAULT_REG}((${CONSTRUCTOR_REG}\\s+)?[A-Z][a-zA-Z]*)`, 'g')) || [];

	const constructor = matchCode.replace(new RegExp(`${EXPORT_DEFAULT_REG}(${CONSTRUCTOR_REG}\\s+)`), '');

	if (constructor) {
		staticDefine = `
			${constructor}.order = '${attributes.order || 0}';
			${constructor}.title = '${attributes.title}';
			${constructor}.desc = '${attributes.desc}';
			${constructor}.code = \`${code.replace(/\t/g, '    ')}\`;
		`;
	}

	return `
		/* eslint-disable */

		${
			code
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/&quot;/g, '"')
		}

		${staticDefine}
	`;
}
