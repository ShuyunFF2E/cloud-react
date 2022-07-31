import React from 'react';
import classnames from 'classnames';
import Icon from '../../icon';
import Tooltip from '../../tooltip';
import Checkbox from '../../checkbox';
import Radio from '../../radio';
import Popover from '../../popover';
import { isEveryChecked, isSomeChecked, setConfig } from '../util';
import { tablePrefixCls } from '../constant';

export default class Column {
  constructor(_this) {
    this._this = _this;
    this.setCheckboxColumn = this.setCheckboxColumn.bind(this);
    this.setColumnData = this.setColumnData.bind(this);
  }

  /**
   * 设置单选和多选列模板
   */
  setCheckboxColumn = () => {
    const { _this } = this;
    const { supportCheckbox, supportRadio } = _this.props;
    const { columnData } = _this.state;
    const isFirstColumnFixed = columnData[0].fixed;

    if (supportCheckbox) {
      const checkboxColumn = this.getCheckboxColumn(isFirstColumnFixed);
      _this.setState({
        expandIconColumnIndex: _this.props.expandIconColumnIndex + 1,
        columnData:
          columnData[0].dataIndex === 'checkbox'
            ? [checkboxColumn, ...columnData.slice(1)]
            : [checkboxColumn, ...columnData],
      });
      return;
    }
    if (supportRadio) {
      const radioColumn = this.getRadioColumn(isFirstColumnFixed);
      _this.setState({
        expandIconColumnIndex: _this.props.expandIconColumnIndex + 1,
        columnData:
          columnData[0].dataIndex === 'radio'
            ? [radioColumn, ...columnData.slice(1)]
            : [radioColumn, ...columnData],
      });
      return;
    }
    _this.setState({
      expandIconColumnIndex: _this.props.expandIconColumnIndex,
    });
  };

  /**
   * 设置 columnData
   */
  setColumnData = () => {
    const { _this } = this;
    const { originColumnData } = _this.state;
    const { supportCheckbox, supportRadio, isExpendAloneColumn, showDragIcon } =
      _this.props;
    const isLastColumnFixed =
      originColumnData[originColumnData.length - 1].fixed;
    const isFirstColumnFixed = originColumnData[0].fixed;

    const resolvedColumnData = originColumnData.reduce((arr, item) => {
      // 判断当前列展示还是隐藏，默认为 true
      if (!item.show) {
        return arr;
      }
      const sortBy = item.sortable ? item.sortBy : '';
      const resolveColumnItem = {
        ...item,
        sortBy,
        align: item.align || 'left',
        width: item.width || (originColumnData.find((c) => c.fixed) ? 150 : ''),
      };
      arr.push({
        ...resolveColumnItem,
        title: this.renderBasicTitle(item, sortBy, resolveColumnItem),
      });
      return arr;
    }, []);

    // 只有两级的树状表格，展开图标单独占据一列
    if (isExpendAloneColumn) {
      resolvedColumnData.unshift({
        dataIndex: 'cTableExpand',
        key: 'cTableExpand',
        width: 36,
        align: 'center',
        className: `${tablePrefixCls}-row-expand-column`,
        fixed: isFirstColumnFixed || _this.props.isCheckboxFixed,
        render: () => '',
      });
    }

    // 多选列
    if (supportCheckbox) {
      const checkboxColumn = this.getCheckboxColumn(isFirstColumnFixed);
      resolvedColumnData.unshift(checkboxColumn);
    }

    // 单选列
    if (supportRadio) {
      const radioColumn = this.getRadioColumn(isFirstColumnFixed);
      resolvedColumnData.unshift(radioColumn);
    }

    // 拖拽手柄
    if (showDragIcon) {
      resolvedColumnData.unshift({
        title: '',
        dataIndex: 'cTableDrag',
        key: 'cTableDrag',
        className: `${tablePrefixCls}-drag-column`,
        width: 40,
        render: () => <Icon type="move" style={{ lineHeight: '20px' }} />,
      });
    }

    // 支持配置列的显示和隐藏
    if (_this.props.supportConfigColumn) {
      resolvedColumnData.push({
        title: (
          <Tooltip
            trigger="click"
            theme="light"
            placement="bottom-right"
            className={`${tablePrefixCls}-tooltip`}
            content={this.renderConfig()}
          >
            <Icon style={{ cursor: 'pointer', float: 'right' }} type="config" />
          </Tooltip>
        ),
        dataIndex: 'cTableConfig',
        className: `${tablePrefixCls}-config-column`,
        render: () => '',
        width: 40,
        fixed: isLastColumnFixed,
      });
    }

    // 支持配置表格列拉伸
    if (_this.props.supportResizeColumn) {
      resolvedColumnData.forEach((item, index) => {
        if (!item.fixed) {
          Object.assign(item, {
            onHeaderCell: (column) => {
              const thArr =
                _this.ref.current.querySelectorAll('th.react-resizable');
              return {
                width:
                  column.width || thArr[index]?.getBoundingClientRect().width,
                onResize: this.handleResize(index),
              };
            },
          });
        }
      });
    }

    if (supportCheckbox || supportRadio) {
      _this.setState({
        expandIconColumnIndex: _this.props.expandIconColumnIndex + 1,
        columnData: resolvedColumnData,
      });
      return;
    }
    _this.setState({
      columnData: resolvedColumnData,
      expandIconColumnIndex: _this.props.expandIconColumnIndex,
    });
  };

  renderBasicTitle = (item, sortBy, resolveColumnItem) => {
    const { _this } = this;
    const { showFilterBtn } = _this.props;
    const hasFilter = item.filters && item.filters.length;

    if (item.sortable || hasFilter) {
      return (
        <span
          className={classnames('title-container', {
            'filter-container': hasFilter,
          })}
        >
          {typeof item.title === 'function' ? item.title(item) : item.title}
          <span
            className={classnames('sort-icon-container', {
              'cell-align-right': item.align === 'right',
              [`sort-${sortBy?.toLowerCase()}`]: !!sortBy,
            })}
            onClick={() => this.onSort(item, resolveColumnItem)}
          >
            <Icon className="sort-up-icon" type="up-solid" />
            <Icon className="sort-down-icon" type="down-solid" />
          </span>
          {hasFilter && (
            <Popover
              trigger="click"
              size="mini"
              showCancelBtn={showFilterBtn}
              showConfirmBtn={showFilterBtn}
              cancelBtnText="重置"
              width={170}
              placement="bottom-left"
              className={`${tablePrefixCls}-filter-content`}
              content={
                <>
                  {item.filters.map((f, index) => (
                    <Checkbox
                      onChange={this.onFilterChange}
                      defaultChecked={_this.state.filterValue.includes(f.value)}
                      key={f.value}
                      value={f.value}
                      disabled={f.disabled}
                      className={
                        !showFilterBtn &&
                        index === item.filters.length - 1 &&
                        'last-filter-item'
                      }
                    >
                      {f.text}
                    </Checkbox>
                  ))}
                </>
              }
              onCancelClick={this.onFilterReset}
              onConfirmClick={this.onFilterConfirm}
            >
              <Icon
                className={`filter-icon ${
                  _this.state.filterValue.length && 'has-filter-value'
                }`}
                type="filter"
              />
            </Popover>
          )}
        </span>
      );
    }
    if (typeof item.title === 'function') {
      return item.title(item);
    }
    return item.title;
  };

  /**
   * 配置按钮
   * @returns {JSX.Element}
   */
  renderConfig = () => {
    const { _this } = this;
    const { originColumnData } = _this.state;
    return (
      <ul className={`${tablePrefixCls}-tooltip-content`}>
        {originColumnData.map((item) => (
          <li>
            <Checkbox
              disabled={
                item.show && originColumnData.filter((i) => i.show).length === 1
              }
              checked={item.show}
              onChange={(checked) => {
                Object.assign(item, { show: !!checked });
                if (_this.props.supportMemory) {
                  setConfig(_this.state.originColumnData, _this.props.tableId);
                }
                this.setColumnData();
                _this.setHeaderStyle();
                _this.setFixedStyle();
              }}
            >
              {typeof item.title === 'function' ? item.title(item) : item.title}
            </Checkbox>
          </li>
        ))}
      </ul>
    );
  };

  /**
   * 拉伸行回调
   * @param index
   * @returns {(function(*, {size: *}): void)|*}
   */
  handleResize = (index) => {
    const { _this } = this;
    return (e, { size }) => {
      _this.setState(({ columnData }) => {
        const nextColumns = [...columnData];
        const minWidth = nextColumns[index].minWidth || 106;
        Object.assign(nextColumns[index], {
          width: size.width > minWidth ? size.width : minWidth,
        });
        const thArr = _this.ref.current.querySelectorAll('th.react-resizable');
        nextColumns.forEach((col, i) => {
          if (i !== index) {
            Object.assign(col, {
              width: thArr[i]?.getBoundingClientRect().width,
            });
          }
        });
        return { columnData: nextColumns };
      });
    };
  };

  getDragColumn = () => ({
    title: '',
    dataIndex: 'cTableDrag',
    key: 'cTableDrag',
    className: `${tablePrefixCls}-drag-column`,
    width: 40,
    render: () => <Icon type="move" />,
  });

  /**
   * 单选列模板
   * @param isFirstColumnFixed
   * @returns {{dataIndex: string, width: number, fixed: (boolean|*), title: string, render: (function(*, *=)), key: string}}
   */
  getRadioColumn = (isFirstColumnFixed) => {
    const { _this } = this;
    const { leafNodesMap } = _this;
    return {
      title: '',
      className: `${tablePrefixCls}-radio-column`,
      dataIndex: 'radio',
      key: 'radio',
      width: 40,
      fixed: isFirstColumnFixed || _this.props.isCheckboxFixed,
      render: (value, row) => {
        const radioVal = _this.getKeyFieldVal(row);
        const targetNode = leafNodesMap[radioVal] || {};
        const isDisabled = _this.isRowDisabled(row);
        return (
          <Radio
            disabled={isDisabled}
            value={radioVal}
            checked={!!isEveryChecked(targetNode.childNodes)}
            onChange={() => this.onNodeRadioChange(row)}
          />
        );
      },
    };
  };

  /**
   * 多选列模板
   * @param isFirstColumnFixed
   * @returns {{}}
   */
  getCheckboxColumn = (isFirstColumnFixed) => {
    const { _this } = this;
    const { leafNodesMap } = _this;

    const currentLeafNodes = Object.keys(leafNodesMap).reduce(
      (nodeList, key) => {
        if (_this.isInCurrentPage(key)) {
          nodeList.push(...leafNodesMap[key].childNodes);
        }
        return nodeList;
      },
      [],
    );
    const isCheckedAll = !!isEveryChecked(
      currentLeafNodes.filter((node) => !_this.isRowDisabled(node)),
    );
    const isIndeterminateAll = !isCheckedAll && isSomeChecked(currentLeafNodes);

    return {
      title: (
        <Checkbox
          style={{ float: 'left' }}
          checked={isCheckedAll}
          indeterminate={isIndeterminateAll}
          onChange={(checked) => this.onAllCheckedChange(checked)}
        />
      ),
      className: `${tablePrefixCls}-checkbox-column`,
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 40,
      fixed: isFirstColumnFixed || _this.props.isCheckboxFixed,
      render: (value, row) => {
        const targetNode = leafNodesMap[_this.getKeyFieldVal(row)] || {};
        const isChecked = !!isEveryChecked(targetNode.childNodes);
        const isIndeterminate =
          !isChecked && isSomeChecked((targetNode || {}).childNodes);
        const isDisabled = _this.isRowDisabled(row);
        return (
          <Checkbox
            checked={isChecked}
            indeterminate={isIndeterminate}
            disabled={isDisabled}
            onChange={(checked) => this.onNodeCheckedChange(checked, row)}
          />
        );
      },
    };
  };

  /**
   * 选中当页
   * @param checked
   */
  onAllCheckedChange = (checked) => {
    const { _this } = this;
    // 更新叶子节点 leafNodesMap 的选中状态
    Object.keys(_this.leafNodesMap).forEach((key) => {
      if (_this.isInCurrentPage(key)) {
        _this.leafNodesMap[key].childNodes.forEach((node) => {
          if (!_this.isRowDisabled(node)) {
            Object.assign(node, { checked });
          }
        });
      }
    });
    this.setCheckboxColumn();
    _this.updateSelectedNodes(() => {
      _this.props.onCheckedAllAfter(
        _this.state.selectedNodeList,
        _this.state.data,
        checked,
      );
    });
  };

  /**
   * 选中当前行（多选）
   * @param checked
   * @param row
   */
  onNodeCheckedChange = (checked, row) => {
    const { _this } = this;
    // 更新叶子节点 leafNodesMap 的选中状态
    _this.leafNodesMap[_this.getKeyFieldVal(row)].childNodes.forEach((node) => {
      if (!_this.isRowDisabled(node)) {
        Object.assign(node, { checked });
      }
    });
    this.setCheckboxColumn();
    _this.updateSelectedNodes(() => {
      _this.props.onCheckedAfter(_this.state.selectedNodeList, row, checked);
    });
  };

  /**
   * 选中当前行（单选）
   * @param row
   */
  onNodeRadioChange = (row) => {
    const { _this } = this;
    // 如果默认传入的已选数据不在当前页，则删除（checkedData = [{ id: 'test' }]）
    Object.keys(_this.leafNodesMap).forEach((key) => {
      if (!Array.isArray(_this.leafNodesMap[key].childNodes)) {
        delete _this.leafNodesMap[key];
      }
    });
    // 更新叶子节点 leafNodesMap 的选中状态
    Object.keys(_this.leafNodesMap).forEach((key) => {
      _this.leafNodesMap[key].childNodes.forEach((node) => {
        Object.assign(node, {
          checked: _this.getKeyFieldVal(node) === _this.getKeyFieldVal(row),
        });
      });
    });
    this.setCheckboxColumn();
    _this.updateSelectedNodes(() => {
      _this.props.onCheckedAfter(_this.state.selectedNodeList, row, true);
    });
  };

  /**
   * 表格排序
   * @param itemData
   * @param columnItem
   */
  onSort = (itemData, columnItem) => {
    const { _this } = this;
    _this.loadGrid({ sortParams: columnItem }, () => {
      // 更新 columnData 的 sortBy 字段
      const { columnData } = _this.state;
      _this.setState(
        {
          // eslint-disable-next-line react/no-unused-state
          originColumnData: columnData.map((item) => {
            if (item.dataIndex === columnItem.dataIndex) {
              return {
                ...item,
                title: itemData.title,
                sortBy: item.sortBy === 'ASC' ? 'DESC' : 'ASC',
              };
            }
            return {
              ...item,
              title: itemData.title,
              sortBy: '',
            };
          }),
        },
        _this.column.setColumnData,
      );
    });
  };

  onFilterChange = (checked, value) => {
    const { _this } = this;
    const { filterValue } = _this.state;
    const { showFilterBtn } = _this.props;
    const targetIndex = filterValue.findIndex((v) => v === value);

    if (checked && targetIndex === -1) {
      filterValue.push(value);
    }
    if (!checked && targetIndex > -1) {
      filterValue.splice(targetIndex, 1);
    }
    _this.setState({ filterValue }, () => {
      if (!showFilterBtn) {
        this.setColumnData();
        _this.loadGrid();
      }
    });
  };

  /**
   * 筛选重置
   */
  onFilterReset = () => {
    const { _this } = this;
    _this.setState({ filterValue: [] }, () => {
      this.setColumnData();
      _this.loadGrid();
    });
  };

  /**
   * 筛选确认
   */
  onFilterConfirm = () => {
    const { _this } = this;
    this.setColumnData();
    _this.loadGrid();
  };
}
