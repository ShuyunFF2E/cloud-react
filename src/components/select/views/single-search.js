import React, { useEffect, useRef, useState } from 'react';
import { selector } from './common';
import Input from '../../input';

export default function SingleSearch({
  selected,
  placeholder,
  open,
  searchValue,
  onSearchValueChange,
  onSearch,
  setSearchStatus,
  disabled,
}) {
  const searchRef = useRef();
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);

  let searchPlaceholder = placeholder;
  if (isFocusSearchInput) {
    searchPlaceholder = selected[0] || placeholder;
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
    if (open) {
      setIsFocusSearchInput(true);
      searchRef.current.querySelector('input').focus();
    } else {
      setIsFocusSearchInput(false);
    }
    clearSearchValue();
  }, [open]);

  useEffect(() => {
    setSearchStatus(isFocusSearchInput);
  }, [isFocusSearchInput]);

  return (
    <div className={`${selector}-single-select-container`}>
      {/* 有已选 && 未聚焦：展示黑色*/}
      <span
        className={`${selector}-single-search-selected`}
        style={!!selected.length && !isFocusSearchInput ? {} : { visibility: 'hidden', width: 0 }}
      >
        {selected?.[0] || '-'}
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
