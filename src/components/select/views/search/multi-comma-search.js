/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import { selector } from '../common';
import Input from '../../../input';

export default function MultiCommaSearch({
  selectedList,
  dataSource,
  optionRender,
  placeholder,
  open,
  searchValue,
  onSearchValueChange,
  onSearch,
  setSearchStatus,
  disabled,
  scrollSelected,
  labelKey,
  valueKey,
  searchable,
}) {
  const searchRef = useRef();
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);

  const getSelectedLabel = () => {
    if (optionRender) {
      return dataSource
        .filter(item => selectedList.map(item1 => item1.value).includes(item[valueKey]))
        .map(item => item[labelKey])
        .join(',');
    }
    return selectedList?.map((item) => {
      // 此处是处理带图标的场景（可查看 demo）
      if (Array.isArray(item.label)) {
        return item.label.find((v) => typeof v === 'string');
      }
      return item.label;
    })?.join(',');
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

  return (
    <div className={`${selector}-select-container`}>
      {/* 有已选 && 未聚焦：展示黑色*/}
      <span
        className={`${selector}-search-selected ${scrollSelected ? 'scroll-selected' : 'overflow-ellipsis'}`}
        style={!!selectedList.length && !isFocusSearchInput ? {} : { visibility: 'hidden', width: 0, height: 10 }}
      >
        {getSelectedLabel()}
      </span>
      <div ref={searchRef} className={`${selector}-search`}>
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
      </div>
    </div>
  );
}
