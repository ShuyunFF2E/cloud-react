import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import './index.less';

const classSelector = `${prefixCls}-page-header`;

export default function PageHeader(props) {
  const {
    title, subTitle, className, size, style, onBack, breadcrumb,
  } = props;
  const hasBreadCrumbElement = React.isValidElement(breadcrumb);
  const splitWrap = <span className="split" />;

  return (
    <div>
      {hasBreadCrumbElement && breadcrumb}
      <div
        className={classnames(`${classSelector}`,
          `${classSelector}-${size}`,
          className)}
        style={style}
      >
        {onBack && <i className={classnames(`${classSelector}-icon`, 'cloud-icon icon-left')} onClick={onBack} />}
        <span>{title}</span>
        {subTitle && splitWrap}
        {subTitle && <span className={`${classSelector}-subtitle`}>{subTitle}</span>}
      </div>
    </div>

  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onBack: PropTypes.func,
  size: PropTypes.string,
  breadcrumb: PropTypes.element,
};
PageHeader.defaultProps = {
  title: '',
  subTitle: '',
  onBack: null,
  breadcrumb: null,
  size: 'default',
};
