import React from 'react';
import classnames from 'classnames';
import Icon from '../../icon';
import { tablePrefixCls } from '../constant';

/**
 * 自定义展开按钮
 * @param expendProps
 * @param hideIcon
 * @returns {JSX.Element}
 * @constructor
 */
const CustomExpandIcon = ({ expendProps, hideIcon }) => (
  <Icon
    className={classnames(`${tablePrefixCls}-expend-icon`, {
      [`${tablePrefixCls}-expend-icon-hide`]: hideIcon,
      [`${tablePrefixCls}-expend-icon-expended`]: expendProps.expanded,
    })}
    type="right"
    onClick={(e) => {
      expendProps.onExpand(expendProps.record, e);
    }}
  />
);

export default function getExpandableConfig({
  supportExpend,
  supportTree,
  expandable,
  onExpand,
  expandedRowRender,
}) {
  if (!supportExpend) {
    return {};
  }
  return {
    expandRowByClick: false,
    indentSize: 18,
    expandIcon: (expendProps) => {
      const hideExpendIcon = supportTree
        && (!expendProps.record.children || !expendProps.record.children.length);
      return (
        <CustomExpandIcon expendProps={expendProps} hideIcon={hideExpendIcon} />
      );
    },
    onExpand: (args) => {
      if (onExpand) {
        onExpand(args);
      }
    },
    expandedRowRender: supportTree
      ? undefined
      : (args) => {
        if (expandedRowRender) {
          return expandedRowRender(args);
        }
        return null;
      },
    ...expandable,
  };
}
