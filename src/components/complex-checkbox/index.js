import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixCls } from '@utils';
import Checkbox from '../checkbox';
import Tooltip from '../tooltip';
import './index.less';

const classSelector = `${prefixCls}-complex`;

export default function ComplexCheckbox(props) {
  const {
    imgSrc,
    title,
    content,
    textOverflowEllipsis,
    contentStyle,
    type,
    ...otherProps
  } = props;

  const titleContentMode = !!(title && content && !imgSrc);
  const titleContentImgMode = !!(title && content && imgSrc);

  return (
    <Checkbox
      className={classNames(classSelector, {
        [`${classSelector}-title-content`]: titleContentMode,
        [`${classSelector}-img`]: titleContentImgMode,
        [`${classSelector}-disabled`]: props.disabled,
        [`${classSelector}-overflow-ellipsis`]: textOverflowEllipsis,
        [`${classSelector}-card`]: type === 'card',
        [`${classSelector}-card-disabled`]: type === 'card' && props.disabled,
        [`${classSelector}-card-checked`]:
          type === 'card' && (props.checked || props.defaultChecked),
      })}
      {...otherProps}
    >
      {imgSrc && <img alt="header" src={imgSrc} />}
      <div>
        {title && <p className={`${classSelector}-title`}>{title}</p>}
        {content
          && (textOverflowEllipsis ? (
            <Tooltip content={content}>
              <div className={`${classSelector}-content`} style={contentStyle}>
                {content}
              </div>
            </Tooltip>
          ) : (
            <div className={`${classSelector}-content`} style={contentStyle}>
              {content}
            </div>
          ))}
      </div>
    </Checkbox>
  );
}

ComplexCheckbox.propTypes = {
  content: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  textOverflowEllipsis: PropTypes.bool,
  contentStyle: PropTypes.object,
  type: PropTypes.string,
};

ComplexCheckbox.defaultProps = {
  imgSrc: '',
  title: '',
  textOverflowEllipsis: false,
  contentStyle: {},
  type: 'default',
};
