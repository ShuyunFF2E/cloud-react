import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { prefixCls, noop } from '@utils';
import FormContext from '../form/context';
import './index.less';

const Toggle = (props) => {
  const {
    checked,
    checkedText,
    unCheckedText,
    size,
    disabled,
    loading,
    onChange,
    onBeforeChange,
  } = props;
  const { size: formSize } = useContext(FormContext);
  const mergedSize = size || formSize || 'default';

  const prefix = `${prefixCls}-toggle`;

  const wrapper = classNames(prefix, mergedSize, {
    [`${prefix}-checked`]: checked,
    [`${prefix}-disabled`]: disabled,
  });

  const handleClick = (event) => {
    if (disabled) {
      return;
    }

    if (onBeforeChange) {
      onBeforeChange();
      return;
    }

    onChange(!checked, event);
  };

  return (
    <button type="button" className={wrapper} onClick={handleClick}>
      <span className={`${prefix}-inner`}>
        {checked ? checkedText : unCheckedText}
      </span>
      {loading && <span className={`${prefix}-loading`} />}
    </button>
  );
};

Toggle.propTypes = {
  size: PropTypes.oneOf([ 'default', 'small' ]),
  checked: PropTypes.bool,
  loading: PropTypes.bool,
  checkedText: PropTypes.string,
  unCheckedText: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeChange: PropTypes.func,
  onChange: PropTypes.func,
};

Toggle.defaultProps = {
  size: undefined,
  checked: false,
  loading: false,
  checkedText: '',
  unCheckedText: '',
  disabled: false,
  onBeforeChange: undefined,
  onChange: noop,
};

export default Toggle;
