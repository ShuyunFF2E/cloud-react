/* eslint-disable */
import React, { Component, createRef } from 'react';
import RcTable from 'rc-table';
import classnames from 'classnames';
import ReactDragListView from 'react-drag-listview';
import { noop } from '@utils';
import 'react-resizable/css/styles.css';
import {
  getDataSource,
  getDataSourceWithDelay,
  isSomeChecked,
  isEveryChecked,
  traverseTree,
  getLeafNodes,
  getConfig,
  isFirefox,
} from './util';
import { DRAG_ICON_SELECTOR, DRAG_SELECTOR, tablePrefixCls } from './constant';
import getExpandableConfig from './js/expend';
import ResizableTitle from './js/resizableTitle';
import Pagination from '../pagination';
import Icon from '../icon';
import Loading from '../loading';
import emptyImg from './empty.png';
import './css/basic.less';
import './css/business.less';
import Column from './js/column';
import { defaultProps, propTypes } from './js/propType';

class CTable extends Component {
  ref = createRef();

  tableRef = createRef();

  defaultPageOpts = {
    pageNum: 1,
    pageSize: 10,
    showQuickJumper: true,
    showPageSizeOptions: true,
    pageSizeOptions: [10, 20, 50, 100],
  };

  state = {
    data: [],
    columnData: this.props.columnData.map((item) => ({ ...item, show: true })),
    originColumnData:
      (this.props.supportMemory && getConfig(this.props.tableId)) ||
      this.props.columnData.map((item) => ({
        ...item,
        show: true,
      })),
    footerHeight: 0,
    expandIconColumnIndex: this.props.expandIconColumnIndex,
    pageOpts: { ...this.defaultPageOpts, ...this.props.pageOpts },
    selectedNodeList: this.props.checkedData,
    isLoading: false,
    filterValue: [],
  };

  leafNodesMap = {};

  getDataSource = this.props.isDelay ? getDataSourceWithDelay : getDataSource;

  constructor(props) {
    super(props);
    this.column = new Column(this);
  }

  componentDidMount() {
    if (
      (this.props.supportExpend || this.props.supportTree) &&
      !this.props.rowKey
    ) {
      console.warn('使用展开行功能或者树状表格功能请指定 rowKey');
    }
    if (this.props.supportMemory && !this.props.tableId) {
      console.warn('请设置 tableId');
    }
    this.props.onLoadGridBefore(this.state.pageOpts);
    this.loadData((res) => {
      this.init();
      this.props.onLoadGridAfter(res);
    });
  }

  componentDidUpdate(prevProps) {
    if (
      typeof prevProps.ajaxData === 'object' &&
      (this.props.ajaxData !== prevProps.ajaxData ||
        this.props.columnData !== prevProps.columnData)
    ) {
      this.loadData();
    }
    if (this.props.checkedData !== prevProps.checkedData) {
      this.init();
    }
    if (this.props.isDelay !== prevProps.isDelay) {
      this.getDataSource = this.props.isDelay
        ? getDataSourceWithDelay
        : getDataSource;
    }
  }

  /**
   * 加载表格数据
   * @param callback
   */
  loadData = (callback = () => {}) => {
    const { pageOpts, filterValue } = this.state;
    const {
      ajaxData,
      pageOpts: propsPageOpts,
      totalsKey,
      dataKey,
      childrenKey,
    } = this.props;
    this.setState({ isLoading: true }, async () => {
      const res = await this.getDataSource(ajaxData, {
        ...pageOpts,
        filterValue,
      });
      if (childrenKey !== 'children') {
        traverseTree(
          res[dataKey],
          (node) => {
            Object.assign(node, { children: node[childrenKey] || [] });
          },
          childrenKey,
        );
      }

      this.setState(
        {
          data: res[dataKey],
          pageOpts: { ...pageOpts, ...propsPageOpts, totals: res[totalsKey] },
          isLoading: false,
        },
        () => {
          callback(res);
        },
      );
    });
  };

  /**
   * 初始化已选数据、高度等
   */
  init = () => {
    this.leafNodesMap = this.getLeafNodesMap(this.state.data);
    this.setCheckedData();
    this.updateSelectedNodes();

    this.column.setColumnData();

    this.setHeaderStyle();
    this.setFixedStyle();
    this.setFooterHeight();
  };

  /**
   * 解决表头滚动问题（rcTable bug）
   */
  setHeaderStyle = () => {
    if (isFirefox() || !this.props.useCustomScroll) {
      return;
    }
    setTimeout(() => {
      if (this.ref.current) {
        const bodyEle = this.ref.current.querySelector('.cloud-table-body');
        if (bodyEle) {
          bodyEle.style.paddingRight = 0;
          bodyEle.parentElement.querySelector(
            '.cloud-table-header colgroup col:last-child',
          ).style.width = 0;
        }
      }
    }, 200);
  };

  /**
   * 手动计算 右侧固定列 表头的样式（由于自定义滚动条占据宽度导致，rcTable 并不兼容这种情况）
   */
  setFixedStyle = () => {
    setTimeout(() => {
      if (isFirefox() || !this.props.useCustomScroll) {
        return;
      }
      const fixedColumn = this.state.columnData
        .filter((item) => item.fixed === 'right')
        .reverse();
      if (!fixedColumn.length) {
        return;
      }
      const fixedEles = Array.from(
        this.ref.current.querySelectorAll('th.cloud-table-cell-fix-right'),
      );
      if (fixedEles.length) {
        fixedEles.pop();
        fixedEles.reverse().forEach((ele, index) => {
          if (index === 0) {
            Object.assign(ele.style, { right: 0 });
          } else {
            const right = fixedColumn.slice(0, index).reduce((sum, item) => {
              // eslint-disable-next-line no-param-reassign
              sum += item.width;
              return sum;
            }, 0);
            Object.assign(ele.style, {
              right: `${right}px`,
            });
          }
        });
      }
    }, 200);
  };

  /**
   * 表格翻页后，滚动到顶部
   */
  scrollIntoView = () => {
    if (this.props.scrollIntoTop) {
      const trEle = this.ref.current?.querySelector(
        'tr.cloud-table-row:nth-child(2)',
      );
      if (trEle) {
        trEle.scrollIntoView({
          inline: 'nearest',
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  };

  /**
   * 获取 leafNodesMap 的 key 值（如果是 tree，需要指定 rowKey）
   * @param node
   * @returns {string|*}
   */
  getKeyFieldVal = (node) => {
    if (node) {
      const { checked, disabled, ...props } = node;
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
    if (row.disabled) {
      return true;
    }
    if (!this.props.disabledData.length) {
      return false;
    }

    // disabledData 是整个行对象的数组
    if (typeof this.props.disabledData[0] === 'object') {
      return !!this.props.disabledData.find(
        (node) => this.getKeyFieldVal(node) === key,
      );
    }

    // disabledData 是 rowKey 数组
    return !!this.props.disabledData.includes(key);
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
   * 设置 footer 高度
   */
  setFooterHeight = () => {
    if (this.ref.current && this.ref.current.querySelector) {
      const footerEle = this.ref.current.querySelector(
        `.${tablePrefixCls}-footer`,
      );
      if (footerEle) {
        this.setState({
          footerHeight: footerEle.offsetHeight,
        });
      }
    }
  };

  /**
   * 更新已选数据列表
   * @param onCheckedAfter
   */
  updateSelectedNodes = (onCheckedAfter = () => {}) => {
    const selectedNodeList = [];
    const { leafNodesMap } = this;
    Object.keys(leafNodesMap).forEach((key) => {
      if (typeof leafNodesMap[key] === 'object') {
        const parentKey = this.getKeyFieldVal(leafNodesMap[key].parentNode);
        // 如果节点的所有子节点选中 并且 节点的父节点的所有子节点没有全部选中
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
    this.setState({ selectedNodeList }, onCheckedAfter);
  };

  /**
   * 已选数据回显
   */
  setCheckedData = () => {
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
    const leafNodeKeys = Object.keys(this.leafNodesMap);
    leafNodeKeys.forEach((key) => {
      const isCheckedNode = !!this.props.checkedData.find(
        (node) => String(this.getKeyFieldVal(node)) === String(key),
      );
      // 不是已选节点 && （没有子节点被选中 或者 全部子节点都被选中）
      if (
        !isCheckedNode &&
        (!isSomeChecked(this.leafNodesMap[key].childNodes) ||
          isEveryChecked(this.leafNodesMap[key].childNodes))
      ) {
        if (typeof this.leafNodesMap[key] === 'object') {
          this.leafNodesMap[key].childNodes.forEach((node) => {
            Object.assign(node, { checked: false });
          });
        } else {
          delete this.leafNodesMap[key];
        }
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
    this.props.onLoadGridBefore({ pageNum, pageSize });
    this.setState({ isLoading: true }, async () => {
      const { pageOpts, filterValue } = this.state;
      const _pageOpts = {
        ...pageOpts,
        pageNum: pageNum || pageOpts.pageNum,
        pageSize: pageSize || pageOpts.pageSize,
      };
      const params = {
        ..._pageOpts,
        sortParams: { ...sortParams, sortBy: sortParams.sortBy || 'DESC' },
        filterValue,
      };

      const { ajaxData, dataKey, childrenKey } = this.props;
      const res = await this.getDataSource(ajaxData, params);
      if (childrenKey !== 'children') {
        traverseTree(res[dataKey], (node) => {
          Object.assign(node, { children: node[childrenKey] || [] });
        });
      }
      let resolvedData = res[dataKey];

      if (sortParams.sortable && sortParams.sorter) {
        resolvedData = resolvedData
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
          pageOpts: { ..._pageOpts, totals: res[this.props.totalsKey] },
          data: resolvedData,
          isLoading: false,
        },
        async () => {
          this.column.setCheckboxColumn();
          await onRefreshAfter();
          this.setHeaderStyle();
          this.setFixedStyle();
          this.scrollIntoView();
          this.props.onLoadGridAfter(res);
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
    const { pageOpts } = this.props;
    if (pageOpts && pageOpts.onChange) {
      pageOpts.onChange({ pageNum, pageSize });
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
   * 外部调用此函数，手动刷新表格
   * @param gotoFirstPage：表格刷新后，是否跳转到第一页
   * @param params
   */
  refreshTable = (gotoFirstPage = true, params = {}) => {
    this.loadGrid({ ...params, pageNum: gotoFirstPage ? 1 : params.pageNum });
  };

  /**
   * 拖拽回调
   * @param fromIndex
   * @param toIndex
   */
  onDragEnd = (fromIndex, toIndex) => {
    if (!this.props.supportDrag) {
      return;
    }
    const { data } = this.state;
    const dataCopy = [...data];
    const item = dataCopy.splice(fromIndex, 1)[0];
    dataCopy.splice(toIndex, 0, item);
    this.setState(
      {
        data: dataCopy,
      },
      () => {
        this.props.onDragAfter(data[fromIndex], data[toIndex]);
      },
    );
  };

  /**
   * 表格数据为空模板
   * @returns {*}
   */
  emptyTpl = () => {
    if (this.props.emptyTpl()) {
      return this.props.emptyTpl();
    }
    return (
      <div
        className={`${tablePrefixCls}-no-data`}
        style={this.props.emptyStyle}
      >
        <img src={emptyImg} height={90} alt="暂无数据" />
        <p style={{ marginTop: 4 }}>暂无数据</p>
      </div>
    );
  };

  renderTable() {
    const {
      ref,
      tableRef,
      leafNodesMap,
      onPageChange,
      onRefresh,
      getKeyFieldVal,
      emptyTpl,
    } = this;
    const {
      style,
      bordered,
      headerBordered,
      size,
      supportPage,
      footerTpl,
      supportCheckbox,
      supportRadio,
      rowKey,
      showTotal,
      showRefresh,
      lightCheckedRow,
      rowClassName,
      className,
      onRow,
      supportResizeColumn,
      maxHeight,
      useCustomScroll,
      isExpendAloneColumn,
      supportExpend,
      supportTree,
      supportGroup,
      summaryData,
      supportDrag,
      showDragIcon,
      supportFullColumn,
      loadingTpl,
      loadingOpts,
    } = this.props;
    const {
      data,
      columnData,
      expandIconColumnIndex,
      footerHeight,
      pageOpts,
      selectedNodeList,
      isLoading,
    } = this.state;
    const { pageNum, pageSize, totals } = pageOpts;
    const fixed = !!(
      columnData.find((item) => item.fixed) ||
      style.height ||
      supportResizeColumn ||
      maxHeight
    );

    return (
      <div className={`${tablePrefixCls}-container`} style={style} ref={ref}>
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
              [`${tablePrefixCls}-use-custom-scroll`]:
                useCustomScroll && !isFirefox(),
              [`${tablePrefixCls}-two-level-tree`]: isExpendAloneColumn, // 两级树
              [`${tablePrefixCls}-support-tree`]:
                supportTree && !isExpendAloneColumn, // 多级树
              [`${tablePrefixCls}-expand-details`]:
                supportExpend && !supportTree, // 行展开
              [`${tablePrefixCls}-support-group`]: supportGroup, // 表格分组
              [`${tablePrefixCls}-support-summary`]:
                summaryData && summaryData.length, // 表尾合计
              [`${tablePrefixCls}-support-drag`]: supportDrag && !showDragIcon, // 拖拽行
              [`${tablePrefixCls}-support-resize`]: supportResizeColumn, // 表格列拉伸
              [`${tablePrefixCls}-full-column`]: supportFullColumn, // 表格通栏
            },
            className,
          )}
          style={{ height: `calc(100% - ${footerHeight}px)` }}
        >
          <RcTable
            ref={tableRef}
            prefixCls={tablePrefixCls}
            columns={columnData}
            data={data}
            expandIconColumnIndex={expandIconColumnIndex}
            scroll={fixed ? { x: '100%', y: maxHeight || '100%' } : {}}
            expandable={getExpandableConfig({ ...this.props })}
            emptyText={emptyTpl()}
            rowKey={rowKey}
            rowClassName={(row) => {
              const rowKeyVal = getKeyFieldVal(row);
              const targetNode = leafNodesMap[rowKeyVal] || {};
              const classNames = [];

              if (this.isRowDisabled(row)) {
                classNames.push(`${tablePrefixCls}-row-disabled`);
              }
              if (lightCheckedRow && isEveryChecked(targetNode.childNodes)) {
                classNames.push(`${tablePrefixCls}-row-select`);
              }
              return `${classNames.join(' ')} ${rowClassName(row)}`;
            }}
            onRow={onRow}
            components={
              supportResizeColumn
                ? {
                    header: {
                      cell: ResizableTitle,
                    },
                  }
                : undefined
            }
            summary={
              summaryData && summaryData.length
                ? () => (
                    <RcTable.Summary fixed>
                      <RcTable.Summary.Row>
                        {summaryData.map((item) => (
                          <RcTable.Summary.Cell {...item}>
                            {item.content || null}
                          </RcTable.Summary.Cell>
                        ))}
                      </RcTable.Summary.Row>
                    </RcTable.Summary>
                  )
                : undefined
            }
          />
          {loadingTpl(isLoading) || (
            <Loading
              className={`${tablePrefixCls}-loading-layer`}
              loading={isLoading}
              {...loadingOpts}
            />
          )}
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
                disabled={isLoading}
                onChange={onPageChange}
              />
            </div>
          </div>
        )}
        {footerTpl()}
      </div>
    );
  }

  render() {
    const { dragSelector, showDragIcon, supportDrag } = this.props;
    if (supportDrag) {
      return (
        <ReactDragListView
          lineClassName={`${tablePrefixCls}-drag-line`}
          onDragEnd={this.onDragEnd}
          handleSelector={
            dragSelector || (showDragIcon ? DRAG_ICON_SELECTOR : DRAG_SELECTOR)
          }
        >
          {this.renderTable()}
        </ReactDragListView>
      );
    }
    return this.renderTable();
  }
}

export default CTable;

CTable.propTypes = propTypes;
CTable.defaultProps = defaultProps;
