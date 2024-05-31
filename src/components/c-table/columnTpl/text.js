import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { prefixCls } from '@utils';
import { isVoid } from '../util';
import Tooltip from '../../tooltip';
import './index.less';

export default function TextTpl({ value, line = 1 }) {
  const ref = useRef();
  const [tooltipContent, setTooltipContent] = useState('');

  useEffect(() => {
    if (!isVoid(value)) {
      if (ref.current.scrollHeight > ref.current.clientHeight) {
        setTooltipContent(value);
      }
    }
  }, []);

  if (isVoid(value)) {
    return '-';
  }
  return (
    <Tooltip content={tooltipContent} theme="light">
      <p
        ref={ref}
        className={`${prefixCls}-table-column-tpl-text`}
        style={{ '-webkit-line-clamp': `${line}` }}
      >
        {value}
      </p>
    </Tooltip>
  );
}

TextTpl.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

TextTpl.defaultProps = {};
