import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ShuyunUtils from 'shuyun-utils';
import { noop } from '@utils';
import Icon from '../../icon';
import Input from '../../input';

import '../index.less';
import { selector, getOpenKeys, getChildValues } from '../const';

const OptionsSearch = ({ searchValue, onOptionsSearch, clearSearch, placeholder }) => (
  <div className={`${selector}-search`}>
    <Input value={searchValue} onChange={onOptionsSearch} placeholder={placeholder} className={`${selector}-search-input`} />
    <Icon
      type="close-circle-solid"
      className={classnames(`${selector}-search-icon`, {
        show: searchValue,
      })}
      onClick={clearSearch}
    />
  </div>
);

const OptionsEmpty = ({ emptyRender, ...props }) => (
  <div className={`${selector}-empty-options`} {...props}>
    {' '}
    {emptyRender}
    {' '}
  </div>
);

class SingleTree extends React.Component {
  constructor(props) {
    super(props);

    const { dataSource, value, isUnfold } = props;
    this.state = {
      searchValue: '',
      openKeys: getOpenKeys(value, dataSource, isUnfold),
      dataSource,
      selected: value,
      prevProps: props,
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { prevProps } = prevState;
    const { value, dataSource, isUnfold } = props;
    const { value: prevValue, dataSource: prevData } = prevProps;
    if (value !== prevValue || !ShuyunUtils.equal(dataSource, prevData)) {
      return {
        value,
        prevValue: value,
        openKeys: getOpenKeys(value, dataSource, isUnfold),
        prevProps: props,
      };
    }
    return null;
  }

  onOptionsSearch = e => {
	  const { value } = e.target;
	  this.setState({
	    searchValue: value,
	  });
	  this.props.onSearch(value);
	  this.onFilterDataSource(value);
  };

  clearSearch = () => {
	  this.setState({
	    searchValue: '',
	  });
	  this.props.onSearch('');
	  this.onFilterDataSource('');
  };

  onFilterDataSource = searchText => {
	  const dataSource = ShuyunUtils.clone(this.props.dataSource);
	  const openKeys = [];
	  const search = node => node.filter(item => {
	    if (item.label.indexOf(searchText) !== -1) {
	      return item;
	    }
	    if (item.children && item.children.length) {
	      const tmp = item;
	      tmp.children = search(tmp.children);
	      openKeys.push(item.value);
	      return item.children.length > 0;
	    }
	    return (!item.children || !item.children.length) && item.label.indexOf(String(searchText)) !== -1;
	  });
	  this.setState({ dataSource: search(dataSource), openKeys });
  };

  onClickOption = data => {
	  if (data.children && data.children.length) {
	    const { openKeys } = this.state;
	    if (openKeys.includes(data.value)) {
	      const values = getChildValues(data);
	      values.forEach(value => {
	        const index = openKeys.indexOf(value);
	        if (index > -1) {
	          openKeys.splice(index, 1);
	        }
	      });
	      this.setState({ openKeys });
	    } else {
	      this.setState({
	        openKeys: [...openKeys, data.value],
	      });
	    }
	  } else {
	    this.props.onChange(data);
	  }
  };

  getLabel = (label, searchText) => {
	  if (!searchText) {
	    return label;
	  }
	  const regx = new RegExp(searchText, 'g');
	  return label.replace(regx, `<span class="search-text">${searchText}</span>`);
  };

  renderChildren(dataSource) {
	  const child = ({ node, parentNode = {}, isRoot = false }) => {
	    const { openKeys, selected, searchValue } = this.state;
	    const isShow = isRoot || openKeys.includes(parentNode.value);
	    const classNames = classnames(`${selector}-option`, {
	      [`${selector}-option-show`]: isShow,
	      [`${selector}-option-child`]: parentNode.children && parentNode.children.length,
	      selected: node.value === selected.value,
	    });
	    const isOpen = openKeys.includes(node.value);
	    const iconClassNames = classnames(`${selector}-icon`, {
	      open: isOpen,
	      close: !isOpen,
	    });
	    const label = this.getLabel(node.label, searchValue);
	    return (
        <div key={node.value} className={`${selector}-option-list`}>
          <div className={classNames} style={{ paddingLeft: node.level * 20 }} onClick={this.onClickOption.bind(this, node)}>
            <span dangerouslySetInnerHTML={{ __html: label }} title={node.label} />
            {node.children && node.children.length ? <Icon type="right" className={iconClassNames} /> : null}
	        </div>
          {node.children && node.children.length ? node.children.map(cNode => child({ node: cNode, parentNode: node })) : null}
	      </div>
	    );
	  };
	  return dataSource.map(node => child({ node, isRoot: true }));
  }

  render() {
	  const { props, state, clearSearch, onOptionsSearch } = this;
	  const { searchable, searchPlaceholder, dropdownClassName, dropdownStyle, emptyRender } = props;
	  const { dataSource, searchValue } = state;
	  const classNames = classnames(`${selector}-options`, dropdownClassName, `${selector}-single-options`);
	  return (
      <div className={classNames} style={dropdownStyle}>
        {searchable && (
	        <OptionsSearch searchValue={searchValue} onOptionsSearch={onOptionsSearch} placeholder={searchPlaceholder} clearSearch={clearSearch} />
	      )}
        {this.renderChildren(dataSource)}
        {!dataSource.length && <OptionsEmpty emptyRender={emptyRender} />}
	    </div>
	  );
  }
}

SingleTree.propTypes = {
  dataSource: PropTypes.array,
  searchable: PropTypes.bool,
  isUnfold: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dropdownClassName: PropTypes.string,
  dropdownStyle: PropTypes.object,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

SingleTree.defaultProps = {
  dataSource: [],
  searchable: false,
  isUnfold: false,
  searchPlaceholder: '',
  value: {},
  dropdownClassName: '',
  dropdownStyle: {},
  onChange: noop,
  onSearch: noop,
};

export default SingleTree;
