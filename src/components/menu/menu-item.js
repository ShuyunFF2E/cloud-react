import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { noop } from '@utils';

import MenuContext, { types } from './context';

export default class MenuItem extends PureComponent {
  static contextType = MenuContext;

  static propTypes = {
    internalKey: PropTypes.string,
    type: PropTypes.string,
    path: PropTypes.array,
    indent: PropTypes.number,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    internalKey: '',
    type: types.COMMON,
    path: [],
    indent: 10,
    selected: false,
    onClick: noop,
  };

  handleClick = () => {
    const { onClick, path, internalKey } = this.props;
    this.context.changeSelectedKeys(internalKey);
    onClick(internalKey, path);
  };

  render() {
    const { path, type, internalKey, selected, children, indent } = this.props;

    const depth = path.length;
    const style = { textIndent: (depth + 1) * indent };

    const className = cls('item', { active: selected });

    if (type === types.LINK) {
      const targetLink = internalKey.startsWith('#') ? internalKey : `#${internalKey}`;
      return (
        <a href={targetLink}>
          <li className={className} style={style} onClick={this.handleClick} role="menuitem">
            {children}
          </li>
        </a>
      );
    }

    return (
      <li className={className} style={style} onClick={this.handleClick} role="menuitem">
        {children}
      </li>
    );
  }
}
