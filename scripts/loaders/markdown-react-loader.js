const frontmatter = require('front-matter');
const less = require('less');

const JS = 'js';
const JSX = 'jsx';
const JAVASCRIPT = 'javascript';
const CSS = 'css';
const LESS = 'less';

const EXPORT_DEFAULT_REG = 'export\\s+default\\s+';
const CONSTRUCTOR_REG = '(class|function)';
const CODE_BLOCK_REG = /`{3,4}(less|css|javascript|jsx|js)((?:[^`]{3,4})+)`{3,4}/gi;

const DEFAULT_TEMPLATE = `
	import React from 'react';

	export default function Noop() {
		return null;
	}
`;

function formatHtmlTag(code) {
	return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = function(source) {
	const { attributes = {}, body } = frontmatter(source);

	const callback = this.async();
	const codeMap = {
		[LESS]: null,
		[JAVASCRIPT]: DEFAULT_TEMPLATE
	};

	[...body.match(CODE_BLOCK_REG)].forEach(v => v.replace(CODE_BLOCK_REG, (_, language, code) => {
		switch (language.toLocaleLowerCase()) {
			case CSS:
			case LESS:
				codeMap[LESS] = code;
				break;
			case JS:
			case JSX:
			case JAVASCRIPT:
				codeMap[JAVASCRIPT] = code;
				break;
		}
	}));

	let constructor = '';
	let staticDefine = '';

	codeMap[JAVASCRIPT].replace(new RegExp(`${EXPORT_DEFAULT_REG}((${CONSTRUCTOR_REG}\\s+)?[A-Z][a-zA-Z]*)`), (_, $1) => {
		[, constructor] = $1.split(/\s+/);
	});

	if (constructor) {
		staticDefine = `
			${constructor}.order = '${attributes.order || 0}';
			${constructor}.title = '${attributes.title}';
			${constructor}.desc = '${attributes.desc}';
			${constructor}.code = \`${formatHtmlTag(codeMap[JAVASCRIPT]).replace(/\t/g, '    ')}\`;
		`;
	}

	if (codeMap[LESS]) {
		less.render(codeMap[LESS], (_, output) => {
			callback(null, `
				/* eslint-disable */
				${codeMap[JAVASCRIPT]}

				${staticDefine}
				${constructor}.css = \`${
					output.css.replace(/\{[^}]+\}/g, block => block.replace(/[\s\n\t]+/g, ''))
				}\`;
			`);
		})
	} else {
		callback(null, `
			/* eslint-disable */
			${codeMap[JAVASCRIPT]}

			${staticDefine}
		`);
	}
}
