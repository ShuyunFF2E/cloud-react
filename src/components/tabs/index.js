import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import clz from 'classnames';
import IconRaw from '../icon';

import './index.less';

const types = { TILE: 'tile', CARD: 'card'};
const closeIconStyle = {
    fontSize: 12,
    position: 'absolute',
    // top: -2,
    right: 4
};
const Icon = React.memo(IconRaw);

export default class Tabs extends PureComponent {

    static propTypes = {
        defaultActiveKey: PropTypes.string.isRequired,
        activeKey: PropTypes.string,
        accentColor: PropTypes.string,
        type: PropTypes.string,
        onChange: PropTypes.func,
        onClose: PropTypes.func
    }

    static defaultProps = {
        activeKey: '',
        accentColor: '#0083ba',
        type: types.CARD,
        onChange: () => {},
        onClose: () => {}
    }

    static types = types;

    static shouldChange(prevProps, nextProps) {
        const prevChildCount = React.Children.count(prevProps.children);
        const nextChildCount = React.Children.count(nextProps.children);
    
        // 1. 通过props指定activeKey时，更新state
        // 2. tabpanel的数量发生变化时, 更新state
        if (prevProps.activeKey !== nextProps.activeKey) {
            return true;
        } if (prevChildCount !== nextChildCount) {
            return true;
        }
        return false;
    }

    constructor(props) {
        super(props);
        const { defaultActiveKey } = props;
        // 默认页面
        this.state = {
            activedKey: defaultActiveKey
        };
    }

    componentWillReceiveProps(nextProps) {
        // 外部强制指定props.activeKey时，需要同步内部state
        const prevProps = this.props;

        const shouldChange = Tabs.shouldChange(prevProps, nextProps);
        if (shouldChange) {
            this.setState({ activedKey: nextProps.activeKey });
        }
    }

    handleChange = key => () => {
        const { activedKey } = this.state;
        if (key === activedKey) { return;}  // change event, not click event

         // async
        this.setState({ activedKey: key }, () => {
            const { onChange } = this.props;
            onChange(key);
        });
    }

    handleClose = key => () => {
        const { onClose } = this.props;
        onClose(key);
    }

    renderHeader(child, isActived) {
        const { type, accentColor } = this.props;
        const { disabled, closable, tab } = child.props;
        const { key } = child;

        // class & style
        const className = clz(`tabs_item-${type}`, { 'active': !disabled && isActived, 'disabled': disabled });
        const tileAccentStyle = (type === Tabs.types.TILE && isActived) ? { borderBottomColor: accentColor } : {};

        // render
        /* eslint-disable */
        return <span className={className} onClick={this.handleChange(key)} style={tileAccentStyle} key={key}>
            {
                isActived && closable && 
                <span onClick={this.handleClose(key)}><Icon type="x" style={closeIconStyle}/></span>
            }
            {tab}
        </span>;
    }

    render() {
        const { children } = this.props;
        const { activedKey } = this.state;
        
        const headers = [];
        let panel;
        
        Children.map(children, child => {
            const isActived = child.key === activedKey;
            headers.push(this.renderHeader(child, isActived));
            if (isActived) panel = child;
        });

        return <div className="tabs">
            <section className="tabs-headers">{headers}</section>
            {panel}
        </div>
    }
}

const TabPanel = React.memo(props => {
    return <div className="tabpanel-container">
        {props.children}
    </div>
});

TabPanel.propTypes = {
    tab: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    closable: PropTypes.bool,
};

TabPanel.defaultProps = {
    disabled: false,
    closable: false
}

Tabs.TabPanel = TabPanel;