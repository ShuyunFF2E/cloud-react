import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { prefixCls } from '@utils';
import { isVoid } from '../util';
import Tooltip from '../../tooltip';
import './index.less';

export default function MultiLinkTpl({ value, row, linkKey, onClick }) {
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
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <p
        ref={ref}
        className={`${prefixCls}-table-column-tpl-multi-link`}
        onClick={() => {
          if (onClick) {
            onClick();
            return;
          }
          if (row?.[linkKey]) {
            window.open(row?.[linkKey]);
          }
        }}
      >
        {value}
      </p>
    </Tooltip>
  );
}

MultiLinkTpl.propTypes = {
  value: PropTypes.string.isRequired,
  linkKey: PropTypes.string.isRequired,
};

MultiLinkTpl.defaultProps = {};
