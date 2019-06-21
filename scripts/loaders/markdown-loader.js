const getOptions = require('loader-utils').getOptions;
const frontmatter = require('front-matter')

const md = require('markdown-it')({
	html: true,
});

const stringify = (src) => JSON.stringify(src).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

module.exports = function (source) {
	if (this.cacheable) this.cacheable();

	const { pattern, insert = {} } = getOptions(this);
	const fm = frontmatter(source);

	if (pattern && insert.value) {
		let reg = pattern;

		if (pattern instanceof RegExp) {
			reg = new RegExp(`(${pattern.toString().replace(/^\/|\/$/g, '')})`)
		}

		fm.body = fm.body.replace(reg, insert.before ? `\n${insert.value}\n\n$1\n\n` : `\n\n$1\n\n${insert.value}\n`);
	}

	fm.html = md.render(fm.body);

	return `module.exports = {
		body: ${stringify(fm.body)},
		html: ${stringify(fm.html)},
		attributes: ${stringify(fm.attributes)}
	}`;
}
