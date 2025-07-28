/* eslint-disable prefer-rest-params */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */

const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = toArray;

const _react = _interopRequireDefault(require('react'));

const _reactIs = require('react-is');

function toArray(children) {
  const option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let ret = [];

  _react.default.Children.forEach(children, (child) => {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if ((0, _reactIs.isFragment)(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });

  return ret;
}
