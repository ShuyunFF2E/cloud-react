import PropTypes from 'prop-types';

export const NOTIFICATION_BODY_PROPS = {
  title: PropTypes.any.isRequired,
  content: PropTypes.any.isRequired,
  duration: PropTypes.number,
  showCloseIcon: PropTypes.bool,
  btn: PropTypes.any,
  className: PropTypes.string,
  borderRadiusSize: PropTypes.oneOf([ 'small', 'default', 'large' ]),
  showIcon: PropTypes.bool,
  IconType: PropTypes.oneOf(['info', 'success', 'warn', 'fail']),
  icon: PropTypes.any,
  showCancelBtn: PropTypes.bool,
  showConfirmBtn: PropTypes.bool,
  showDetailBtn: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export const DEFAULT_BODY_PROPS = {
  duration: 4500,
  showCloseIcon: null,
  btn: null,
  className: '',
  borderRadiusSize: 'default',
  showIcon: false,
  IconType: 'info',
  icon: null,
  showCancelBtn: false,
  showConfirmBtn: false,
  showDetailBtn: false,
  onConfirm: () => {},
};
