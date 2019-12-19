import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { prefixCls } from '@utils/config';

import IconRaw from '../icon';

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
        step: PropTypes.number
    }

    static defaultProps = {
        defaultActiveKey: '',
        activeKey: '',
        activeClassName: 'active',
        type: 'card',
        className: '',
        mode: 'reset',
        style: {},
        step: 0,
        onChange: () => {},
        onClose: () => {}
    }

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
            prevProps: props
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
        if ((prevProps.activeKey !== nextProps.activeKey) ||
            (prevProps.activeKey === nextProps.activeKey && prevChildCount !== nextChildCount)) {
            return {
                activedKey: nextProps.activeKey,
                prevProps: nextProps,
                prevChildCount,
                childCount: nextChildCount
            };
        }
        if (prevChildCount !== nextChildCount) {
            return { prevChildCount, childCount: nextChildCount };
        }
        return null;
    }

    componentDidMount() {
        this.initTabsItems();
        if (this.hasLineBar) this.countLineBarStyle();
    }

    componentDidUpdate() {
        const { state: { prevChildCount, childCount }, hasLineBar, itemsMaxLeft } = this;
        if (prevChildCount !== childCount) {
            this.countMore();
            this.tabsRef.current.style.left = itemsMaxLeft;
            this.childCount = childCount;
        };
        if (hasLineBar) this.countLineBarStyle();       
    }

    set childCount(count) {
        this.setState({
            prevChildCount: count
        });
    }

    get hasLineBar() {
        return this.props.type === 'line';
    }

    get activeEle() {
        return this.tabsRef.current.getElementsByClassName(this.props.activeClassName)[0];
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
        return -tabsOffsetLeft + CONTAINER_PADDING + tabsOffsetWidth >= tabsScrollWidth;
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
            const { offsetWidth, offsetLeft } = this.activeEle;
            const { tabsOffsetLeft, itemsMaxLeft } = this;
            if (offsetLeft + offsetWidth >= tabsOffsetWidth - CONTAINER_PADDING * 2 + -tabsOffsetLeft) {
                const max = parseFloat(itemsMaxLeft) - CONTAINER_PADDING * 2;
                const left = offsetLeft > -max ? max : -offsetLeft;
                this.tabsRef.current.style.left = `${left}px`;
            }
        }
        this.setState({ hasMore });
    }

    countTabsItemsStyle = isNext => {
        if (isNext) {
            this.tabsRef.current.style.left = this.itemsNextLeft;
        } else {
            this.tabsRef.current.style.left = this.itemsPrevLeft;
        }
        if (this.hasLineBar) this.countLineBarStyle();
    }

    countMore = () => {
        const { tabsScrollWidth, tabsOffsetWidth } = this;
        this.setState({
            hasMore: tabsScrollWidth > tabsOffsetWidth
        });
    }

    countLineBarStyle = () => {
        const { offsetWidth, offsetLeft } = this.activeEle;
        Object.assign(this.activeBarRef.current.style, {
            width: `${offsetWidth}px`,
            left: `${offsetLeft}px`
        })
    }

    handleChange = key => () => {
        const { activedKey } = this.state;
        if (key === activedKey) { return; }  // change event, not click event

        this.setState({
            activedKey: key
        }, () => {
            this.props.onChange(key);
        });
    }

    handleClose = key => () => {
        this.props.onClose(key);
    }

    handleTabsPrev = () => {
        if (!this.tabsPrevDisabled) this.countTabsItemsStyle(false);
    }

    handleTabsNext = () => {
        if (!this.tabsNextDisabled) this.countTabsItemsStyle(true);
    }

    renderTabHeader(child, isActived) {
        const { type, activeClassName } = this.props;
        const { disabled, closable, tab } = child.props;
        const { key } = child;

        // class & style
        const className = cls(`${prefixCls}-tabs-item-${type}`, { [activeClassName]: !disabled && isActived, disabled });

        // render
        return (
            <span className={className} onClick={this.handleChange(key)} key={key}>
                {tab}
                {
                    isActived && closable &&
                    <span className="closable-wrapper">
                        <Icon type="close" className="closable" onClick={this.handleClose(key)}/>
                    </span>
                }
            </span>
        );
    }

    renderMoreIcon = () => {
        if (!this.state.hasMore) return null;
        const { type } = this.props;

        return (
            <>
                <span className={`${prefixCls}-tabs-more-icon-${type} before`} onClick={this.handleTabsPrev}>
                    <Icon type="left" className="icon" />
                </span>
                <span className={`${prefixCls}-tabs-more-icon-${type} after`} onClick={this.handleTabsNext}>
                    <Icon type="right" className="icon" />
                </span>
            </>
        )
    }

    render() {
        const { children, className, mode, type } = this.props;
        const { activedKey, hasMore } = this.state;

        const headers = [];
        let panel = [];

        Children.forEach(children, child => {
            const isActived = child.key === activedKey;
            headers.push(this.renderTabHeader(child, isActived));

            // 处理panel
            if (mode === 'remain') {
                // const style = { ...child.props.style, display: isActived ? 'block' : 'none' };
                const style = isActived ? child.props.style : { ...child.props.style, display: 'none' };
                const target = React.cloneElement(child, { style });
                panel.push(target);
            } else if (isActived) {
                panel = child;
            }
        });

        const finalClassName = cls(`${prefixCls}-tabs`, className);
        const headerClassName = cls(`${prefixCls}-tabs-header-${type}`, {
            [`${prefixCls}-tabs-header-more`]: hasMore
        })
        return (
            <div className={finalClassName} style={this.props.style}>
                <section className={headerClassName}>
                    { this.renderMoreIcon() }
                    <div className={`${prefixCls}-tabs-items`}>
                        <div className={`${prefixCls}-tabs-items-scroll`} ref={this.tabsRef}>
                            { headers }
                            {
                                this.hasLineBar &&
                                <div className={`${prefixCls}-tabs-item-bar`} ref={this.activeBarRef} />
                            }
                        </div>
                    </div>
                </section>
                {panel}
            </div>
        );
    }
}

const Panel = React.memo(props => {
    const finalClassName = cls(`${prefixCls}-tabpanel-container`, props.className);
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
    className: PropTypes.string,
    style: PropTypes.object
};

Panel.defaultProps = {
    disabled: false,
    closable: false,
    className: '',
    style: {}
};

Tabs.Panel = Panel;
