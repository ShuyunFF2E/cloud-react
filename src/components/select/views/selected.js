/* eslint-disable no-nested-ternary */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop } from '@utils';

import Icon from '../../icon';
import { selector } from './common';

import SingleSearch from './single-search';
import MultiSearch from './multi-search';

import '../index.less';

const getLables = (props) => {
  const {
    dataSource: _dataSource,
    multiple,
    showSelectAll,
    metaData,
    supportUnlimited,
    unlimitedLabel,
    selectAllText,
  } = props;
  const dataSource = supportUnlimited
    ? _dataSource.filter((item) => item.value !== '')
    : _dataSource;
  if (multiple) {
    if (supportUnlimited && !dataSource?.length) {
      return unlimitedLabel || '不限';
    }
    if (showSelectAll) {
      const data = metaData.reduce((acc, v) => {
        acc.push({
          ...v,
          isSelected:
            dataSource.findIndex((i) => i.value === v.props.value) > -1,
        });
        return acc;
      }, []);
      const invalidLength = data.filter(
        (v) => v.props.disabled && !v.isSelected,
      ).length;
      if (data.length - invalidLength === dataSource.length) return selectAllText;
    }
    return dataSource
      .map((item) => {
        if (Array.isArray(item.label)) {
          return item.label.find((v) => typeof v === 'string');
        }
        return item.label;
      })
      .join(',');
  }
  return dataSource.map((item) => item.label);
};

export default class Selected extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();

    const labels = getLables(props);
    this.state = {
      selected: labels || '',
      clear: false,
      prevProps: this.props,
      searchValue: '',
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { prevProps } = prevState;
    if (props.dataSource !== prevProps.dataSource) {
      const labels = getLables(props);
      return {
        selected: labels || '',
        prevProps: props,
      };
    }
    return null;
  }

  onWrapperClick = () => {
    const { trigger, onClick } = this.props;
    if (trigger !== 'click') return;

    onClick();
  };

  onMouseEnter = () => {
    const {
      disabled, open, trigger, allowClear, onClick,
    } = this.props;
    if (!disabled) {
      if (trigger === 'hover' && !open) {
        onClick();
      }
      if (allowClear) {
        this.setState({
          clear: true,
        });
      }
    }
  };

  onMouseLeave = () => {
    this.setState({
      clear: false,
    });
  };

  onSearchValueChange = search => {
    this.setState({ searchValue: search });
    this.props.onSearchValueChange(search);
  };

  getSearchValue = () => this.state.searchValue;

  render() {
    const {
      props: {
        dataSource,
        disabled,
        isSupportTitle,
        placeholder,
        open,
        showArrow,
        showSelectStyle,
        onClear,
        size,
        supportUnlimited,
        searchable,
        searchInBox,
        multiple,
        onMultiChange,
        positionPop,
        labelKey,
        valueKey,
        maxTagCount,
        isSearch,
        setSearchStatus,
        showTag,
        maxHeight,
        showDesc,
        selectAllText,
      },
      state: { selected, clear },
      onMouseEnter,
      onMouseLeave,
    } = this;
    const classNames = classnames(`${selector}-wrapper`, {
      disabled,
      empty: supportUnlimited ? false : !dataSource.length,
      hidden: !showSelectStyle,
      'search-in-box': !multiple && searchable && searchInBox,
      'multi-search-in-box': multiple && (searchable && searchInBox || showTag),
      [`${size}`]: true,
    });
    const iconClasses = classnames(`${selector}-select-icon`, {
      open,
      close: !open,
      hidden: clear && selected.length || isSearch,
    });
    const clearClasses = classnames(
      `${selector}-select-icon ${selector}-clear-icon`,
      {
        show: clear && selected.length,
      },
    );
    const searchClasses = classnames(
      `${selector}-search-icon`,
      {
        show: isSearch && (!clear || !selected.length),
      },
    );
    let title = '';
    if (isSupportTitle) {
      title = Array.isArray(selected)
        ? selected.filter((item) => typeof item === 'string').join('')
        : selected;
    }

    let SearchCom = null;
    if (searchable && searchInBox && !multiple) {
      SearchCom = SingleSearch;
    }
    if ((searchable && searchInBox || showTag) && multiple) {
      SearchCom = MultiSearch;
    }

    return (
      <div
        ref={this.ref}
        className={classNames}
        onClick={this.onWrapperClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={maxHeight ? { maxHeight, overflow: 'auto' } : {}}
      >
        {SearchCom ? (
          <SearchCom
            placeholder={placeholder}
            selected={this.state.selected}
            selectedList={this.props.dataSource}
            unlimitedLabel={this.props.unlimitedLabel}
            supportUnlimited={this.props.supportUnlimited}
            onSearch={this.props.onSearch}
            open={open}
            searchValue={this.state.searchValue}
            onSearchValueChange={this.onSearchValueChange}
            onMultiChange={onMultiChange}
            positionPop={positionPop}
            labelKey={labelKey}
            valueKey={valueKey}
            maxTagCount={maxTagCount}
            setSearchStatus={setSearchStatus}
            disabled={disabled}
            searchable={searchable && searchInBox}
            showDesc={showDesc}
            selectAllText={selectAllText}
          />
        ) : (
          <span className={`${selector}-selected`} title={title}>
            {selected.length
              ? (
                showDesc
                  ? (multiple ? selected : Array.isArray(selected[0]) ? selected[0][0] : selected[0])
                  : selected
              )
              : placeholder}
          </span>
        )}
        <Icon type="close-fill-1" className={clearClasses} onClick={onClear} />
        <Icon type="search" className={searchClasses} />
        {showArrow && <Icon type="down" className={iconClasses} />}
      </div>
    );
  }
}

Selected.propTypes = {
  disabled: PropTypes.bool,
  allowClear: PropTypes.bool,
  open: PropTypes.bool,
  dataSource: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
  placeholder: PropTypes.string,
  showArrow: PropTypes.bool,
  showSelectStyle: PropTypes.bool,
  showDesc: PropTypes.bool,
  trigger: PropTypes.string,
  onClick: PropTypes.func,
  onClear: PropTypes.func,
  onMultiChange: PropTypes.func,
};

Selected.defaultProps = {
  disabled: false,
  allowClear: false,
  open: false,
  dataSource: [],
  placeholder: '',
  showArrow: true,
  showSelectStyle: true,
  showDesc: false,
  trigger: 'click',
  onClick: noop,
  onClear: noop,
  onMultiChange: noop,
};
