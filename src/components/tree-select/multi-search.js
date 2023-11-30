import React, { useEffect, useRef, useState } from 'react';
import { selector } from './const';
import Icon from '../icon';
import Input from '../input';
import { getTextWidth } from '../c-table/util';

export default function MultiSearch({
  placeholder,
  searchValue,
  open,
  onSearchValueChange,
  onMultiChange,
  positionPop,
  selectedList,
  maxTagCount,
  setSearchStatus,
  disabled,
}) {
  const searchRef = useRef();
  const [selectList, setSelectList] = useState([]);

  const onOptionsSearch = evt => {
    onSearchValueChange(evt.target.value);
    const width = getTextWidth(evt.target.value);
    searchRef.current.style.width = `${width || 4}px`;
  };

  const clearSearchValue = () => {
    onSearchValueChange('');
  };

  useEffect(() => {
    if (open) {
      searchRef.current.querySelector('input').focus();
      setSearchStatus(true);
    } else {
      setSearchStatus(false);
      clearSearchValue();
    }
  }, [open, selectList.length]);

  useEffect(() => {
    setSelectList([...selectedList]);
    setTimeout(() => {
      positionPop();
    });
  }, [selectedList]);

  const onKeyDown = evt => {
    const keyCode = evt.key;
    if (keyCode === 'Backspace' && !searchValue && selectList.length) {
      const deletedNode = selectList.pop();
      onMultiChange(deletedNode, selectList);
      setSelectList([...selectList]);
      positionPop();
    }
  };

  const onItemClose = (evt, item) => {
    evt.stopPropagation();
    const index = selectList.findIndex(item1 => item1.value === item.value);
    if (index > -1) {
      const deletedNode = selectList.splice(index, 1);
      onMultiChange(deletedNode, selectList);
      setSelectList([...selectList]);
      positionPop();
    }
  };

  const showSelectList = maxTagCount ? selectList.slice(0, maxTagCount) : selectList;
  const hideSelectList = maxTagCount ? selectList.slice(maxTagCount) : [];

  return (
    <>
      {showSelectList.map(item => (
        <span key={item.id} className={`${selector}-multiple-search-item ${disabled && 'disabled'}`}>
          <span className={`${selector}-multiple-search-item-text`} title={item.name}>{item.name}</span>
          {!disabled && <Icon type="close" onClick={evt => onItemClose(evt, item)} />}
        </span>
      ))}
      {hideSelectList.length ? (
        <span className={`${selector}-multiple-search-item ${disabled && 'disabled'}`}>
          +
          {hideSelectList.length}
        </span>
      ) : null}
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
      <p className={`${selector}-multi-search-placeholder`}>{selectList.length || searchValue ? '' : placeholder}</p>
    </>
  );
}
