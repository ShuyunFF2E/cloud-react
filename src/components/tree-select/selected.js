import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop } from '@utils';

import Icon from '../icon';
import { MULTIPLE, selector, SINGLE, findTreeNode } from './const';
import SingleSearch from './single-search';
import MultiSearch from './multi-search';

import './index.less';

const getLables = dataSource => {
  const source = Array.isArray(dataSource) ? dataSource : [dataSource];
  return source.map(item => item.name || item.label).join(',');
};

const getPath = (nodeList = [], treeData = []) => nodeList.reduce((arr, item) => {
  const treeNode = findTreeNode(item, treeData);
  if (treeNode?.path?.length) {
    arr.push(treeNode?.path?.join('/'));
  }
  return arr;
}, []).join(',');

export default class Selected extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();

    const labels = props.showPath ? getPath(props.dataSource, props.treeData) : getLables(props.dataSource);
    this.state = {
      selectStr: labels || '',
      clear: false,
      prevProps: this.props,
      searchValue: '',
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { prevProps } = prevState;
    if (props.dataSource !== prevProps.dataSource) {
      const labels = props.showPath ? getPath(props.dataSource, props.treeData) : getLables(props.dataSource);
      return {
        selectStr: labels || '',
        prevProps: props,
      };
    }
    return null;
  }

  onMouseEnter = () => {
    this.setState({
      clear: true,
    });
  };

  onMouseLeave = () => {
    this.setState({
      clear: false,
    });
  };

  onSearchValueChange = search => {
    this.setState({ searchValue: search });
    if (this.props.treeRef?.current?.onSearchAction) {
      this.props.treeRef.current.onSearchAction(search);
    }
  };

  render() {
    const {
      props: {
        allowClear,
        disabled,
        placeholder,
        open,
        onClear,
        onClick,
        searchable,
        setSearchStatus,
        searchInBox,
        type,
        onMultiChange,
        positionPop,
        maxTagCount,
        selectedList,
        isSearch,
        treeData,
        showPath,
        // singleTreeRef,
        // singleTreeValue,
      },
      state: { selectStr, clear },
      onMouseEnter,
      onMouseLeave,
    } = this;

    const classNames = classnames(`${selector}-wrapper`, {
      disabled,
      empty: !selectStr,
      'search-in-box': searchInBox,
      'multi-search-in-box': searchable && searchInBox && type === MULTIPLE,
    });
    const iconClasses = classnames(`${selector}-select-icon`, {
      open,
      close: !open,
      hidden: searchInBox && isSearch || clear && selectStr && !disabled,
    });
    const clearClasses = classnames(`${selector}-select-icon ${selector}-clear-icon`, {
      show: clear && selectStr && !disabled,
    });
    const searchClasses = classnames(
      `${selector}-search-icon`,
      {
        show: searchInBox && isSearch && (!clear || !selectStr) && !disabled,
      },
    );

    let SearchCom = null;
    if (searchable && searchInBox && type === SINGLE) {
      SearchCom = SingleSearch;
    }
    if (searchable && searchInBox && type === MULTIPLE) {
      SearchCom = MultiSearch;
    }

    return (
      <div
        ref={this.ref}
        className={classNames}
        onClick={onClick}
        onMouseEnter={allowClear ? onMouseEnter : noop}
        onMouseLeave={allowClear ? onMouseLeave : noop}
      >
        {!searchInBox && <span className={`${selector}-selected`}>{selectStr || placeholder}</span>}
        {SearchCom && (
          <SearchCom
            selected={this.state.selectStr}
            placeholder={placeholder}
            open={open}
            searchValue={this.state.searchValue}
            onSearchValueChange={this.onSearchValueChange}
            onMultiChange={onMultiChange}
            setSearchStatus={setSearchStatus}
            positionPop={positionPop}
            selectedList={selectedList}
            maxTagCount={maxTagCount}
            disabled={disabled}
            treeData={treeData}
            showPath={showPath}
          />
        )}
        {/* {searchable && searchInBox && type === DEFAULT && (*/}
        {/*  <SingleSearch*/}
        {/*    selected={singleTreeValue?.value || ''}*/}
        {/*    placeholder={placeholder}*/}
        {/*    open={open}*/}
        {/*    searchValue={singleTreeRef?.current?.state?.searchValue || ''}*/}
        {/*    onSearchValueChange={v => singleTreeRef?.current?.onOptionsSearch({ target: v })}*/}
        {/*    setSearchStatus={setSearchStatus}*/}
        {/*    disabled={disabled}*/}
        {/*  />*/}
        {/* )}*/}
        <Icon type="close-fill-1" className={clearClasses} onClick={onClear} />
        <Icon type="search" className={searchClasses} />
        <Icon type="down" className={iconClasses} />
      </div>
    );
  }
}

Selected.propTypes = {
  disabled: PropTypes.bool,
  allowClear: PropTypes.bool,
  open: PropTypes.bool,
  dataSource: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  onClear: PropTypes.func,
  searchable: PropTypes.bool,
};

Selected.defaultProps = {
  disabled: false,
  allowClear: false,
  open: false,
  dataSource: [],
  placeholder: '',
  onClick: noop,
  onClear: noop,
  searchable: false,
};
