import React, { Component } from 'react';
import classNames from 'classnames';
import Input from '../input';
import Icon from '../icon';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      value,
    });
    const { supportImmediatelySearch, onSearchAction } = this.props;
    if (supportImmediatelySearch) {
      onSearchAction(value);
    }
  };

  handleSearch = () => {
    this.props.onSearchAction(this.state.value);
  };

  render() {
    const { supportSearch, searchPlaceholder, searchMaxLength, prefixCls } = this.props;
    return (
      supportSearch && (
        <div className={classNames(`${prefixCls}-search`)}>
          <Input
            hasClear
            suffix={<Icon type="search" onClick={this.handleSearch} style={{ cursor: 'pointer' }} />}
            className={classNames(`${prefixCls}-search-input`)}
            onEnter={this.handleSearch}
            onChange={this.handleChange}
            maxLength={searchMaxLength}
            placeholder={searchPlaceholder}
          />
        </div>
      )
    );
  }
}

export default Search;
