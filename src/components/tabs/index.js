import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { prefixCls } from '@utils/config';

import IconRaw from '../icon';

import './index.less';

const Icon = React.memo(IconRaw);

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
        style: PropTypes.object
    }

    static defaultProps = {
        defaultActiveKey: '',
        activeKey: '',
        activeClassName: 'active',
        type: 'card',
        className: '',
        mode: 'reset',
        style: {},
        onChange: () => {},
        onClose: () => {}
    }

    constructor(props) {
        super(props);
        const { defaultActiveKey, activeKey, children } = props;

        const childList = Array.isArray(children) ? children : [children];
        const activedKey = activeKey || defaultActiveKey || childList[0].key;

        this.state = {
            activedKey,
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
            return { activedKey: nextProps.activeKey, prevProps: nextProps };
        }
        return null;
    }

    componentDidMount() {
        if (this.hasLineBar) this.countLineBarStyle();
    }

    componentDidUpdate() {
        if (this.hasLineBar) this.countLineBarStyle();
    }

    countLineBarStyle = () => {
        const activeEle = this.tabsRef.current.getElementsByClassName(this.props.activeClassName)[0];
        const { offsetWidth, offsetLeft } = activeEle;
        Object.assign(this.activeBarRef.current.style, {
            width: `${offsetWidth}px`,
            left: `${offsetLeft}px`
        })
    }

    get hasLineBar() {
        return this.props.type === 'line';
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

    render() {
        const { children, className, mode, type } = this.props;
        const { activedKey } = this.state;

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
        return (
            <div className={finalClassName} style={this.props.style}>
                <section className={cls(`${prefixCls}-tabs-header-${type}`)} ref={this.tabsRef}>
                    {headers}
                    {
                        this.hasLineBar &&
                        <div className={`${prefixCls}-tabs-item-bar`} ref={this.activeBarRef} />
                    }
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
