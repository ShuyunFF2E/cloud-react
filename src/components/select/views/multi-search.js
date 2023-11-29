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
  labelKey,
  valueKey,
  maxTagCount,
  setSearchStatus,
}) {
  const searchRef = useRef();
  const [selectList, setSelectList] = useState([]);

  const onOptionsSearch = evt => {
    onSearch(evt.target.value);
    onSearchValueChange(evt.target.value);
    const width = getTextWidth(evt.target.value);
    searchRef.current.style.width = `${width || 4}px`;
  };

  useEffect(() => {
    if (open) {
      searchRef.current.querySelector('input').focus();
      setSearchStatus(true);
    } else {
      setSearchStatus(false);
    }
  }, [open, selectedList]);

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
    <>
      {showSelectList.map(item => (
        <span key={item[valueKey]} className={`${selector}-multiple-search-item`}>
          <span className={`${selector}-multiple-search-item-text`} title={item[labelKey]}>{item[labelKey]}</span>
          <Icon type="close" onClick={evt => onItemClose(evt, item)} />
        </span>
      ))}
      {hideSelectList.length ? (
        <span className={`${selector}-multiple-search-item`}>
          +
          {hideSelectList.length}
        </span>
      ) : null}
      <div ref={searchRef} className={`${selector}-search`}>
        <Input
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
