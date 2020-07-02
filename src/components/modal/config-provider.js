import { createContext } from 'react';
import { sandboxSelector } from './constants';

export default createContext({
	rootWindow: window,
	rootDocument: document,
	getContext() {
		return this.rootDocument.querySelector(`.${sandboxSelector}`) || this.rootDocument.body;
	}
});
