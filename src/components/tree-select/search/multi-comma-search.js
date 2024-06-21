import React, { useEffect, useRef, useState } from 'react';
import { selector } from '../const';
import Input from '../../input';
import { noop } from '../../../utils';

export default function SingleSearch({
  selected,
  placeholder,
  open,
  searchValue,
  onSearchValueChange = noop,
  setSearchStatus,
  disabled,
  scrollSelected,
}) {
  const searchRef = useRef();
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
    <div className={`${selector}-search-container`}>
      {/* 有已选 && 未聚焦：展示黑色*/}
      <span
        className={`${selector}-select-selected ${scrollSelected ? 'scroll-selected' : 'overflow-ellipsis'}`}
        style={!!selected.length && !isFocusSearchInput ? {} : { visibility: 'hidden', width: 0 }}
      >
        {selected || '-'}
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
