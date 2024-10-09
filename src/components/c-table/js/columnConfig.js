import React, { Component } from 'react';
import ReactDragListView from 'react-drag-listview';
import { tablePrefixCls } from '../constant';
import Tooltip from '../../tooltip';
import Icon from '../../icon';
import Popover from '../../popover';
import Checkbox from '../../checkbox';
import Button from '../../button';
import { setConfig } from '../util';

const columnConfigPanelHeight = 466;
const popoverIgnoreClass = `${tablePrefixCls}-config-column-button`;

class ColumnConfig extends Component {
  onDragEnd = (fromIndex, toIndex) => {
    const { hideConfigColumns, originColumnData, setOriginColumnData } = this.props;
    const _fromIndex = fromIndex;
    const _toIndex = toIndex;

    const hideColumnIndexList = hideConfigColumns.map(item => (
      originColumnData.findIndex(item1 => item1.dataIndex === item)
    ));

    const dataCopy = [...originColumnData].filter(item => !hideConfigColumns.includes(item.dataIndex));
    const item = dataCopy.splice(_fromIndex, 1)[0];
    dataCopy.splice(_toIndex, 0, item);

    setOriginColumnData(originColumnData.map((hItem, index) => {
      if (hideColumnIndexList.includes(index)) {
        return hItem;
      }
      return dataCopy[index];
    }));
  }

  renderConfig = () => {
    const {
      originColumnData,
      disabled,
      disabledConfigColumns,
      hideConfigColumns,
      supportMemory,
      tableId,
      refreshColumn,
    } = this.props;
    return (
      <ul className={`${tablePrefixCls}-tooltip-content`}>
        <p className="config-title">配置列的显示状态</p>
        {originColumnData.filter(c => !hideConfigColumns.includes(c.dataIndex)).map((item) => (
          <li>
            <Checkbox
              disabled={
                disabled
                || disabledConfigColumns.includes(item.dataIndex)
                || (item.show
                  && originColumnData.filter((i) => i.show).length === 1)
              }
              checked={item.show}
              onChange={(checked) => {
                Object.assign(item, { show: !!checked });
                if (supportMemory) {
                  setConfig(originColumnData, tableId);
                }
                refreshColumn();
              }}
            >
              {typeof item.title === 'function' ? item.title(item) : item.title}
            </Checkbox>
          </li>
        ))}
      </ul>
    );
  };

  renderComplexConfig = () => {
    const {
      originColumnData,
      disabled,
      disabledConfigColumns,
      hideConfigColumns,
      originConfigColumnData,
      setOriginColumnData,
      refreshColumn,
    } = this.props;
    const dragSelector = `${tablePrefixCls}-config-drag-icon`;
    const itemSelector = `${tablePrefixCls}-tooltip-complex-content-item`;
    return (
      <section className={`${tablePrefixCls}-tooltip-complex`}>
        <p className={`${tablePrefixCls}-tooltip-complex-title`}>配置列的显示状态</p>
        <div style={{ maxHeight: columnConfigPanelHeight - 128, overflow: 'auto' }}>
          <ReactDragListView
            onDragEnd={this.onDragEnd}
            handleSelector={`.${dragSelector}`}
            nodeSelector={`.${itemSelector}`}
            lineClassName={`${tablePrefixCls}-drag-line`}
          >
            <ul className={`${tablePrefixCls}-tooltip-complex-content`}>
              {originColumnData.filter(c => !hideConfigColumns.includes(c.dataIndex)).map((item, index) => (
                <li className={itemSelector}>
                  <Checkbox
                    disabled={disabled || disabledConfigColumns.includes(item.dataIndex)}
                    checked={item.columnChecked}
                    onChange={(checked) => {
                      const target = originColumnData.find(item1 => item1.dataIndex === item.dataIndex);
                      if (target) {
                        Object.assign(target, { columnChecked: !!checked });
                        setOriginColumnData([...originColumnData]);
                      }
                    }}
                  >
                    {typeof item.title === 'function' ? item.title(item) : item.title}
                  </Checkbox>
                  <span className={`${tablePrefixCls}-tooltip-complex-operate-icon`}>
                    <Icon
                      type="down"
                      style={{
                        lineHeight: '20px',
                        visibility: index < originColumnData.length - hideConfigColumns.length - 1 ? 'visible' : 'hidden',
                      }}
                      onClick={() => this.onDragEnd(index, index + 1)}
                    />
                    <Icon
                      type="up"
                      style={{ lineHeight: '20px', visibility: index > 0 ? 'visible' : 'hidden' }}
                      onClick={() => this.onDragEnd(index, index - 1)}
                    />
                    <Icon type="move" style={{ lineHeight: '20px' }} className={dragSelector} />
                  </span>
                </li>
              ))}
            </ul>
          </ReactDragListView>
        </div>
        <div className={`${tablePrefixCls}-tooltip-complex-button-area`}>
          <Button
            size="small"
            type="link"
            onClick={() => {
              setOriginColumnData([...originConfigColumnData], refreshColumn);
            }}
            className={popoverIgnoreClass}
          >
            恢复默认
          </Button>
          <Button
            disabled={!originColumnData.filter((i) => i.columnChecked).length}
            size="small"
            type="primary"
            onClick={() => {
              setOriginColumnData(originColumnData.map(item => ({
                ...item,
                show: item.columnChecked,
              })), refreshColumn);
            }}
            className={popoverIgnoreClass}
          >
            保存
          </Button>
          <Button
            size="small"
            type="normal"
            onClick={() => {
              setOriginColumnData(originConfigColumnData.map(item => ({
                ...originColumnData.find(item1 => item1.dataIndex === item.dataIndex),
                columnChecked: item.show,
              })), refreshColumn);
            }}
            className={popoverIgnoreClass}
          >
            取消
          </Button>
        </div>
      </section>
    );
  }

  render() {
    const {
      isLoading,
      tableRef,
      loadingOpts,
      configColumnType,
    } = this.props;

    const isComplexConfig = configColumnType === 'complex';
    return (
      <Popover
        trigger="click"
        theme="light"
        placement="bottom-right"
        className={`${tablePrefixCls}-tooltip`}
        content={configColumnType === 'complex' ? this.renderComplexConfig() : this.renderConfig()}
        overlayStyle={{
          maxHeight: columnConfigPanelHeight,
          top: 40,
          right: 1,
          left: 'auto',
        }}
        contentStyle={{ maxHeight: columnConfigPanelHeight - 24 }}
        containerEle={tableRef.current}
        ignoreClassList={isComplexConfig ? [popoverIgnoreClass] : []}
      >
        <Tooltip content="列设置" theme="light" overlayStyle={{ minWidth: 50 }}>
          <span className={`${tablePrefixCls}-config-icon`} style={isLoading || loadingOpts.loading ? { zIndex: -1 } : {}}>
            <Icon type="config" />
          </span>
        </Tooltip>
      </Popover>
    );
  }
}

export default ColumnConfig;
