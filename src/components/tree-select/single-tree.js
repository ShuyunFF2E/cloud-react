import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import jeasy from 'jeasy';
import Icon from '../icon';

import './index.less';
import { selector, getOpenKeys } from './const';

const OptionsSearch = ({ searchValue, onOptionsSearch, clearSearch }) => {
  return (
      <div className={`${selector}-search`}>
          <input
              value={searchValue}
              onChange={onOptionsSearch}
              className={`${selector}-search-input`} />
          <Icon
              type="close-circle-solid"
              className={classnames(`${selector}-search-icon`, {
                  show: searchValue
              })}
              onClick={clearSearch} />
      </div>
  )
}

const OptionsEmpty = ({ emptyRender, ...props }) => {
    return <div className={`${selector}-empty-options`} {...props}> { emptyRender } </div>;
}

class SingleTree extends React.Component {

	constructor(props) {
		super(props);

		const { dataSource, value } = props;
		this.state = {
			searchValue: '',
			openKeys: getOpenKeys(value, dataSource),
			dataSource,
			selected: value,
			prevProps: props
		}
	}

	static getDerivedStateFromProps(props, prevState) {
		const { prevProps } = prevState;
		const { value, dataSource } = props;
		const { value: prevValue, dataSource: prevData } = prevProps;
		if (value !== prevValue || !jeasy.equal(dataSource, prevData)) {
			return {
				value,
				prevValue: value,
				openKeys: getOpenKeys(value, dataSource),
				prevProps: props
			}
		}
		return null;
	}

	onOptionsSearch = e => {
		const { value } = e.target;
		this.setState({
			searchValue: value
		})
		this.props.onSearch(value);
		this.onFilterDataSource(value);
	}

	clearSearch = () => {
		this.setState({
			searchValue: ''
		});
		this.onFilterDataSource('');
	}

	onFilterDataSource = searchText => {
		const dataSource = jeasy.clone(this.props.dataSource);
		const openKeys = [];
		const search = node => {
			return node.filter(item => {
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
		};
		this.setState({ dataSource: search(dataSource), openKeys });
	}

	onClickOption = data => {		
		if (data.children) {
			const { openKeys } = this.state;
			if (openKeys.includes(data.value)) {
				const index = openKeys.indexOf(data.value);
				openKeys.splice(index, 1);
				this.setState({ openKeys });
			} else {
				this.setState({
					openKeys: [...openKeys, data.value]
				})
			}
		} else {
			this.props.onChange(data);
		}
	}

	renderChildren(dataSource, parentNode = {}) {
		const { openKeys, selected } = this.state;
		return dataSource.map(v => {
			const classNames = classnames(`${selector}-option`, {
				[`${selector}-option-show`]: v.children || openKeys.includes(parentNode.value),
				[`${selector}-option-child`]: parentNode.children && parentNode.children.length,
				selected: v.value === selected.value
			});
			const isOpen = openKeys.includes(v.value);
			const iconClassNames = classnames(`${selector}-icon`, {
				open: isOpen,
				close: !isOpen
			});
			return (
				<div key={v.value} className={`${selector}-option-list`}>
					<div className={classNames} onClick={this.onClickOption.bind(this, v)}>
						{ v.label }
						{
							v.children && v.children.length ?
							<Icon type="right" className={iconClassNames} /> : null
						}
					</div>
					{
						v.children && v.children.length ?
						this.renderChildren(v.children, v) : null
					}
				</div>
			);
		});
	}

	render() {
		const { props, state, clearSearch, onOptionsSearch } = this;
		const { searchable, className, emptyRender } = props;
		const { dataSource, searchValue } = state;
		const classNames = classnames(`${selector}-options`, className, `${selector}-single-options`);
		return (
			<div className={classNames}>
				{
					searchable &&
					<OptionsSearch
						searchValue={searchValue}
						onOptionsSearch={onOptionsSearch}
						clearSearch={clearSearch} />
				}
				{ this.renderChildren(dataSource) }
				{
					!dataSource.length && <OptionsEmpty emptyRender={emptyRender} />
				}
			</div>
		)
	}
}

SingleTree.propTypes = {
	dataSource: PropTypes.array,
	searchable: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]),
	className: PropTypes.string,
	onChange: PropTypes.func,
	onSearch: PropTypes.func
}

SingleTree.defaultProps = {
	dataSource: [],
	searchable: false,
	value: {},
	className: '',
	onChange: () => {},
	onSearch: () => {}
}

export default SingleTree;
