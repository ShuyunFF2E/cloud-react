import React, { useEffect, useState } from 'react';
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
}) {
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
    clearSearchValue();
  }, [open]);

  useEffect(() => {
    setSearchStatus(isFocusSearchInput);
  }, [isFocusSearchInput]);

  return (
    <>
      {/* 有已选 && 未聚焦：展示黑色*/}
      {!!selected.length && !isFocusSearchInput && (
        <span className={`${selector}-single-select-selected`}>
          {selected}
        </span>
      )}
      <div className={`${selector}-search`}>
        <Input
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
    </>
  );
}
