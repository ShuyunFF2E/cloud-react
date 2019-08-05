import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import Icon from '../icon';

export default class SubMenu extends PureComponent {

    static propTypes = {
        title: PropTypes.node,
        internalKey: PropTypes.string,
        path: PropTypes.array,
        indent: PropTypes.number,
        opened: PropTypes.bool,
        onMenuToggle: PropTypes.func
    };

    static defaultProps = {
        title: null,
        internalKey: '',
        path: [],
        indent: 10,
        opened: false,
        onMenuToggle: () => {}
    };

    constructor(props) {
        super(props);
        this.state = {
            opened: props.opened,
            prevProps: props
        };
    }

    static getDerivedStateFromProps(nextProps, state) {
        const { prevProps } = state;
        if (prevProps.opened !== nextProps.opened) {
            return {
                opened: nextProps.opened,
                prevProps: nextProps
            }
        }
        return null;
    }

    handleToggle = () => {
        const { onMenuToggle, internalKey, path } = this.props;
        const { opened } = this.state;
        this.setState({
            opened: !opened
        }, () => {
            onMenuToggle(internalKey, path, !opened);
        });
    }

    renderSubTitle() {
        const { title, path, indent } = this.props;

        const iconType = this.state.opened ? 'up' : 'down';

        const depth = path.length;
        const style = { textIndent: (depth + 1) * indent };

        return (
            <div
                className="menu-group-title"
                style={style}
                onClick={this.handleToggle}>
                {title}
                <Icon type={iconType} className="menu-indicator"></Icon>
            </div>
        );
    }

    render() {
        const { opened } = this.state;
        const subGroupClass = cls('menu-group-sub', { 'collapse': !opened, 'expand': opened });

        return (
            <li className="menu-group">
                {this.renderSubTitle()}
                <ul className={subGroupClass}>
                    { this.props.children }
                </ul>
            </li>
        );
    }
}
