/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import { selector } from '../common';
import Input from '../../../input';
import Icon from '../../../icon';
import Tooltip from '../../../tooltip';

export default function SingleSearch({
  selectedList,
  dataSource,
  optionRender,
  placeholder,
  open,
  searchValue,
  searchable,
  onSearchValueChange,
  onSearch,
  setSearchStatus,
  disabled,
  scrollSelected,
  valueKey,
  labelKey,
  selectInfoKey,
}) {
  const searchRef = useRef();
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);

  const getSelectedLabel = () => {
    if (optionRender) {
      const list = dataSource.find(item => !!item?.options?.length)
        ? dataSource
          .reduce((arr, item) => {
            arr.push(...(item.options || []));
            return arr;
          }, [])
        : dataSource;
      return list.filter(item => selectedList.map(item1 => item1.value).includes(item[valueKey]))
        .map(item => item[labelKey])
        .join(',');
    }

    return selectedList?.map((item) => {
      // 此处是处理带图标的场景（可查看 demo）
      if (Array.isArray(item.label)) {
        return item.label.find((v) => typeof v === 'string');
      }
      return item.label;
    })?.[0];
  };

  let searchPlaceholder = placeholder;
  if (isFocusSearchInput) {
    searchPlaceholder = getSelectedLabel() || placeholder;
  } else if (selectedList?.length) { // 有已选 && 未聚焦
    searchPlaceholder = '';
  }

  const onOptionsSearch = evt => {
    onSearch(evt.target.value);
    onSearchValueChange(evt.target.value);
  };

  const clearSearchValue = () => {
    onSearch('');
    onSearchValueChange('');
  };

  useEffect(() => {
    if (selectedList.length) {
      clearSearchValue();
    }
  }, [selectedList]);

  useEffect(() => {
    if (searchable) {
      if (open) {
        setIsFocusSearchInput(true);
        searchRef.current.querySelector('input').focus();
      } else {
        setIsFocusSearchInput(false);
      }
      clearSearchValue();
    }
  }, [open, searchable]);

  useEffect(() => {
    setSearchStatus(isFocusSearchInput);
  }, [isFocusSearchInput]);

  const currentSelectItem = dataSource?.find(item => item[valueKey] === selectedList?.[0]?.[valueKey]);

  return (
    <div className={`${selector}-select-container`}>
      {/* 有已选 && 未聚焦：展示黑色*/}
      <span
        className={`${selector}-search-selected ${scrollSelected ? 'scroll-selected' : 'overflow-ellipsis'}`}
        style={
          currentSelectItem?.[selectInfoKey]
            ? { width: 'fit-content' }
            : !!selectedList.length && !isFocusSearchInput ? {} : { visibility: 'hidden', width: 0, height: 10 }
        }
      >
        {getSelectedLabel()}
      </span>
      {currentSelectItem?.[selectInfoKey] && (
        <Tooltip theme="light" content={currentSelectItem?.[selectInfoKey]}>
          <Icon type="question-circle-solid" style={{ color: 'rgba(0, 0, 0, 0.25)', marginLeft: 4 }} />
        </Tooltip>
      )}
      <div ref={searchRef} className={`${selector}-search`}>
        {searchable ? (
          <Input
            disabled={disabled}
            // useComposition
            value={searchValue}
            placeholder={searchPlaceholder}
            onChange={onOptionsSearch}
            className={`${selector}-search-input`}
            onFocus={() => {
              setIsFocusSearchInput(true);
            }}
            onBlur={() => {
              setIsFocusSearchInput(false);
            }}
          />
        ) : (
          <span className="search-placeholder">{searchPlaceholder}</span>
        )}
      </div>
    </div>
  );
}
