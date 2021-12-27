import React from 'react';
import { SubMenu as RcSubMenu } from 'rc-menu';
import classNames from 'classnames';
import 'rc-menu/assets/index.css';
import {  omit } from '@utils';
import { isValidElement, cloneElement } from './reactNode';


function SubMenu(props) {
    const { icon, title } = props;
    let titleNode;
    console.log(icon, 'icon');
    // if (!icon) {
        titleNode =
        title && typeof title === 'string' ? (
            <div>{title.charAt(0)}</div>
        ) : (
            <span>{title}</span>
        );
    const titleIsSpan = isValidElement(title) && title.type === 'span';
    titleNode = (
    <>
        {cloneElement(icon, {
        className: classNames(
            isValidElement(icon) ? icon.props?.className : '',
        ),
        })}
        {titleIsSpan ? title : <span>{title}</span>}
    </>
    );
// }

    return (
        <RcSubMenu
            {...omit(props, ['icon'])}
            title={titleNode}
        />
    );
}

export default SubMenu;
