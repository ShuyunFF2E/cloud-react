const frontmatter = require('frontmatter');
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
	const { data = {}, content } = frontmatter(source);

	let code = tempalte;
	let other = '';

	md.render(content).replace(/<code.*>([^<]+)<\/code>/g, (_, $1) => (code = $1));

	const [matchCode = ''] = code.match(new RegExp(`${EXPORT_DEFAULT_REG}((${CONSTRUCTOR_REG}\\s+)?[A-Z][a-zA-Z]*)`, 'g')) || [];

	const constructor = matchCode.replace(new RegExp(`${EXPORT_DEFAULT_REG}(${CONSTRUCTOR_REG}\\s+)`), '');

	if (constructor) {
		other = `
			${constructor}.title = '${data.title}';
			${constructor}.desc = '${data.desc}';
		`;
	}

	return `
		${
			code
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/&quot;/g, '"')
		}

		${other}
	`;
}
