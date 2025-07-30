/* eslint-disable no-nested-ternary */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop } from '@utils';

import Icon from '../../icon';
import { selector } from './common';

import SingleSearch from './search/single-search';
import MultiSearch from './search/multi-search';
import MultiCommaSearch from './search/multi-comma-search.js';

import '../index.less';

export default class Selected extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();

    this.state = {
      selectedList: props.selectedList || [],
      clear: false,
      prevProps: this.props,
      searchValue: '',
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { prevProps } = prevState;
    if (props.selectedList !== prevProps.selectedList) {
      return {
        selectedList: props.selectedList || [],
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
        disabled,
        placeholder,
        open,
        showArrow,
        showSelectStyle,
        onClear,
        size,
        supportUnlimited,
        searchable,
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
        optionRender,
        selectAllText,
        borderRadiusSize,
        scrollSelected,
        selectInfoKey,
      },
      state: { selectedList, clear },
      onMouseEnter,
      onMouseLeave,
    } = this;
    const classNames = classnames(`${selector}-wrapper`, {
      disabled,
      empty: supportUnlimited ? false : !selectedList.length,
      hidden: !showSelectStyle,
      'single-search-in-box': !multiple,
      'multi-search-in-box': multiple && showTag,
      'comma-search-in-box': multiple && !showTag,
      [`${size}`]: true,
      [`border-radius-${borderRadiusSize}`]: true,
    });
    const iconClasses = classnames(`${selector}-select-icon`, {
      open,
      close: !open,
      hidden: clear && selectedList.length || isSearch,
    });
    const clearClasses = classnames(
      `${selector}-select-icon ${selector}-clear-icon`,
      {
        show: clear && selectedList.length,
      },
    );
    const searchClasses = classnames(
      `${selector}-search-icon`,
      {
        show: isSearch && (!clear || !selectedList.length),
      },
    );

    let SearchCom = null;
    if (!multiple) {
      SearchCom = SingleSearch;
    }
    if (multiple) {
      SearchCom = showTag ? MultiSearch : MultiCommaSearch;
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
        <SearchCom
          placeholder={placeholder}
          selectedList={selectedList}
          dataSource={this.props.dataSource}
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
          searchable={searchable}
          optionRender={optionRender}
          selectAllText={selectAllText}
          scrollSelected={scrollSelected}
          selectInfoKey={selectInfoKey}
        />
        <Icon type="close-fill-1" className={clearClasses} onClick={onClear} />
        <Icon type="search" className={searchClasses} />
        {showArrow && <Icon type="down" className={iconClasses} />}
      </div>
    );
  }
}

Selected.propTypes = {
  optionRender: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  allowClear: PropTypes.bool,
  open: PropTypes.bool,
  selectedList: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
  dataSource: PropTypes.array,
  placeholder: PropTypes.string,
  showArrow: PropTypes.bool,
  showSelectStyle: PropTypes.bool,
  trigger: PropTypes.string,
  onClick: PropTypes.func,
  onClear: PropTypes.func,
  onMultiChange: PropTypes.func,
};

Selected.defaultProps = {
  disabled: false,
  allowClear: false,
  open: false,
  selectedList: [],
  dataSource: [],
  placeholder: '',
  showArrow: true,
  showSelectStyle: true,
  trigger: 'click',
  onClick: noop,
  onClear: noop,
  onMultiChange: noop,
};
