import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import './index.less';

const classSelector = `${prefixCls}-avatar`;

export default function Avatar(props) {
  const [ isImgExist, setIsImgExist ] = React.useState(true);
  const hasImageElement = React.isValidElement(src);

  React.useEffect(() => {
    setIsImgExist(true);
	}, [ props.src ]);

  const {
    className, size, shape, icon, src, srcSet, group, children,
  } = props;
  let { style = {}, alt } = props;
  alt = group ? 'group-fill' : 'user-fill';
  if (typeof size === 'number') {
    style.width = size;
    style.height = size;
  }

  const handleImgLoadError = () => {
    const { onError } = props;
    const errorFlag = onError ? onError() : undefined;
    if (errorFlag !== false) {
		  setIsImgExist(false);
    }
	};

  let renderChildren;
  if (typeof src === 'string' && isImgExist) {
    renderChildren = (
      <img
        src={src}
        srcSet={srcSet}
        onError={handleImgLoadError}
        alt={alt}
      />
		);
  } else if (hasImageElement) {
    renderChildren = src;
  } else if (icon) {
    renderChildren = icon;
  } else if (children) {
    renderChildren = children;
  } else {
    renderChildren = <i className={classnames(`${classSelector}-icon`, `cloud-icon icon-${alt}`)} />;
  }
  return (
    <span
      className={classnames(`${classSelector}`,
        `${classSelector}-${shape}`,
        `${classSelector}-${size}`,
        className)}
      style={style}
    >
      {renderChildren}
    </span>
  );
}

Avatar.propTypes = {
  alt: PropTypes.string,
  group: PropTypes.bool,
  icon: PropTypes.oneOfType([ PropTypes.element, PropTypes.string ]),
  shape: PropTypes.oneOf([ 'circle', 'square' ]),
  size: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.oneOf([ 'large', 'small', 'default' ]) ]),
  src: PropTypes.string,
  srcSet: PropTypes.string,
};
Avatar.defaultProps = {
  alt: 'user-fill',
  group: false,
  icon: '',
  shape: 'circle',
  size: 'default',
  src: '',
  srcSet: '',
};
