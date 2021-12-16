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

  selectedNodeMap = {};

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
      this.props.ajaxData !== prevProps.ajaxData ||
      this.props.columnData !== prevProps.columnData
    ) {
      this.init();
    }
  }

  init = async () => {
    const { pageOpts } = this.state;
    const { ajaxData } = this.props;
    const { totals, data } = await getDataSource(ajaxData, pageOpts);

    this.setState({ data, pageOpts: { ...pageOpts, totals } });
    this.leafNodesMap = this.getLeafNodesMap(data);

    this.setCheckedData();

    this.setColumnData();
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
   * @param targetKey
   * @returns {*}
   */
  isInCurrentPage = (targetKey) => {
    let isInCurrentPage = false;
    traverseTree(this.state.data, (node) => {
      if (String(this.getKeyFieldVal(node)) === targetKey) {
        isInCurrentPage = true;
      }
    });
    return isInCurrentPage;
  };

  /**
   * 获取节点和叶子节点的映射关系
   * @param tree
   * @returns {{}}
   */
  getLeafNodesMap = (tree) => {
    const LeafNodesMap = {};
    traverseTree(tree, (node) => {
      LeafNodesMap[this.getKeyFieldVal(node)] = getLeafNodes(node);
    });
    return LeafNodesMap;
  };

  /**
   * 设置表格列
   */
  setColumnData = () => {
    const { supportCheckbox, columnData } = this.props;
    const { leafNodesMap, onAllCheckedChange, onNodeCheckedChange } = this;

    const setDefaultColumnProps = () => {
      return columnData.map((item) => ({
        ...item,
        align: item.align || 'left',
        width: item.width || (columnData[0].fixed ? 150 : ''),
      }));
    };

    if (supportCheckbox) {
      const currentLeafNodes = Object.keys(leafNodesMap).reduce(
        (nodeList, key) => {
          if (this.isInCurrentPage(key)) {
            nodeList.push(...leafNodesMap[key]);
          }
          return nodeList;
        },
        [],
      );
      const isCheckedAll = !!isEveryChecked(currentLeafNodes);
      const isIndeterminateAll =
        !isCheckedAll && isSomeChecked(currentLeafNodes);

      const checkboxColumn = {
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
        fixed: columnData[0].fixed,
        render: (value, row) => {
          const isChecked = !!isEveryChecked(
            leafNodesMap[this.getKeyFieldVal(row)],
          );
          const isIndeterminate =
            !isChecked && isSomeChecked(leafNodesMap[this.getKeyFieldVal(row)]);
          return (
            <Checkbox
              checked={isChecked}
              indeterminate={isIndeterminate}
              onChange={(checked) => onNodeCheckedChange(checked, row)}
            />
          );
        },
      };
      this.setState({
        expandIconColumnIndex: 1,
        columnData: [checkboxColumn, ...setDefaultColumnProps()],
      });
    } else {
      this.setState({
        expandIconColumnIndex: 0,
        columnData: setDefaultColumnProps(),
      });
    }
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
    const childParentMapping = {}; // 子节点key值 和 父节点key值 的映射关系

    // 根据 leafNodesMap 更新 selectedNodeMap（selectedNodeMap 内部使用，使用对象形式，索引更快）
    traverseTree(
      [...this.state.data, ...this.props.checkedData],
      (node, parentNode) => {
        const childValue = this.getKeyFieldVal(node);
        const leafNodes = this.leafNodesMap[childValue];
        Object.assign(this.selectedNodeMap, {
          [childValue]: leafNodes.every((lNode) => lNode.checked) ? node : null,
        });

        const parentValue = this.getKeyFieldVal(parentNode);
        Object.assign(childParentMapping, { [childValue]: parentValue });
      },
    );

    // 根据 selectedNodeMap 更新 selectedNodeList（selectedNodeList 给到外部使用）
    const selectedNodeList = Object.keys(this.selectedNodeMap).reduce(
      (list, key) => {
        const node = this.selectedNodeMap[key];
        const parentNode = this.selectedNodeMap[childParentMapping[key]];
        if (node && !parentNode) {
          list.push(node);
        }
        return list;
      },
      [],
    );
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
        this.leafNodesMap[key].forEach((node) => {
          Object.assign(node, { checked });
        });
      }
    });
    this.setColumnData();
    this.updateSelectedNodes(() => {
      this.props.onCheckedAllAfter(this.state.selectedNodeList);
    });
  };

  /**
   * 选中当前行
   * @param checked
   * @param row
   */
  onNodeCheckedChange = (checked, row) => {
    // 更新叶子节点 leafNodesMap 的选中状态
    this.leafNodesMap[this.getKeyFieldVal(row)].forEach((node) => {
      Object.assign(node, { checked });
    });
    this.setColumnData();
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
    const _leafNodesMap = this.getLeafNodesMap(this.props.checkedData);
    Object.keys(_leafNodesMap).forEach((key) => {
      _leafNodesMap[key].forEach((node) => {
        Object.assign(node, { checked: true });
      });
    });
    Object.assign(this.leafNodesMap, _leafNodesMap);
    this.updateSelectedNodes();
  };

  /**
   * 表格刷新
   * @param pageNum
   * @param pageSize
   * @returns {Promise<void>}
   */
  refreshGrid = async (pageNum, pageSize) => {
    this.setState({ isLoading: true }, async () => {
      const { pageOpts } = this.state;
      const _pageOpts = {
        ...pageOpts,
        pageNum: pageNum || pageOpts.pageNum,
        pageSize: pageSize || pageOpts.pageSize,
      };
      const { totals, data } = await getDataSource(
        this.props.ajaxData,
        _pageOpts,
      );

      // 更新叶子节点 leafNodesMap 的选中状态
      const _leafNodesMap = this.getLeafNodesMap(data);
      Object.keys(_leafNodesMap).forEach((key) => {
        _leafNodesMap[key].forEach((node) => {
          Object.assign(node, { checked: !!this.selectedNodeMap[key] });
        });
      });
      Object.assign(this.leafNodesMap, _leafNodesMap);

      this.setState(
        {
          pageOpts: { ..._pageOpts, totals },
          data,
          isLoading: false,
        },
        this.setColumnData,
      );
    });
  };

  /**
   * 改变分页
   * @param pageNum
   * @param pageSize
   */
  onPageChange = (pageNum, pageSize) => {
    this.refreshGrid(pageNum, pageSize);
  };

  /**
   * 刷新表格
   */
  onRefresh = async () => {
    this.refreshGrid();
  };

  render() {
    const { ref, selectedNodeMap, onPageChange, onRefresh, getKeyFieldVal } =
      this;
    const {
      style,
      bordered,
      size,
      supportPage,
      footerTpl,
      emptyTpl,
      supportCheckbox,
      rowKey,
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
          className={classnames(`${tablePrefixCls}-box`, {
            [`${tablePrefixCls}-${size}`]: true,
            [`${tablePrefixCls}-bordered`]: bordered,
            [`${tablePrefixCls}-loading`]: isLoading,
            [`${tablePrefixCls}-empty`]: !data.length,
          })}
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
              return selectedNodeMap[getKeyFieldVal(row)]
                ? `${tablePrefixCls}-row-select`
                : '';
            }}
            // summary={() => (
            //     <Table.Summary fixed={scrollY}>
            //         <Table.Summary.Row>
            //             <Table.Summary.Cell index={0} />
            //             <Table.Summary.Cell index={1} colSpan={2}>
            //                 Summary
            //             </Table.Summary.Cell>
            //             <Table.Summary.Cell index={3} colSpan={8}>
            //                 Content
            //             </Table.Summary.Cell>
            //             <Table.Summary.Cell index={11} colSpan={2}>
            //                 Right
            //             </Table.Summary.Cell>
            //         </Table.Summary.Row>
            //     </Table.Summary>
            // )}
          />
          <Loading
            className={`${tablePrefixCls}-loading-layer`}
            loading={isLoading}
          />
        </div>
        {supportPage && (
          <div className={classnames(`${tablePrefixCls}-footer`)}>
            <div className={classnames(`${tablePrefixCls}-footer-statistics`)}>
              {supportCheckbox && (
                <span className={classnames(`${tablePrefixCls}-footer-total`)}>
                  已选 {selectedNodeList.length} 条
                </span>
              )}
              <span
                className={classnames(`${tablePrefixCls}-footer-refresh`)}
                onClick={onRefresh}
              >
                <Icon type="refresh" />
                刷新
              </span>
            </div>
            <Pagination
              {...pageOpts}
              current={pageNum}
              pageSize={pageSize}
              total={totals}
              onChange={onPageChange}
            />
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
};
