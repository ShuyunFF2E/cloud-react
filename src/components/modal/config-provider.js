import { createContext } from 'react';
import { sandboxSelector } from './constants';

export default createContext({
	rootWindow: window,
	rootDocument: document,
	getContext() {
		return document.querySelector(`.${sandboxSelector}`) || document.body;
	}
});
