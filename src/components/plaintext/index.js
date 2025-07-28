import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, prefixCls } from '@utils';
import Icon from '../icon';

import './index.less';

const selector = `${prefixCls}-plaintext`;

export default class Plaintext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.isPlain,
    };
  }

  handleViewPlainClick = () => {
    this.setState({
      status: true,
    });
    this.props.onViewPlainClick();
  };

  handleViewSecretClick = () => {
    this.setState({
      status: false,
    });
    this.props.onViewSecretClick();
  };

  render() {
    const { text } = this.props;
    const { status } = this.state;

    return (
      <div className={selector}>
        {status && <Icon type="hide" onClick={this.handleViewSecretClick} />}
        {!status && <Icon type="view" onClick={this.handleViewPlainClick} />}
        <span>{text}</span>
      </div>
    );
  }
}

Plaintext.propTypes = {
  text: PropTypes.string,
  isPlain: PropTypes.bool,
  onViewPlainClick: PropTypes.func,
  onViewSecretClick: PropTypes.func,
};

Plaintext.defaultProps = {
  text: '',
  isPlain: false,
  onViewPlainClick: noop,
  onViewSecretClick: noop,
};
