/* PrismJS 1.17.1
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+less+markdown+jsx */
/* eslint-disable */
var _self = 'undefined' != typeof window ? window : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
	Prism = (function(u) {
		var c = /\blang(?:uage)?-([\w-]+)\b/i,
			r = 0;
		var _ = {
			manual: u.Prism && u.Prism.manual,
			disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
			util: {
				encode: function(e) {
					return e instanceof L
						? new L(e.type, _.util.encode(e.content), e.alias)
						: Array.isArray(e)
						? e.map(_.util.encode)
						: e
								.replace(/&/g, '&amp;')
								.replace(/</g, '&lt;')
								.replace(/\u00a0/g, ' ');
				},
				type: function(e) {
					return Object.prototype.toString.call(e).slice(8, -1);
				},
				objId: function(e) {
					return e.__id || Object.defineProperty(e, '__id', { value: ++r }), e.__id;
				},
				clone: function n(e, t) {
					var a,
						r,
						i = _.util.type(e);
					switch (((t = t || {}), i)) {
						case 'Object':
							if (((r = _.util.objId(e)), t[r])) return t[r];
							for (var o in ((a = {}), (t[r] = a), e)) e.hasOwnProperty(o) && (a[o] = n(e[o], t));
							return a;
						case 'Array':
							return (
								(r = _.util.objId(e)),
								t[r]
									? t[r]
									: ((a = []),
									  (t[r] = a),
									  e.forEach(function(e, r) {
											a[r] = n(e, t);
									  }),
									  a)
							);
						default:
							return e;
					}
				},
				currentScript: function() {
					if ('undefined' == typeof document) return null;
					if ('currentScript' in document) return document.currentScript;
					try {
						throw new Error();
					} catch (e) {
						var r = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
						if (r) {
							var n = document.getElementsByTagName('script');
							for (var t in n) if (n[t].src == r) return n[t];
						}
						return null;
					}
				}
			},
			languages: {
				extend: function(e, r) {
					var n = _.util.clone(_.languages[e]);
					for (var t in r) n[t] = r[t];
					return n;
				},
				insertBefore: function(n, e, r, t) {
					var a = (t = t || _.languages)[n],
						i = {};
					for (var o in a)
						if (a.hasOwnProperty(o)) {
							if (o == e) for (var l in r) r.hasOwnProperty(l) && (i[l] = r[l]);
							r.hasOwnProperty(o) || (i[o] = a[o]);
						}
					var s = t[n];
					return (
						(t[n] = i),
						_.languages.DFS(_.languages, function(e, r) {
							r === s && e != n && (this[e] = i);
						}),
						i
					);
				},
				DFS: function e(r, n, t, a) {
					a = a || {};
					var i = _.util.objId;
					for (var o in r)
						if (r.hasOwnProperty(o)) {
							n.call(r, o, r[o], t || o);
							var l = r[o],
								s = _.util.type(l);
							'Object' !== s || a[i(l)] ? 'Array' !== s || a[i(l)] || ((a[i(l)] = !0), e(l, n, o, a)) : ((a[i(l)] = !0), e(l, n, null, a));
						}
				}
			},
			plugins: {},
			highlightAll: function(e, r) {
				_.highlightAllUnder(document, e, r);
			},
			highlightAllUnder: function(e, r, n) {
				var t = { callback: n, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };
				_.hooks.run('before-highlightall', t);
				for (var a, i = e.querySelectorAll(t.selector), o = 0; (a = i[o++]); ) _.highlightElement(a, !0 === r, t.callback);
			},
			highlightElement: function(e, r, n) {
				var t = (function(e) {
						for (; e && !c.test(e.className); ) e = e.parentNode;
						return e ? (e.className.match(c) || [, 'none'])[1].toLowerCase() : 'none';
					})(e),
					a = _.languages[t];
				e.className = e.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + t;
				var i = e.parentNode;
				i && 'pre' === i.nodeName.toLowerCase() && (i.className = i.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + t);
				var o = { element: e, language: t, grammar: a, code: e.textContent };
				function l(e) {
					(o.highlightedCode = e),
						_.hooks.run('before-insert', o),
						(o.element.innerHTML = o.highlightedCode),
						_.hooks.run('after-highlight', o),
						_.hooks.run('complete', o),
						n && n.call(o.element);
				}
				if ((_.hooks.run('before-sanity-check', o), !o.code)) return _.hooks.run('complete', o), void (n && n.call(o.element));
				if ((_.hooks.run('before-highlight', o), o.grammar))
					if (r && u.Worker) {
						var s = new Worker(_.filename);
						(s.onmessage = function(e) {
							l(e.data);
						}),
							s.postMessage(JSON.stringify({ language: o.language, code: o.code, immediateClose: !0 }));
					} else l(_.highlight(o.code, o.grammar, o.language));
				else l(_.util.encode(o.code));
			},
			highlight: function(e, r, n) {
				var t = { code: e, grammar: r, language: n };
				return (
					_.hooks.run('before-tokenize', t),
					(t.tokens = _.tokenize(t.code, t.grammar)),
					_.hooks.run('after-tokenize', t),
					L.stringify(_.util.encode(t.tokens), t.language)
				);
			},
			matchGrammar: function(e, r, n, t, a, i, o) {
				for (var l in n)
					if (n.hasOwnProperty(l) && n[l]) {
						var s = n[l];
						s = Array.isArray(s) ? s : [s];
						for (var u = 0; u < s.length; ++u) {
							if (o && o == l + ',' + u) return;
							var c = s[u],
								g = c.inside,
								f = !!c.lookbehind,
								d = !!c.greedy,
								h = 0,
								m = c.alias;
							if (d && !c.pattern.global) {
								var p = c.pattern.toString().match(/[imsuy]*$/)[0];
								c.pattern = RegExp(c.pattern.source, p + 'g');
							}
							c = c.pattern || c;
							for (var y = t, v = a; y < r.length; v += r[y].length, ++y) {
								var k = r[y];
								if (r.length > e.length) return;
								if (!(k instanceof L)) {
									if (d && y != r.length - 1) {
										if (((c.lastIndex = v), !(O = c.exec(e)))) break;
										for (
											var b = O.index + (f && O[1] ? O[1].length : 0), w = O.index + O[0].length, A = y, P = v, x = r.length;
											A < x && (P < w || (!r[A].type && !r[A - 1].greedy));
											++A
										)
											(P += r[A].length) <= b && (++y, (v = P));
										if (r[y] instanceof L) continue;
										(S = A - y), (k = e.slice(v, P)), (O.index -= v);
									} else {
										c.lastIndex = 0;
										var O = c.exec(k),
											S = 1;
									}
									if (O) {
										f && (h = O[1] ? O[1].length : 0);
										w = (b = O.index + h) + (O = O[0].slice(h)).length;
										var j = k.slice(0, b),
											N = k.slice(w),
											E = [y, S];
										j && (++y, (v += j.length), E.push(j));
										var C = new L(l, g ? _.tokenize(O, g) : O, m, O, d);
										if (
											(E.push(C),
											N && E.push(N),
											Array.prototype.splice.apply(r, E),
											1 != S && _.matchGrammar(e, r, n, y, v, !0, l + ',' + u),
											i)
										)
											break;
									} else if (i) break;
								}
							}
						}
					}
			},
			tokenize: function(e, r) {
				var n = [e],
					t = r.rest;
				if (t) {
					for (var a in t) r[a] = t[a];
					delete r.rest;
				}
				return _.matchGrammar(e, n, r, 0, 0, !1), n;
			},
			hooks: {
				all: {},
				add: function(e, r) {
					var n = _.hooks.all;
					(n[e] = n[e] || []), n[e].push(r);
				},
				run: function(e, r) {
					var n = _.hooks.all[e];
					if (n && n.length) for (var t, a = 0; (t = n[a++]); ) t(r);
				}
			},
			Token: L
		};
		function L(e, r, n, t, a) {
			(this.type = e), (this.content = r), (this.alias = n), (this.length = 0 | (t || '').length), (this.greedy = !!a);
		}
		if (
			((u.Prism = _),
			(L.stringify = function(e, r) {
				if ('string' == typeof e) return e;
				if (Array.isArray(e))
					return e
						.map(function(e) {
							return L.stringify(e, r);
						})
						.join('');
				var n = { type: e.type, content: L.stringify(e.content, r), tag: 'span', classes: ['token', e.type], attributes: {}, language: r };
				if (e.alias) {
					var t = Array.isArray(e.alias) ? e.alias : [e.alias];
					Array.prototype.push.apply(n.classes, t);
				}
				_.hooks.run('wrap', n);
				var a = Object.keys(n.attributes)
					.map(function(e) {
						return e + '="' + (n.attributes[e] || '').replace(/"/g, '&quot;') + '"';
					})
					.join(' ');
				return '<' + n.tag + ' class="' + n.classes.join(' ') + '"' + (a ? ' ' + a : '') + '>' + n.content + '</' + n.tag + '>';
			}),
			!u.document)
		)
			return (
				u.addEventListener &&
					(_.disableWorkerMessageHandler ||
						u.addEventListener(
							'message',
							function(e) {
								var r = JSON.parse(e.data),
									n = r.language,
									t = r.code,
									a = r.immediateClose;
								u.postMessage(_.highlight(t, _.languages[n], n)), a && u.close();
							},
							!1
						)),
				_
			);
		var e = _.util.currentScript();
		if ((e && ((_.filename = e.src), e.hasAttribute('data-manual') && (_.manual = !0)), !_.manual)) {
			function n() {
				_.manual || _.highlightAll();
			}
			var t = document.readyState;
			'loading' === t || ('interactive' === t && e.defer)
				? document.addEventListener('DOMContentLoaded', n)
				: window.requestAnimationFrame
				? window.requestAnimationFrame(n)
				: window.setTimeout(n, 16);
		}
		return _;
	})(_self);
'undefined' != typeof module && module.exports && (module.exports = Prism), 'undefined' != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
	comment: /<!--[\s\S]*?-->/,
	prolog: /<\?[\s\S]+?\?>/,
	doctype: { pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i, greedy: !0 },
	cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
	tag: {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
		greedy: !0,
		inside: {
			tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
			'attr-value': { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i, inside: { punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }] } },
			punctuation: /\/?>/,
			'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } }
		}
	},
	entity: /&#?[\da-z]{1,8};/i
}),
	(Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
	Prism.hooks.add('wrap', function(a) {
		'entity' === a.type && (a.attributes.title = a.content.replace(/&amp;/, '&'));
	}),
	Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
		value: function(a, e) {
			var s = {};
			(s['language-' + e] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[e] }),
				(s.cdata = /^<!\[CDATA\[|\]\]>$/i);
			var n = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } };
			n['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
			var t = {};
			(t[a] = {
				pattern: RegExp('(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)'.replace(/__/g, a), 'i'),
				lookbehind: !0,
				greedy: !0,
				inside: n
			}),
				Prism.languages.insertBefore('markup', 'cdata', t);
		}
	}),
	(Prism.languages.xml = Prism.languages.extend('markup', {})),
	(Prism.languages.html = Prism.languages.markup),
	(Prism.languages.mathml = Prism.languages.markup),
	(Prism.languages.svg = Prism.languages.markup);
!(function(s) {
	var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
	(s.languages.css = {
		comment: /\/\*[\s\S]*?\*\//,
		atrule: { pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/, inside: { rule: /@[\w-]+/ } },
		url: { pattern: RegExp('url\\((?:' + t.source + '|[^\n\r()]*)\\)', 'i'), inside: { function: /^url/i, punctuation: /^\(|\)$/ } },
		selector: RegExp('[^{}\\s](?:[^{};"\']|' + t.source + ')*?(?=\\s*\\{)'),
		string: { pattern: t, greedy: !0 },
		property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
		important: /!important\b/i,
		function: /[-a-z0-9]+(?=\()/i,
		punctuation: /[(){};:,]/
	}),
		(s.languages.css.atrule.inside.rest = s.languages.css);
	var e = s.languages.markup;
	e &&
		(e.tag.addInlined('style', 'css'),
		s.languages.insertBefore(
			'inside',
			'attr-value',
			{
				'style-attr': {
					pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
					inside: {
						'attr-name': { pattern: /^\s*style/i, inside: e.tag.inside },
						punctuation: /^\s*=\s*['"]|['"]\s*$/,
						'attr-value': { pattern: /.+/i, inside: s.languages.css }
					},
					alias: 'language-css'
				}
			},
			e.tag
		));
})(Prism);
Prism.languages.clike = {
	comment: [
		{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
		{ pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
	],
	string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
	'class-name': {
		pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: !0,
		inside: { punctuation: /[.\\]/ }
	},
	keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	boolean: /\b(?:true|false)\b/,
	function: /\w+(?=\()/,
	number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
	operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	punctuation: /[{}[\];(),.:]/
};
(Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{ pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/, lookbehind: !0 }
	],
	keyword: [
		{ pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
		{
			pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: !0
		}
	],
	number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
	function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/
})),
	(Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
	Prism.languages.insertBefore('javascript', 'keyword', {
		regex: {
			pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*(?:$|[\r\n,.;})\]]))/,
			lookbehind: !0,
			greedy: !0
		},
		'function-variable': {
			pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
			alias: 'function'
		},
		parameter: [
			{
				pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
				lookbehind: !0,
				inside: Prism.languages.javascript
			},
			{ pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: Prism.languages.javascript },
			{ pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript },
			{
				pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
				lookbehind: !0,
				inside: Prism.languages.javascript
			}
		],
		constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
	}),
	Prism.languages.insertBefore('javascript', 'string', {
		'template-string': {
			pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
			greedy: !0,
			inside: {
				'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
				interpolation: {
					pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
					lookbehind: !0,
					inside: { 'interpolation-punctuation': { pattern: /^\${|}$/, alias: 'punctuation' }, rest: Prism.languages.javascript }
				},
				string: /[\s\S]+/
			}
		}
	}),
	Prism.languages.markup && Prism.languages.markup.tag.addInlined('script', 'javascript'),
	(Prism.languages.js = Prism.languages.javascript);
(Prism.languages.less = Prism.languages.extend('css', {
	comment: [/\/\*[\s\S]*?\*\//, { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 }],
	atrule: { pattern: /@[\w-]+?(?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};])*?(?=\s*\{)/, inside: { punctuation: /[:()]/ } },
	selector: { pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@])*?(?=\s*\{)/, inside: { variable: /@+[\w-]+/ } },
	property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
	operator: /[+\-*\/]/
})),
	Prism.languages.insertBefore('less', 'property', {
		variable: [{ pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } }, /@@?[\w-]+/],
		'mixin-usage': { pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/, lookbehind: !0, alias: 'function' }
	});
!(function(d) {
	function n(n, e) {
		return (
			(n = n.replace(/<inner>/g, '(?:\\\\.|[^\\\\\\n\r]|(?:\r?\n|\r)(?!\r?\n|\r))')),
			e && (n = n + '|' + n.replace(/_/g, '\\*')),
			RegExp('((?:^|[^\\\\])(?:\\\\{2})*)(?:' + n + ')')
		);
	}
	var e = '(?:\\\\.|``.+?``|`[^`\r\\n]+`|[^\\\\|\r\\n`])+',
		t = '\\|?__(?:\\|__)+\\|?(?:(?:\r?\n|\r)|$)'.replace(/__/g, e),
		a = '\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\r?\n|\r)';
	(d.languages.markdown = d.languages.extend('markup', {})),
		d.languages.insertBefore('markdown', 'prolog', {
			blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
			table: {
				pattern: RegExp('^' + t + a + '(?:' + t + ')*', 'm'),
				inside: {
					'table-data-rows': {
						pattern: RegExp('^(' + t + a + ')(?:' + t + ')*$'),
						lookbehind: !0,
						inside: { 'table-data': { pattern: RegExp(e), inside: d.languages.markdown }, punctuation: /\|/ }
					},
					'table-line': { pattern: RegExp('^(' + t + ')' + a + '$'), lookbehind: !0, inside: { punctuation: /\||:?-{3,}:?/ } },
					'table-header-row': {
						pattern: RegExp('^' + t + '$'),
						inside: { 'table-header': { pattern: RegExp(e), alias: 'important', inside: d.languages.markdown }, punctuation: /\|/ }
					}
				}
			},
			code: [
				{ pattern: /(^[ \t]*(?:\r?\n|\r))(?: {4}|\t).+(?:(?:\r?\n|\r)(?: {4}|\t).+)*/m, lookbehind: !0, alias: 'keyword' },
				{ pattern: /``.+?``|`[^`\r\n]+`/, alias: 'keyword' },
				{
					pattern: /^```[\s\S]*?^```$/m,
					greedy: !0,
					inside: {
						'code-block': { pattern: /^(```.*(?:\r?\n|\r))[\s\S]+?(?=(?:\r?\n|\r)^```$)/m, lookbehind: !0 },
						'code-language': { pattern: /^(```).+/, lookbehind: !0 },
						punctuation: /```/
					}
				}
			],
			title: [
				{ pattern: /\S.*(?:\r?\n|\r)(?:==+|--+)(?=[ \t]*$)/m, alias: 'important', inside: { punctuation: /==+$|--+$/ } },
				{ pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: 'important', inside: { punctuation: /^#+|#+$/ } }
			],
			hr: { pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: 'punctuation' },
			list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: 'punctuation' },
			'url-reference': {
				pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
				inside: {
					variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
					string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
					punctuation: /^[\[\]!:]|[<>]/
				},
				alias: 'url'
			},
			bold: {
				pattern: n('__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__', !0),
				lookbehind: !0,
				greedy: !0,
				inside: { content: { pattern: /(^..)[\s\S]+(?=..$)/, lookbehind: !0, inside: {} }, punctuation: /\*\*|__/ }
			},
			italic: {
				pattern: n('_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_', !0),
				lookbehind: !0,
				greedy: !0,
				inside: { content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {} }, punctuation: /[*_]/ }
			},
			strike: {
				pattern: n('(~~?)(?:(?!~)<inner>)+?\\2', !1),
				lookbehind: !0,
				greedy: !0,
				inside: { content: { pattern: /(^~~?)[\s\S]+(?=\1$)/, lookbehind: !0, inside: {} }, punctuation: /~~?/ }
			},
			url: {
				pattern: n('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)| ?\\[(?:(?!\\])<inner>)+\\])', !1),
				lookbehind: !0,
				greedy: !0,
				inside: {
					variable: { pattern: /(\[)[^\]]+(?=\]$)/, lookbehind: !0 },
					content: { pattern: /(^!?\[)[^\]]+(?=\])/, lookbehind: !0, inside: {} },
					string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ }
				}
			}
		}),
		['url', 'bold', 'italic', 'strike'].forEach(function(e) {
			['url', 'bold', 'italic', 'strike'].forEach(function(n) {
				e !== n && (d.languages.markdown[e].inside.content.inside[n] = d.languages.markdown[n]);
			});
		}),
		d.hooks.add('after-tokenize', function(n) {
			('markdown' !== n.language && 'md' !== n.language) ||
				!(function n(e) {
					if (e && 'string' != typeof e)
						for (var t = 0, a = e.length; t < a; t++) {
							var i = e[t];
							if ('code' === i.type) {
								var r = i.content[1],
									o = i.content[3];
								if (r && o && 'code-language' === r.type && 'code-block' === o.type && 'string' == typeof r.content) {
									var l =
										'language-' +
										r.content
											.trim()
											.split(/\s+/)[0]
											.toLowerCase();
									o.alias ? ('string' == typeof o.alias ? (o.alias = [o.alias, l]) : o.alias.push(l)) : (o.alias = [l]);
								}
							} else n(i.content);
						}
				})(n.tokens);
		}),
		d.hooks.add('wrap', function(n) {
			if ('code-block' === n.type) {
				for (var e = '', t = 0, a = n.classes.length; t < a; t++) {
					var i = n.classes[t],
						r = /language-(.+)/.exec(i);
					if (r) {
						e = r[1];
						break;
					}
				}
				var o = d.languages[e];
				if (o) {
					var l = n.content.replace(/&lt;/g, '<').replace(/&amp;/g, '&');
					n.content = d.highlight(l, o, e);
				} else if (e && 'none' !== e && d.plugins.autoloader) {
					var s = 'md-' + new Date().valueOf() + '-' + Math.floor(1e16 * Math.random());
					(n.attributes.id = s),
						d.plugins.autoloader.loadLanguages(e, function() {
							var n = document.getElementById(s);
							n && (n.innerHTML = d.highlight(n.textContent, d.languages[e], e));
						});
				}
			}
		}),
		(d.languages.md = d.languages.markdown);
})(Prism);
!(function(i) {
	var t = i.util.clone(i.languages.javascript);
	(i.languages.jsx = i.languages.extend('markup', t)),
		(i.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i),
		(i.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
		(i.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
		(i.languages.jsx.tag.inside.tag.inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
		i.languages.insertBefore(
			'inside',
			'attr-name',
			{ spread: { pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/, inside: { punctuation: /\.{3}|[{}.]/, 'attr-value': /\w+/ } } },
			i.languages.jsx.tag
		),
		i.languages.insertBefore(
			'inside',
			'attr-value',
			{
				script: {
					pattern: /=(?:\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
					inside: { 'script-punctuation': { pattern: /^=(?={)/, alias: 'punctuation' }, rest: i.languages.jsx },
					alias: 'language-javascript'
				}
			},
			i.languages.jsx.tag
		);
	var o = function(t) {
			return t ? ('string' == typeof t ? t : 'string' == typeof t.content ? t.content : t.content.map(o).join('')) : '';
		},
		p = function(t) {
			for (var n = [], e = 0; e < t.length; e++) {
				var a = t[e],
					s = !1;
				if (
					('string' != typeof a &&
						('tag' === a.type && a.content[0] && 'tag' === a.content[0].type
							? '</' === a.content[0].content[0].content
								? 0 < n.length && n[n.length - 1].tagName === o(a.content[0].content[1]) && n.pop()
								: '/>' === a.content[a.content.length - 1].content || n.push({ tagName: o(a.content[0].content[1]), openedBraces: 0 })
							: 0 < n.length && 'punctuation' === a.type && '{' === a.content
							? n[n.length - 1].openedBraces++
							: 0 < n.length && 0 < n[n.length - 1].openedBraces && 'punctuation' === a.type && '}' === a.content
							? n[n.length - 1].openedBraces--
							: (s = !0)),
					(s || 'string' == typeof a) && 0 < n.length && 0 === n[n.length - 1].openedBraces)
				) {
					var g = o(a);
					e < t.length - 1 && ('string' == typeof t[e + 1] || 'plain-text' === t[e + 1].type) && ((g += o(t[e + 1])), t.splice(e + 1, 1)),
						0 < e && ('string' == typeof t[e - 1] || 'plain-text' === t[e - 1].type) && ((g = o(t[e - 1]) + g), t.splice(e - 1, 1), e--),
						(t[e] = new i.Token('plain-text', g, null, g));
				}
				a.content && 'string' != typeof a.content && p(a.content);
			}
		};
	i.hooks.add('after-tokenize', function(t) {
		('jsx' !== t.language && 'tsx' !== t.language) || p(t.tokens);
	});
})(Prism);
