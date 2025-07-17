import React, { useState, useEffect, useRef } from 'react';
import { noop, prefixCls } from '@utils';
import PropTypes from 'prop-types';
import Button from '../button';
import Form from '../form';
import Icon from '../icon';
import { getTextWidth } from '../c-table/util';
import './index.less';

const searchBoxPrefix = `${prefixCls}-search-box`;

function SearchBox(
  {
    field,
    searchList,
    extraEle,
    defaultLine,
    onReset = noop,
    onSearch = noop,
  },
) {
  const [maxSearchNum, setMaxSearchNum] = useState(searchList.length);
  const [labelWidth, setLabelWidth] = useState(70);
  const [showMore, setShowMore] = useState(false);

  const formRef = useRef(null);
  const operateRef = useRef(null);

  const onSetMaxSearchNum = () => {
    if (!formRef.current) return;

    const formEle = formRef.current.querySelector(`.${prefixCls}-form`);
    if (!formEle) return;

    // 搜索区域的 padding
    const formPadding = Number(window.getComputedStyle(formEle).padding.replace('px', ''));
    // 搜索区域总宽度
    const formWidth = formEle.clientWidth - formPadding * 2;

    // 每一个搜索项的宽度
    const formItem = formEle.querySelector(`.${prefixCls}-form-item`);
    if (!formItem) return;
    const formItemWidth = formItem.clientWidth;

    // 搜索项 marginRight
    const [, rowGap] = window
      .getComputedStyle(formEle)
      .gap.split('px')
      .filter(Boolean)
      .map(item => item.trim());
    const marginRight = Number(rowGap);

    // 一行的搜索项最大数量
    const oneLineMaxNum = Math.floor((formWidth + marginRight) / (formItemWidth + marginRight));
    setMaxSearchNum(oneLineMaxNum * defaultLine);

    // 更新搜索区域的宽度
    const operateItem = operateRef.current;
    if (operateItem) {
      operateItem.style.width = `${
        oneLineMaxNum * formItemWidth + marginRight * (oneLineMaxNum - 1)
      }px`;
    }
  };

  const onSetLabelWidth = () => {
    const _labelWidth = Math.max(...searchList.map(item => getTextWidth(`${item.label}：`)));
    setLabelWidth(_labelWidth);
  };

  const onResize = () => {
    onSetMaxSearchNum();
    onSetLabelWidth();
  };

  useEffect(() => {
    onResize();
    setTimeout(() => {
      onResize();
    });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onToggleSearch = () => {
    setShowMore(!showMore);
    setTimeout(() => {
      onResize();
    });
  };

  return (
    <div ref={formRef}>
      <Form layout="horizontal" className={searchBoxPrefix} field={field}>
        {searchList?.slice(0, maxSearchNum)?.map(item => (
          <Form.Item label={item.label} labelCol={{ style: { width: labelWidth } }}>
            {item.content}
          </Form.Item>
        ))}
        {searchList?.slice(maxSearchNum)?.map(item => (
          <Form.Item
            className={!showMore ? `${searchBoxPrefix}-hide-form-item` : ''}
            label={item.label}
            labelCol={{ style: { width: labelWidth } }}
          >
            {item.content}
          </Form.Item>
        ))}
        <div className={`${searchBoxPrefix}-operate`} ref={operateRef}>
          <div className={`${searchBoxPrefix}-operate-btn`} style={{ marginLeft: labelWidth }}>
            <Button type="primary" onClick={onSearch}>
              搜索
            </Button>
            <Button type="secondary" style={{ marginLeft: 16 }} onClick={onReset}>
              重置
            </Button>
            {extraEle}
          </div>
          {searchList?.length > maxSearchNum && (
            <Button
              className={`${searchBoxPrefix}-more-search`}
              type="link"
              size="small"
              onClick={onToggleSearch}
            >
              {showMore ? '收起筛选' : '展开筛选'}
              <Icon
                className={`${searchBoxPrefix}-more-search-btn ${showMore && `${searchBoxPrefix}-shore-more`}`}
                type="down"
              />
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default SearchBox;

SearchBox.propTypes = {
  searchList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.any.isRequired,
    }),
  ),
  defaultLine: PropTypes.number,
  onReset: PropTypes.func,
  onSearch: PropTypes.func,
};

SearchBox.defaultProps = {
  defaultLine: 2,
  onReset: noop,
  onSearch: noop,
};
