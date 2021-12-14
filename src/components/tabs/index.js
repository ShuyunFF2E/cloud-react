import React, { PureComponent, Children, isValidElement } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { prefixCls, noop } from '@utils';

import IconRaw from '../icon';
import Tooltip from '../tooltip';

import './index.less';

const Icon = React.memo(IconRaw);
const CONTAINER_PADDING = 30;

export default class Tabs extends PureComponent {
  static propTypes = {
    defaultActiveKey: PropTypes.string,
    activeKey: PropTypes.string,
    activeClassName: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    mode: PropTypes.oneOf(['reset', 'remain']),
    style: PropTypes.object,
    step: PropTypes.number,
  };

  static defaultProps = {
    defaultActiveKey: '',
    activeKey: '',
    activeClassName: 'active',
    type: 'card',
    className: '',
    mode: 'reset',
    style: {},
    step: 0,
    onChange: noop,
    onClose: noop,
  };

  constructor(props) {
    super(props);
    const { defaultActiveKey, activeKey, children } = props;

    const childList = Array.isArray(children) ? children : [children];
    const activedKey = activeKey || defaultActiveKey || childList[0].key;
    const childCount = React.Children.count(children);

    this.state = {
      activedKey,
      hasMore: false,
      prevChildCount: childCount,
      childCount,
      prevProps: props,
    };

    this.activeBarRef = React.createRef();
    this.tabsRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { prevProps } = state;
    const prevChildCount = React.Children.count(prevProps.children);
    const nextChildCount = React.Children.count(nextProps.children);

    // 1. 通过props指定activeKey时，更新state
    // 2. tabpanel的数量发生变化时, 更新state
    if (
      prevProps.activeKey !== nextProps.activeKey ||
      (prevProps.activeKey === nextProps.activeKey &&
        prevChildCount !== nextChildCount)
    ) {
      return {
        activedKey: nextProps.activeKey,
        prevProps: nextProps,
        prevChildCount,
        childCount: nextChildCount,
      };
    }
    return null;
  }

  componentDidMount() {
    this.initTabsItems();
    if (this.hasLineBar) this.countLineBarStyle();
  }

  componentDidUpdate() {
    const {
      state: { prevChildCount, childCount },
      hasLineBar,
      itemsMaxLeft,
    } = this;
    if (prevChildCount !== childCount) {
      this.countMore();
      this.tabsRef.current.style.left = itemsMaxLeft;
      this.childCount = childCount;
    }
    if (hasLineBar) this.countLineBarStyle();
  }

  set childCount(count) {
    this.setState({
      prevChildCount: count,
    });
  }

  get hasLineBar() {
    return this.props.type === 'line';
  }

  get isCapsule() {
    return this.props.type === 'capsule';
  }

  get isVerticalLeft() {
    return this.props.linePlacement === 'left';
  }

  get isVerticalRight() {
    return this.props.linePlacement === 'right';
  }

  get activeEle() {
    return this.tabsRef.current.getElementsByClassName(
      this.props.activeClassName,
    )[0];
  }

  get activeTabsOffsetLeft() {
    if (this.hasLineBar && this.isVerticalLeft) {
      return 0;
    }
    if (this.hasLineBar && this.isVerticalRight) {
      return 'auto';
    }
    return this.activeEle ? this.activeEle.offsetLeft : 0;
  }

  get activeTabsOffsetRight() {
    if (this.hasLineBar && this.isVerticalLeft) {
      return 'auto';
    }
    if (this.hasLineBar && this.isVerticalRight) {
      return 0;
    }
    return this.activeEle ? this.activeEle.offsetRight : 0;
  }

  get activeTabsOffsetWidth() {
    if (this.hasLineBar && (this.isVerticalLeft || this.isVerticalRight)) {
      return 2;
    }
    return this.activeEle ? this.activeEle.offsetWidth : 0;
  }

  get activeTabsOffsetTop() {
    if (this.hasLineBar && (this.isVerticalLeft || this.isVerticalRight)) {
      return this.activeEle ? this.activeEle.offsetTop : 0;
    }
    return 'auto';
  }

  get tabsOffsetLeft() {
    return this.tabsRef.current.offsetLeft;
  }

  get tabsOffsetWidth() {
    return this.tabsRef.current.offsetWidth;
  }

  get tabsScrollWidth() {
    return this.tabsRef.current.scrollWidth;
  }

  get tabsPrevDisabled() {
    return this.tabsOffsetLeft >= 0;
  }

  get tabsNextDisabled() {
    const { tabsOffsetLeft, tabsOffsetWidth, tabsScrollWidth } = this;
    return (
      -tabsOffsetLeft + CONTAINER_PADDING + tabsOffsetWidth >= tabsScrollWidth
    );
  }

  get step() {
    return this.props.step || this.tabsOffsetWidth / 3;
  }

  get itemsMaxLeft() {
    const { tabsOffsetWidth, tabsScrollWidth } = this;
    return `-${tabsScrollWidth - tabsOffsetWidth}px`;
  }

  get itemsNextLeft() {
    const { tabsOffsetLeft, tabsOffsetWidth, tabsScrollWidth } = this;
    return -tabsOffsetLeft + tabsOffsetWidth > tabsScrollWidth - this.step
      ? this.itemsMaxLeft
      : `${tabsOffsetLeft - this.step}px`;
  }

  get itemsPrevLeft() {
    const { tabsOffsetLeft } = this;
    return tabsOffsetLeft + this.step > 0
      ? 0
      : `${tabsOffsetLeft + this.step}px`;
  }

  initTabsItems = () => {
    const { tabsScrollWidth, tabsOffsetWidth } = this;
    const hasMore = tabsScrollWidth > tabsOffsetWidth;
    if (hasMore && this.activeEle) {
      const {
        tabsOffsetLeft,
        itemsMaxLeft,
        activeTabsOffsetLeft,
        activeTabsOffsetWidth,
      } = this;
      if (
        activeTabsOffsetLeft + activeTabsOffsetWidth >=
        tabsOffsetWidth - CONTAINER_PADDING * 2 + -tabsOffsetLeft
      ) {
        const max = parseFloat(itemsMaxLeft) - CONTAINER_PADDING * 2;
        const left = activeTabsOffsetLeft > -max ? max : -activeTabsOffsetLeft;
        this.tabsRef.current.style.left = `${left}px`;
      }
    }
    this.setState({ hasMore });
  };

  countTabsItemsStyle = (isNext) => {
    if (isNext) {
      this.tabsRef.current.style.left = this.itemsNextLeft;
    } else {
      this.tabsRef.current.style.left = this.itemsPrevLeft;
    }
    if (this.hasLineBar) this.countLineBarStyle();
  };

  countMore = () => {
    const { tabsScrollWidth, tabsOffsetWidth } = this;
    this.setState({
      hasMore: tabsScrollWidth > tabsOffsetWidth,
    });
  };

  countLineBarStyle = () => {
    const {
      activeTabsOffsetLeft,
      activeTabsOffsetWidth,
      activeTabsOffsetRight,
      activeTabsOffsetTop,
    } = this;
    Object.assign(this.activeBarRef.current.style, {
      width: `${activeTabsOffsetWidth}px`,
      left:
        typeof activeTabsOffsetLeft === 'number'
          ? `${activeTabsOffsetLeft}px`
          : activeTabsOffsetLeft,
      right:
        typeof activeTabsOffsetRight === 'number'
          ? `${activeTabsOffsetRight}px`
          : activeTabsOffsetRight,
      top:
        typeof activeTabsOffsetTop === 'number'
          ? `${activeTabsOffsetTop}px`
          : activeTabsOffsetTop,
    });
  };

  keyFilter = (key) => {
    // 使用form key会变为 0.$XXXX
    const [k1 = '', k2 = ''] = key.split('.$');
    return k2 || k1;
  };

  handleChange = (key) => () => {
    const { activedKey } = this.state;
    if (key === activedKey) {
      return;
    }

    this.setState({
      activedKey: key,
    });

    this.props.onChange(this.keyFilter(key));
  };

  handleClose = (key) => () => {
    this.props.onClose(this.keyFilter(key));
  };

  handleTabsPrev = () => {
    if (!this.tabsPrevDisabled) this.countTabsItemsStyle(false);
  };

  handleTabsNext = () => {
    if (!this.tabsNextDisabled) this.countTabsItemsStyle(true);
  };

  renderTabHeader(child, isActived) {
    const { type, activeClassName } = this.props;
    const {
      disabled,
      closable,
      tab,
      tabBarStyle,
      lineSuffixTpl,
      linePrefixTpl,
    } = child.props;
    const { width } = tabBarStyle;
    const { key } = child;

    // class & style
    const className = cls(`${prefixCls}-tabs-item-${type}`, {
      [activeClassName]: !disabled && isActived,
      disabled,
    });

    const getTabTpl = () => {
      if (this.hasLineBar) {
        return (
          <>
            <span>
              {linePrefixTpl && (
                <span className="tab-prefix">{linePrefixTpl}</span>
              )}
              <span className={`${prefixCls}-tab-content`}>{tab}</span>
            </span>
            <span>
              {lineSuffixTpl && (
                <span className="tab-suffix">{lineSuffixTpl}</span>
              )}
              {closable && (
                <Icon
                  type="close"
                  className="closable"
                  onClick={this.handleClose(key)}
                />
              )}
            </span>
          </>
        );
      }

      return (
        <>
          {width && width !== 'auto' ? (
            <Tooltip content={tab}>{tab}</Tooltip>
          ) : (
            tab
          )}
          {closable && (
            <span className="closable-wrapper">
              <Icon
                type="close"
                className="closable"
                onClick={this.handleClose(key)}
              />
            </span>
          )}
        </>
      );
    };

    // render
    return (
      <span
        className={`${className} ${prefixCls}-tabs-container`}
        key={key}
        style={tabBarStyle}
        onClick={this.handleChange(key)}
      >
        {getTabTpl()}
      </span>
    );
  }

  renderMoreIcon = () => {
    if (
      !this.state.hasMore ||
      (this.hasLineBar && (this.isVerticalRight || this.isVerticalLeft))
    )
      return null;
    const { type } = this.props;

    return (
      <>
        <span
          className={`${prefixCls}-tabs-more-icon-${type} before`}
          onClick={this.handleTabsPrev}
        >
          <Icon type="left" className="icon" />
        </span>
        <span
          className={`${prefixCls}-tabs-more-icon-${type} after`}
          onClick={this.handleTabsNext}
        >
          <Icon type="right" className="icon" />
        </span>
      </>
    );
  };

  render() {
    const { children, className, mode, type, linePlacement } = this.props;
    const { activedKey, hasMore } = this.state;

    const headers = [];
    const fixedHeaders = [];
    let panel = [];

    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;

      const isActived = this.keyFilter(child.key) === activedKey;
      headers.push(this.renderTabHeader(child, isActived));

      if (type === 'card' && child.props.fixed) {
        fixedHeaders.push(this.renderTabHeader(child, isActived));
      }
      // 处理panel
      if (mode === 'remain') {
        const style = isActived
          ? child.props.style
          : { ...child.props.style, display: 'none' };
        const target = React.cloneElement(child, { style });
        panel.push(target);
      } else if (isActived) {
        panel = child;
      }
    });

    const isVertical =
      this.hasLineBar && (this.isVerticalLeft || this.isVerticalRight);
    const isHorizontal =
      this.hasLineBar && !(this.isVerticalLeft || this.isVerticalRight);
    const finalClassName = cls(
      `${prefixCls}-tabs`,
      {
        [`${prefixCls}-tabs-${linePlacement}`]: isVertical,
      },
      className,
    );
    const headerClassName = cls(`${prefixCls}-tabs-header-${type}`, {
      [`${prefixCls}-tabs-header-more`]: hasMore,
      [`${prefixCls}-tabs-bg-mode`]: isVertical && this.props.lineBgMode, // 背景色模式
      [`${prefixCls}-tabs-line-horizontal`]: isHorizontal,
    });

    return (
      <div className={finalClassName} style={this.props.style}>
        <section className={headerClassName}>
          {this.renderMoreIcon()}
          <div className={`${prefixCls}-tabs-items`}>
            {!!fixedHeaders.length && (
              <div
                className={cls(`${prefixCls}-tabs-items-fixed`, {
                  'fixed-has-more-icon': this.state.hasMore,
                })}
              >
                {fixedHeaders}
              </div>
            )}
            <div
              className={`${prefixCls}-tabs-items-scroll`}
              ref={this.tabsRef}
            >
              {headers}
              {this.hasLineBar && (
                <div
                  className={`${prefixCls}-tabs-item-bar`}
                  ref={this.activeBarRef}
                />
              )}
            </div>
          </div>
        </section>
        {panel}
      </div>
    );
  }
}

const Panel = React.memo((props) => {
  const finalClassName = cls(
    `${prefixCls}-tabpanel-container`,
    props.className,
  );
  return (
    <div className={finalClassName} style={props.style}>
      {props.children}
    </div>
  );
});

Panel.propTypes = {
  tab: PropTypes.node.isRequired, // eslint-disable-line
  closable: PropTypes.bool, // eslint-disable-line
  disabled: PropTypes.bool, // eslint-disable-line
  fixed: PropTypes.bool, // eslint-disable-line
  className: PropTypes.string,
  style: PropTypes.object,
  tabBarStyle: PropTypes.object, // eslint-disable-line
  lineSuffixTpl: PropTypes.any, // eslint-disable-line
  linePrefixTpl: PropTypes.any, // eslint-disable-line
  linePlacement: PropTypes.oneOf(['top', 'left', 'right']), // eslint-disable-line
  lineBgMode: PropTypes.bool, // eslint-disable-line
};

Panel.defaultProps = {
  disabled: false,
  closable: false,
  fixed: false,
  className: '',
  style: {},
  tabBarStyle: {},
  lineSuffixTpl: '',
  linePrefixTpl: '',
  linePlacement: 'top',
  lineBgMode: false,
};

Tabs.Panel = Panel;
