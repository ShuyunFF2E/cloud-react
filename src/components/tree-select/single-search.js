import React, { useEffect, useState } from 'react';
import { selector } from './const';
import Input from '../input';
import { noop } from '../../utils';

export default function SingleSearch({
  selected,
  placeholder,
  open,
  searchValue,
  onSearchValueChange = noop,
  setSearchStatus,
  disabled,
}) {
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);

  let searchPlaceholder = placeholder;
  if (isFocusSearchInput) {
    searchPlaceholder = selected || placeholder;
  } else if (selected) { // 有已选 && 未聚焦
    searchPlaceholder = '';
  }

  const onOptionsSearch = evt => {
    onSearchValueChange(evt.target.value);
  };

  const clearSearchValue = () => {
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
    </>
  );
}
