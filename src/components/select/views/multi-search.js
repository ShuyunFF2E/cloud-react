import React, { useEffect, useRef, useState } from 'react';
import { selector } from './common';
import Icon from '../../icon';
import Input from '../../input';
import { getTextWidth } from '../../c-table/util';

export default function MultiSearch({
  placeholder,
  searchValue,
  open,
  onSearchValueChange,
  onSearch,
  onMultiChange,
  positionPop,
  selectedList,
  maxTagCount,
  setSearchStatus,
  disabled,
  searchable,
}) {
  const searchRef = useRef();
  const [selectList, setSelectList] = useState([]);

  const onOptionsSearch = evt => {
    onSearch(evt.target.value);
    onSearchValueChange(evt.target.value);
    const width = getTextWidth(evt.target.value);
    searchRef.current.style.width = `${width || 4}px`;
  };

  const clearSearchValue = () => {
    onSearch('');
    onSearchValueChange('');
  };

  useEffect(() => {
    if (searchable) {
      if (open) {
        searchRef.current.querySelector('input').focus();
        setSearchStatus(true);
      } else {
        setSearchStatus(false);
        clearSearchValue();
      }
    }
  }, [open, selectedList, searchable]);

  useEffect(() => {
    setSelectList([...selectedList]);
    setTimeout(() => {
      positionPop();
    });
  }, [selectedList]);

  const onKeyDown = evt => {
    const keyCode = evt.key;
    if (keyCode === 'Backspace' && !searchValue && selectList.length) {
      selectList.pop();
      setSelectList([...selectList]);
      onMultiChange(selectList.map(i => i.value));
      positionPop();
    }
  };

  const onItemClose = (evt, item) => {
    evt.stopPropagation();
    const index = selectList.findIndex(item1 => item1.value === item.value);
    if (index > -1) {
      selectList.splice(index, 1);
      onMultiChange(selectList.map(i => i.value));
      positionPop();
    }
  };

  const showSelectList = maxTagCount ? selectList.slice(0, maxTagCount) : selectList;
  const hideSelectList = maxTagCount ? selectList.slice(maxTagCount) : [];

  return (
    <div className={`${selector}-multi-search-container`}>
      {selectList?.length ? (
        <>
          {showSelectList.map(item => (
            <span key={item.value} className={`${selector}-multiple-search-item ${disabled && 'disabled'}`}>
              <span className={`${selector}-multiple-search-item-text`} title={item.label}>{item.label}</span>
              {!disabled && <Icon type="close" onClick={evt => onItemClose(evt, item)} />}
            </span>
          ))}
          {hideSelectList.length ? (
            <span className={`${selector}-multiple-search-item ${disabled && 'disabled'}`}>
              <span className={`${selector}-multiple-search-item-count`}>
                +
                {hideSelectList.length}
              </span>
            </span>
          ) : null}
        </>
      ) : (
        <span style={{ visibility: 'hidden', width: 0, marginLeft: -4 }}>-</span>
      )}
      {searchable && (
        <div ref={searchRef} className={`${selector}-search`}>
          <Input
            disabled={disabled}
            // useComposition
            value={searchValue}
            placeholder=""
            onChange={onOptionsSearch}
            className={`${selector}-search-input`}
            onKeyDown={onKeyDown}
          />
        </div>
      )}
      {selectList.length || searchValue ? '' : <p className={`${selector}-multi-search-placeholder`}>{placeholder}</p>}
    </div>
  );
}
