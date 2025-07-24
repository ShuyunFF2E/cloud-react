import React from 'react';
import { prefixCls } from '@utils';
import LightText from '../light-text';
import './index.less';

const cls = `${prefixCls}-image-text`;

export default function ImageText({
  imgSrc,
  label,
  desc,
  imgStyle = {},
  disabled,
  icon,
  searchValue,
  searchable,
  supportLightText,
  lightTextColor,
}) {
  const getLabel = (originLabel) => {
    if (searchable && supportLightText) {
      return (
        <LightText
          keyWords={searchValue || ''}
          originText={originLabel}
          color={lightTextColor}
        />
      );
    }
    return originLabel;
  };

  return (
    <div className={`${cls} ${disabled && 'disabled'}`}>
      {imgSrc && <img src={imgSrc} alt="" className={`${cls}-img`} style={imgStyle} />}
      {icon}
      <div className={`${cls}-content`}>
        {label && <p className={`${cls}-title`}>{getLabel(label)}</p>}
        {desc && <p className={`${cls}-desc`}>{desc}</p>}
      </div>
    </div>
  );
}
