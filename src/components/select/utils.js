import ShuyunUtils from 'shuyun-utils';
import { Children, cloneElement } from 'react';

// 将组件children转换成带label|value的对象数组
export const formatOptionSource = (data) => {
  const result = [];
  if (ShuyunUtils.type(data) === 'object') {
    result.push({
      label: data.children,
      value: data.value,
    });
  }
  return result;
};

export const filterOptions = (options, filter, labelKey) => options.reduce((acc, child) => {
  const { children, type, item } = child.props;
  const label = Array.isArray(children)
    ? children.find((v) => typeof v === 'string' || typeof v === 'number')
    : children;
  if (label && String(label).indexOf(filter) > -1) {
    acc.push(child);
  } else if (type && type === 'divider') {
    acc.push(child);
  } else if (item?.[labelKey] && String(item?.[labelKey]).indexOf(filter) > -1) {
    acc.push(child);
  }
  return acc;
}, []);

export const filterGroupOption = (options, filter) => Children.map(options, (child) => {
  const _children = child.props.children || [];
  const tmp = _children.map((c) => {
    if (Array.isArray(c)) {
      const item = [];
      c.forEach((cc) => {
        const label = cc.props.children;
        if (label && String(label).indexOf(filter) > -1) {
          item.push(cc);
        }
      });
      return item;
    } else {
      return c;
    }
  });
  return cloneElement(child, {
    children: tmp,
  });
}).filter((x) => !!x.props.children[1].length);

export const isGroupSelectPicker = (dataSource) => Array.isArray(dataSource)
  && dataSource.length !== 0
  && dataSource.every((x) => x.options);
