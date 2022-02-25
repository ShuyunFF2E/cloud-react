import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixCls } from '@utils';

import './index.less';

// const sizeMap = {
//   small: 13,
//   large: 23,
//   default: 18,
// };

const animationStyle = {
  small: { width: '12px', height: '10px' },
  default: { width: '12px', height: '16px' },
  large: { width: '18px', height: '22px' },
};

const itemWidth = {
  small: '2px',
  default: '2px',
  large: '3px',
};

const selector = `${prefixCls}-loading`;

function SvgLoading(props) {
  const { size, tip, layer } = props;
  const loadingType = classNames(`${selector}-container`, {
    [`${selector}-layer`]: layer,
  });
  const loadingAnimation = classNames(
    `${selector}-animation`,
    `${selector}-animation-${size}`,
    {
      [`${selector}-tip-animation`]: tip,
    },
  );
  return (
    <div className={loadingType}>
      {/* 圆环 */}
      {/* <div className={loadingAnimation}> */}
      {/*	<svg className="circular" viewBox="25 25 50 50"> */}
      {/*		<circle className="path" cx="50" cy="50" r={sizeMap[size]} /> */}
      {/*	</svg> */}
      {/* </div> */}

      {/* 脉冲 */}
      <div className={loadingAnimation} style={animationStyle[size]}>
        <span style={{ width: itemWidth[size] }} />
        <span style={{ width: itemWidth[size] }} />
        <span style={{ width: itemWidth[size] }} />
      </div>
      {tip && <div className={classNames(`${selector}-text`)}>{tip}</div>}
    </div>
  );
}

class Loading extends Component {
  timer = null;

  constructor(props) {
    super(props);
    this.state = {
      delayShow: true,
    };
  }

  updateShowStatus() {
    const { delay, loading } = this.props;
    if (loading) {
      this.timer = setTimeout(() => {
        this.setState({ delayShow: true });
      }, delay);
    } else {
      this.setState({ delayShow: false });
    }
  }

  componentDidMount() {
    if (this.props.delay > 0) {
      this.updateShowStatus();
    }
  }

  componentDidUpdate(prevProps) {
    const { delay, loading } = this.props;
    if (delay > 0 && prevProps.loading !== loading) {
      this.updateShowStatus();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { loading, layer, size, tip, children, className, style } = this.props;
    const classes = classNames(selector, className);

    const { delayShow } = this.state;

    return children ? (
      <div className={classes} style={style}>
        {children}
        {loading && delayShow && (
          <SvgLoading size={size} tip={tip} layer={layer} />
        )}
      </div>
    ) : (
      loading && delayShow && (
        <div className={classes} style={style}>
          <SvgLoading size={size} tip={tip} layer={layer} />
        </div>
      )
    );
  }
}

Loading.propTypes = {
  loading: PropTypes.bool,
  layer: PropTypes.bool,
  size: PropTypes.oneOf(['default', 'small', 'large']),
  tip: PropTypes.string,
  delay: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
};

Loading.defaultProps = {
  loading: true,
  layer: false,
  size: 'default',
  tip: '',
  delay: 0,
  className: '',
  style: {}
};

export default Loading;
