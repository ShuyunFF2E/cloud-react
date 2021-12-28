/* eslint-disable react/no-unused-prop-types */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import RcTable from 'rc-table';
import classnames from 'classnames';
import { noop } from '@utils';
import {
  getDataSource,
  isSomeChecked,
  isEveryChecked,
  traverseTree,
  getLeafNodes,
} from './util';
import { tablePrefixCls } from './constant';
import getExpandableConfig from './expend';
import Checkbox from '../checkbox';
import Pagination from '../pagination';
import Radio from '../radio';
import Icon from '../icon';
import Loading from '../loading';
import './index.less';

class CTable extends Component {
  ref = createRef();

  defaultPageOpts = {
    pageNum: 1,
    pageSize: 10,
    showQuickJumper: true,
    showPageSizeOptions: true,
    pageSizeOptions: [10, 20, 50, 100],
    isAppendToBody: true,
  };

  state = {
    data: [],
    columnData: this.props.columnData,
    headerHeight: 0,
    expandIconColumnIndex: 0,
    pageOpts: { ...this.defaultPageOpts, ...this.props.pageOpts },
    selectedNodeList: this.props.checkedData,
    isLoading: false,
  };

  leafNodesMap = {};

  componentDidMount() {
    if (
      (this.props.supportExpend || this.props.supportTree) &&
      !this.props.rowKey
    ) {
      console.warn('使用展开行功能或者树状表格功能请指定 rowKey');
    }
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (
      (typeof prevProps.ajaxData === 'object' &&
        (this.props.ajaxData !== prevProps.ajaxData ||
          this.props.columnData !== prevProps.columnData)) ||
      this.props.queryParams !== prevProps.queryParams ||
      this.props.checkedData !== prevProps.checkedData
    ) {
      this.init();
    }
  }

  init = async () => {
    const { pageOpts } = this.state;
    const { ajaxData, pageOpts: propsPageOpts, queryParams } = this.props;
    const { totals, data } = await getDataSource(ajaxData, {
      ...pageOpts,
      queryParams,
    });

    this.setState({
      data,
      pageOpts: { ...pageOpts, ...propsPageOpts, totals },
    });

    this.leafNodesMap = this.getLeafNodesMap(data);
    this.setCheckedData();
    this.updateSelectedNodes();

    this.setColumnData(this.setCheckboxColumn);
    this.setHeaderHeight();
  };

  /**
   * 获取 leafNodesMap 的 key 值（如果是 tree，需要指定 rowKey）
   * @param node
   * @returns {string|*}
   */
  getKeyFieldVal = (node) => {
    if (node) {
      const { checked, ...props } = node;
      return node[this.props.rowKey] || JSON.stringify(props);
    }
    return null;
  };

  /**
   * 判断数据是否在当前页
   * @param targetVal
   * @returns {*}
   */
  isInCurrentPage = (targetVal) => {
    let isInCurrentPage = false;
    traverseTree(this.state.data, (node) => {
      if (String(this.getKeyFieldVal(node)) === String(targetVal)) {
        isInCurrentPage = true;
      }
    });
    return isInCurrentPage;
  };

  /**
   * 当前行是否被禁用
   * @param row
   * @returns {boolean}
   */
  isRowDisabled = (row) => {
    const key = this.getKeyFieldVal(row);
    return row.disabled || this.props.disabledData.includes(key);
  };

  /**
   * 获取节点和叶子节点的映射关系
   * @param tree
   * @returns {{}}
   */
  getLeafNodesMap = (tree) => {
    const LeafNodesMap = {};
    traverseTree(tree, (node, parentNode) => {
      LeafNodesMap[this.getKeyFieldVal(node)] = {
        parentNode, // 父节点
        node, // 当前节点
        childNodes: getLeafNodes(node), // 所有叶子节点
      };
    });
    return LeafNodesMap;
  };

  /**
   * 多选列模板
   * @param isFirstColumnFixed
   * @returns {{dataIndex: string, width: number, fixed, title: JSX.Element, render: (function(*, *=)), key: string}}
   */
  getCheckboxColumn = (isFirstColumnFixed) => {
    const { leafNodesMap, onAllCheckedChange, onNodeCheckedChange } = this;

    const currentLeafNodes = Object.keys(leafNodesMap).reduce(
      (nodeList, key) => {
        if (this.isInCurrentPage(key)) {
          nodeList.push(...leafNodesMap[key].childNodes);
        }
        return nodeList;
      },
      [],
    );
    const isCheckedAll = !!isEveryChecked(
      currentLeafNodes.filter((node) => !this.isRowDisabled(node)),
    );
    const isIndeterminateAll = !isCheckedAll && isSomeChecked(currentLeafNodes);

    return {
      title: (
        <Checkbox
          checked={isCheckedAll}
          indeterminate={isIndeterminateAll}
          onChange={(checked) => onAllCheckedChange(checked)}
        />
      ),
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 40,
      fixed: isFirstColumnFixed,
      render: (value, row) => {
        const targetNode = leafNodesMap[this.getKeyFieldVal(row)] || {};
        const isChecked = !!isEveryChecked(targetNode.childNodes);
        const isIndeterminate =
          !isChecked && isSomeChecked((targetNode || {}).childNodes);
        const isDisabled = this.isRowDisabled(row);
        return (
          <Checkbox
            checked={isChecked}
            indeterminate={isIndeterminate}
            disabled={isDisabled}
            onChange={(checked) => onNodeCheckedChange(checked, row)}
          />
        );
      },
    };
  };

  /**
   * 单选列模板
   * @param isFirstColumnFixed
   * @returns {{dataIndex: string, width: number, fixed, title: string, render: (function(*, *=)), key: string}}
   */
  getRadioColumn = (isFirstColumnFixed) => {
    const { leafNodesMap, onNodeRadioChange } = this;
    return {
      title: '',
      dataIndex: 'radio',
      key: 'radio',
      width: 40,
      fixed: isFirstColumnFixed,
      render: (value, row) => {
        const radioVal = this.getKeyFieldVal(row);
        const targetNode = leafNodesMap[radioVal] || {};
        const isDisabled = this.isRowDisabled(row);
        return (
          <Radio
            disabled={isDisabled}
            value={radioVal}
            checked={!!isEveryChecked(targetNode.childNodes)}
            onChange={() => onNodeRadioChange(row)}
          />
        );
      },
    };
  };

  /**
   * 设置表格列
   * @param callback
   */
  setColumnData = (callback) => {
    const { columnData } = this.state;
    this.setState(
      {
        columnData: columnData.map((item) => {
          const sortBy = item.sortable ? item.sortBy : '';
          const resolveColumnItem = {
            ...item,
            title: item.sortable ? (
              <span className="title-container">
                {item.title}
                <span
                  className={`sort-icon-container ${
                    item.align === 'right' && 'cell-align-right'
                  } ${sortBy && `sort-${sortBy.toLowerCase()}`}`}
                  onClick={() => this.onSort(resolveColumnItem)}
                >
                  <Icon className="sort-up-icon" type="up-solid" />
                  <Icon className="sort-down-icon" type="down-solid" />
                </span>
              </span>
            ) : (
              item.title
            ),
            sortBy,
            align: item.align || 'left',
            width: item.width || (columnData.find((c) => c.fixed) ? 150 : ''),
          };
          return resolveColumnItem;
        }),
      },
      callback,
    );
  };

  /**
   * 更新 多选/单选 表格列
   */
  setCheckboxColumn = () => {
    const { supportCheckbox, supportRadio } = this.props;
    const { columnData } = this.state;
    const isFirstColumnFixed = columnData[0].fixed;

    if (supportCheckbox) {
      const checkboxColumn = this.getCheckboxColumn(isFirstColumnFixed);
      this.setState({
        expandIconColumnIndex: 1,
        columnData:
          columnData[0].dataIndex === 'checkbox'
            ? [checkboxColumn, ...columnData.slice(1)]
            : [checkboxColumn, ...columnData],
      });
      return;
    }
    if (supportRadio) {
      const radioColumn = this.getRadioColumn(isFirstColumnFixed);
      this.setState({
        expandIconColumnIndex: 1,
        columnData:
          columnData[0].dataIndex === 'radio'
            ? [radioColumn, ...columnData.slice(1)]
            : [radioColumn, ...columnData],
      });
      return;
    }
    this.setState({
      expandIconColumnIndex: 0,
    });
  };

  /**
   * 设置表头高度
   */
  setHeaderHeight = () => {
    if (this.ref.current && this.ref.current.querySelector) {
      const headerEle = this.ref.current.querySelector(
        `.${tablePrefixCls}-thead`,
      );
      this.setState({
        headerHeight: headerEle.offsetHeight,
      });
    }
  };

  /**
   * 更新已选数据列表
   * @param callback
   */
  updateSelectedNodes = (callback = () => {}) => {
    const selectedNodeList = [];
    const { leafNodesMap } = this;
    Object.keys(leafNodesMap).forEach((key) => {
      if (typeof leafNodesMap[key] === 'object') {
        const parentKey = this.getKeyFieldVal(leafNodesMap[key].parentNode);
        // 如果节点的所有子节点选中 并且 节点的父节点的所=所有子节点没有全部选中
        if (
          isEveryChecked(leafNodesMap[key].childNodes) &&
          (!parentKey || !isEveryChecked(leafNodesMap[parentKey].childNodes))
        ) {
          selectedNodeList.push(leafNodesMap[key].node);
        }
      } else {
        // 叶子节点无法获取到的情况（可能已选节点不在当前页）
        const checkedData = this.props.checkedData.find(
          (node) => this.getKeyFieldVal(node) === leafNodesMap[key],
        );
        if (checkedData) {
          selectedNodeList.push(checkedData);
        }
      }
    });
    this.setState({ selectedNodeList }, callback);
  };

  /**
   * 选中当页
   * @param checked
   */
  onAllCheckedChange = (checked) => {
    // 更新叶子节点 leafNodesMap 的选中状态
    Object.keys(this.leafNodesMap).forEach((key) => {
      if (this.isInCurrentPage(key)) {
        this.leafNodesMap[key].childNodes.forEach((node) => {
          if (!this.isRowDisabled(node)) {
            Object.assign(node, { checked });
          }
        });
      }
    });
    this.setCheckboxColumn();
    this.updateSelectedNodes(() => {
      this.props.onCheckedAllAfter(this.state.selectedNodeList);
    });
  };

  /**
   * 选中当前行（多选）
   * @param checked
   * @param row
   */
  onNodeCheckedChange = (checked, row) => {
    // 更新叶子节点 leafNodesMap 的选中状态
    this.leafNodesMap[this.getKeyFieldVal(row)].childNodes.forEach((node) => {
      if (!this.isRowDisabled(node)) {
        Object.assign(node, { checked });
      }
    });
    this.setCheckboxColumn();
    this.updateSelectedNodes(() => {
      this.props.onCheckedAfter(this.state.selectedNodeList);
    });
  };

  /**
   * 选中当前行（单选）
   * @param row
   */
  onNodeRadioChange = (row) => {
    // 更新叶子节点 leafNodesMap 的选中状态
    Object.keys(this.leafNodesMap).forEach((key) => {
      this.leafNodesMap[key].childNodes.forEach((node) => {
        Object.assign(node, {
          checked: this.getKeyFieldVal(node) === this.getKeyFieldVal(row),
        });
      });
    });
    this.setCheckboxColumn();
    this.updateSelectedNodes(() => {
      this.props.onCheckedAfter(this.state.selectedNodeList);
    });
  };

  /**
   * 已选数据回显
   */
  setCheckedData = () => {
    if (!this.props.checkedData.length) {
      return;
    }
    // 更新叶子节点 leafNodesMap 的选中状态
    this.props.checkedData.forEach((cNode) => {
      const cNodeVal = this.getKeyFieldVal(cNode);
      if (this.leafNodesMap[cNodeVal]) {
        this.leafNodesMap[cNodeVal].childNodes.forEach((node) => {
          Object.assign(node, { checked: true });
        });
      } else {
        // 叶子节点无法获取到的情况（可能已选节点不在当前页），直接赋值，这种情况 this.leafNodesMap[cNodeVal] 不是 object
        this.leafNodesMap[cNodeVal] = cNodeVal;
      }
    });
  };

  /**
   * 加载表格
   * @param pageNum
   * @param pageSize
   * @param sortParams
   * @param onRefreshAfter
   * @returns {Promise<void>}
   */
  loadGrid = async (
    { pageNum, pageSize, sortParams = {} } = {},
    onRefreshAfter = noop,
  ) => {
    this.setState({ isLoading: true }, async () => {
      const { pageOpts } = this.state;
      const { queryParams } = this.props;
      const _pageOpts = {
        ...pageOpts,
        pageNum: pageNum || pageOpts.pageNum,
        pageSize: pageSize || pageOpts.pageSize,
      };
      const params = {
        ..._pageOpts,
        sortParams: { ...sortParams, sortBy: sortParams.sortBy || 'DESC' },
        queryParams,
      };
      const { totals, data } = await getDataSource(this.props.ajaxData, params);
      let resolvedData = data;
      if (sortParams.sortable && sortParams.sorter) {
        resolvedData = data
          .sort((rowA, rowB) => sortParams.sorter(rowA, rowB, sortParams))
          .concat([]);
      }

      // 更新叶子节点 leafNodesMap 的选中状态
      const currentLeafNodesMap = this.getLeafNodesMap(resolvedData);
      Object.keys(currentLeafNodesMap).forEach((key) => {
        if (this.leafNodesMap[key]) {
          if (typeof this.leafNodesMap[key] !== 'object') {
            currentLeafNodesMap[key].childNodes.forEach((item) => {
              Object.assign(item, { checked: true });
            });
            this.leafNodesMap[key] = currentLeafNodesMap[key];
          }
        } else {
          this.leafNodesMap[key] = currentLeafNodesMap[key];
        }
      });

      this.setState(
        {
          pageOpts: { ..._pageOpts, totals },
          data: resolvedData,
          isLoading: false,
        },
        () => {
          this.setCheckboxColumn();
          onRefreshAfter();
        },
      );
    });
  };

  /**
   * 改变分页
   * @param pageNum
   * @param pageSize
   */
  onPageChange = (pageNum, pageSize) => {
    const { ajaxData } = this.props;
    if (typeof ajaxData === 'object') {
      this.props.pageOpts.onChange({ pageNum, pageSize });
      return;
    }
    this.loadGrid({ pageNum, pageSize });
  };

  /**
   * 刷新表格
   */
  onRefresh = () => {
    this.loadGrid();
  };

  /**
   * 表格排序
   * @param columnItem
   */
  onSort = (columnItem) => {
    this.loadGrid({ sortParams: columnItem }, () => {
      // 更新 columnData 的 sortBy 字段
      const { columnData } = this.state;
      this.setState(
        {
          columnData: columnData.map((item) => {
            if (item.dataIndex === columnItem.dataIndex) {
              return {
                ...item,
                sortBy: item.sortBy === 'ASC' ? 'DESC' : 'ASC',
              };
            }
            return {
              ...item,
              sortBy: '',
            };
          }),
        },
        this.setColumnData,
      );
    });
  };

  render() {
    const { ref, leafNodesMap, onPageChange, onRefresh, getKeyFieldVal } = this;
    const {
      style,
      bordered,
      headerBordered,
      size,
      supportPage,
      footerTpl,
      emptyTpl,
      supportCheckbox,
      supportRadio,
      rowKey,
      showTotal,
      showRefresh,
      lightCheckedRow,
      rowClassName,
      className,
    } = this.props;
    const {
      data,
      columnData,
      expandIconColumnIndex,
      headerHeight,
      pageOpts,
      selectedNodeList,
      isLoading,
    } = this.state;
    const { pageNum, pageSize, totals } = pageOpts;
    const fixed = !!(columnData.find((item) => item.fixed) || style.height);

    return (
      <div>
        <div
          className={classnames(
            `${tablePrefixCls}-box`,
            {
              [`${tablePrefixCls}-${size}`]: true,
              [`${tablePrefixCls}-bordered`]: bordered,
              [`${tablePrefixCls}-header-bordered`]:
                !bordered && headerBordered,
              [`${tablePrefixCls}-loading`]: isLoading,
              [`${tablePrefixCls}-empty`]: !data.length,
            },
            className,
          )}
          style={style}
          ref={ref}
        >
          <RcTable
            prefixCls={tablePrefixCls}
            columns={columnData}
            data={data}
            expandIconColumnIndex={expandIconColumnIndex}
            scroll={
              fixed ? { x: '100%', y: `calc(100% - ${headerHeight}px)` } : {}
            }
            expandable={getExpandableConfig({ ...this.props })}
            emptyText={emptyTpl()}
            rowKey={rowKey}
            rowClassName={(row) => {
              const rowKeyVal = getKeyFieldVal(row);
              const targetNode = leafNodesMap[rowKeyVal] || {};
              if (this.isRowDisabled(row)) {
                return `${tablePrefixCls}-row-disabled ${rowClassName(row)}`;
              }
              if (lightCheckedRow && isEveryChecked(targetNode.childNodes)) {
                return `${tablePrefixCls}-row-select ${rowClassName(row)}`;
              }
              return rowClassName(row);
            }}
          />
          <Loading
            className={`${tablePrefixCls}-loading-layer`}
            loading={isLoading}
          />
        </div>
        {supportPage && (
          <div className={classnames(`${tablePrefixCls}-footer`)}>
            <div className={classnames(`${tablePrefixCls}-footer-statistics`)}>
              {(supportCheckbox || supportRadio) && (
                <span className={classnames(`${tablePrefixCls}-footer-select`)}>
                  已选 {selectedNodeList.length} 条
                </span>
              )}
              {showRefresh && (
                <span
                  className={classnames(`${tablePrefixCls}-footer-refresh`)}
                  onClick={onRefresh}
                >
                  <Icon type="refresh" />
                  刷新
                </span>
              )}
            </div>
            <div className={classnames(`${tablePrefixCls}-footer-page`)}>
              {showTotal && (
                <span className={classnames(`${tablePrefixCls}-footer-total`)}>
                  共 {totals} 条
                </span>
              )}
              <Pagination
                {...pageOpts}
                current={pageNum}
                pageSize={pageSize}
                total={totals}
                onChange={onPageChange}
              />
            </div>
          </div>
        )}
        {footerTpl()}
      </div>
    );
  }
}

export default CTable;

CTable.propTypes = {
  ajaxData: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  columnData: PropTypes.array.isRequired,
  rowKey: PropTypes.string,
  bordered: PropTypes.bool,
  size: PropTypes.oneOf(['default', 'small', 'large']),
  style: PropTypes.object,
  supportExpend: PropTypes.bool,
  onExpand: PropTypes.func,
  expandedRowRender: PropTypes.func,
  expandable: PropTypes.object,
  supportTree: PropTypes.bool,
  supportCheckbox: PropTypes.bool,
  supportPage: PropTypes.bool,
  footerTpl: PropTypes.func,
  pageOpts: PropTypes.object,
  onCheckedAfter: PropTypes.func,
  onCheckedAllAfter: PropTypes.func,
  emptyTpl: PropTypes.any,
  checkedData: PropTypes.array,
  showTotal: PropTypes.bool,
  showRefresh: PropTypes.bool,
  lightCheckedRow: PropTypes.bool,
  rowClassName: PropTypes.func,
  headerBordered: PropTypes.bool,
  className: PropTypes.string,
  supportRadio: PropTypes.bool,
  queryParams: PropTypes.object,
  disabledData: PropTypes.array,
};

CTable.defaultProps = {
  rowKey: 'id',
  bordered: false,
  size: 'default',
  style: {},
  supportExpend: false,
  onExpand: noop,
  expandedRowRender: noop,
  expandable: {},
  supportTree: false,
  supportCheckbox: false,
  supportPage: false,
  footerTpl: () => null,
  pageOpts: {},
  onCheckedAfter: () => {},
  onCheckedAllAfter: () => {},
  emptyTpl: () => '暂无数据',
  checkedData: [],
  showTotal: false,
  showRefresh: true,
  lightCheckedRow: false,
  rowClassName: () => '',
  headerBordered: false,
  className: '',
  supportRadio: false,
  queryParams: {},
  disabledData: [],
};
