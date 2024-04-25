/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import { selector } from '../common';
import Input from '../../../input';

export default function SingleSearch({
  selected,
  showDesc,
  placeholder,
  open,
  searchValue,
  searchable,
  onSearchValueChange,
  onSearch,
  setSearchStatus,
  disabled,
  scrollSelected,
}) {
  const searchRef = useRef();
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);

  let searchPlaceholder = placeholder;
  if (isFocusSearchInput) {
    searchPlaceholder = (showDesc
      ? Array.isArray(selected?.[0]) ? selected?.[0]?.[0] : selected?.[0]
      : selected?.[0]) || placeholder;
  } else if (selected[0]) { // 有已选 && 未聚焦
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
    if (selected.length) {
      clearSearchValue();
    }
  }, [selected]);

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
        style={!!selected.length && !isFocusSearchInput ? {} : { visibility: 'hidden', width: 0 }}
      >
        {(showDesc
          ? Array.isArray(selected?.[0]) ? selected?.[0]?.[0] : selected?.[0]
          : selected?.[0]) || '-'}
      </span>
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
