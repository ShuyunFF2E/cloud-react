import PropTypes from 'prop-types';
import { noop } from '@utils';

export const propTypes = {
  ajaxData: PropTypes.oneOfType([ PropTypes.func, PropTypes.object ]).isRequired,
  columnData: PropTypes.array.isRequired,
  rowKey: PropTypes.string,
  bordered: PropTypes.bool,
  size: PropTypes.oneOf([ 'default', 'small', 'large' ]),
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
  emptyText: PropTypes.any,
  checkedData: PropTypes.array,
  showTotal: PropTypes.bool,
  showRefresh: PropTypes.bool,
  lightCheckedRow: PropTypes.bool,
  rowClassName: PropTypes.func,
  headerBordered: PropTypes.bool,
  className: PropTypes.string,
  supportRadio: PropTypes.bool,
  disabledData: PropTypes.array,
  totalsKey: PropTypes.string,
  dataKey: PropTypes.string,
  childrenKey: PropTypes.string,
  isDelay: PropTypes.bool,
  onLoadGridAfter: PropTypes.func,
  onRow: PropTypes.func,
  onLoadGridBefore: PropTypes.func,
  isCheckboxFixed: PropTypes.bool,
  supportConfigColumn: PropTypes.bool,
  defaultShowColumns: PropTypes.array,
  disabledConfigColumns: PropTypes.array,
  hideConfigColumns: PropTypes.array,
  supportResizeColumn: PropTypes.bool,
  emptyStyle: PropTypes.object,
  maxHeight: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  supportMemory: PropTypes.bool,
  tableId: PropTypes.string,
  scrollIntoTop: PropTypes.bool,
  expandIconColumnIndex: PropTypes.number,
  isExpendAloneColumn: PropTypes.bool,
  supportGroup: PropTypes.bool,
  summaryData: PropTypes.array,
  supportDrag: PropTypes.bool,
  dragSelector: PropTypes.string,
  onDragAfter: PropTypes.func,
  showDragIcon: PropTypes.bool,
  supportFullColumn: PropTypes.bool,
  loadingTpl: PropTypes.func,
  loadingOpts: PropTypes.object,
  showFilterBtn: PropTypes.bool,
  footerHeight: PropTypes.number,
  footerSelectTpl: PropTypes.any,
  footerTotalTpl: PropTypes.any,
  isTreeIncludeChildren: PropTypes.bool,
  tooltipConfigs: PropTypes.array,
  disablePageOnLoad: PropTypes.bool,
  watchColumnData: PropTypes.bool,
  useRootWindow: PropTypes.bool,
  showFooterSelect: PropTypes.bool,
  hideEmptyFooter: PropTypes.bool,
  disabled: PropTypes.bool,
  sticky: PropTypes.object,
  stickyFooter: PropTypes.bool,
  sortWidthOriginStatus: PropTypes.bool,
  sortMultiColumns: PropTypes.bool,
  showCheckedAll: PropTypes.bool,
};

export const defaultProps = {
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
  emptyTpl: () => '',
  emptyText: () => '',
  checkedData: [],
  showTotal: false,
  showRefresh: true,
  lightCheckedRow: false,
  rowClassName: () => '',
  headerBordered: false,
  className: '',
  supportRadio: false,
  disabledData: [],
  totalsKey: 'totals',
  dataKey: 'data',
  childrenKey: 'children',
  isDelay: false,
  onLoadGridAfter: () => {},
  onRow: () => {},
  onLoadGridBefore: () => {},
  isCheckboxFixed: false,
  supportConfigColumn: false,
  defaultShowColumns: [],
  disabledConfigColumns: [],
  hideConfigColumns: [],
  supportResizeColumn: false,
  emptyStyle: {},
  maxHeight: '',
  supportMemory: false,
  tableId: '',
  scrollIntoTop: true,
  expandIconColumnIndex: 0,
  isExpendAloneColumn: false,
  supportGroup: false,
  summaryData: [],
  supportDrag: false,
  dragSelector: '',
  onDragAfter: noop,
  showDragIcon: false,
  supportFullColumn: false,
  loadingTpl: () => null,
  loadingOpts: {},
  showFilterBtn: false,
  footerHeight: undefined,
  footerSelectTpl: null,
  footerTotalTpl: null,
  isTreeIncludeChildren: true,
  tooltipConfigs: [],
  disablePageOnLoad: true,
  watchColumnData: false,
  useRootWindow: false,
  showFooterSelect: true,
  hideEmptyFooter: false,
  disabled: false,
  sticky: undefined,
  stickyFooter: false,
  sortWidthOriginStatus: false,
  sortMultiColumns: false,
  showCheckedAll: true,
};
