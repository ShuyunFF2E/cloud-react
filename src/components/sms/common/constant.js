// common constant
export const KEYWORD_SIGN = 'œœ';
export const NEW_LINE = 'þ_enter_þ';

// editor constant
export const BRACKET_REG = /[【】œþ]/g;
export const DEFAULT_TYPE_NAME = 'default';
export const HTML_ENTITY_CODE = {
	'&nbsp;': ' ',
	'&lt;': '<',
	'&gt;': '>',
	'&amp;': '&'
};

const regUrlBase = '((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+\\$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[\\+~%\\/.\\w-_]*)?\\??(?:[-\\+=&;%@.\\w_]*)#?(?:[.\\!\\/\\\\w]*))?)';
export const REG_URL = new RegExp(regUrlBase);
export const REG_URL_HASH = new RegExp(`${regUrlBase}#`);
