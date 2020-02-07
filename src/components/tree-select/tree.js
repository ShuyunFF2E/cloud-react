import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import Tree from '../tree';
import Button from '../button';
import { selector } from './const';

import './index.less';

const ConfirmBtn = ({ onOk, onCancel, okBtnText, cancelBtnText }) => {
    return (
        <div className={`${selector}-operate-btn`}>
            <Button type="primary" size="small" className="btn" onClick={onOk}>{ okBtnText }</Button>
            <Button size="small" className="btn" onClick={onCancel}>{ cancelBtnText }</Button>
        </div>
    )
}

class TreeContainer extends React.Component {

    selectNode = (node, selectedNodes) => {
        this.props.onChange(node, selectedNodes);
    }

    render() {
        const { dataSource, multiple, searchable, hasConfirmButton, okBtnText, cancelBtnText, onOk, onCancel, ...otherProps } = this.props;
        const classNames = cls(`${selector}-options`, {
            [`${selector}-options-confirm`]: hasConfirmButton
        });
        return (
            <div className={classNames}>
                <Tree
                    {...otherProps}
                    onSelectedNode={this.selectNode}
                    treeData={dataSource}
                    supportSearch={searchable}
                    supportCheckbox={multiple} />
                {
                    hasConfirmButton &&
                    <ConfirmBtn
                        onOk={onOk}
                        onCancel={onCancel}
                        okBtnText={okBtnText}
                        cancelBtnText={cancelBtnText} />
                }
            </div>
        )
    }
}

TreeContainer.propTypes = {
    dataSource: PropTypes.array,
    multiple: PropTypes.bool,
	searchable: PropTypes.bool,
    hasConfirmButton: PropTypes.bool,
	okBtnText: PropTypes.string,
	cancelBtnText: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
}

TreeContainer.defaultProps = {
    dataSource: [],
    multiple: false,
	searchable: false,
    hasConfirmButton: false,
	okBtnText: '',
	cancelBtnText: '',
    onOk: () => {},
    onCancel: () => {},
}

export default TreeContainer;
