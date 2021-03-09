import PropTypes from 'prop-types';
import { noop } from '@utils';

export const PROPTYPES = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	canEdit: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.instanceOf(Date)]),
	open: PropTypes.bool,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	isAppendToBody: PropTypes.bool,
	position: PropTypes.string,
	containerEleClass: PropTypes.string,
	onChange: PropTypes.func
};

export const DEFAULT_PROPS = {
	className: '',
	disabled: false,
	canEdit: false,
	defaultValue: undefined,
	value: undefined,
	open: false,
	width: 230,
	isAppendToBody: false,
	position: undefined,
	containerEleClass: undefined,
	onChange: noop
};
