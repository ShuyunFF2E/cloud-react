import React from 'react';
import classnames from 'classnames';
import Icon from '../../icon';
import { enumObj } from '../constant';

const style = {
  fontSize: '16px',
  verticalAlign: 'middle',
};

export const ArrowLeft = (props) => {
  const { disabled, onClick } = props;

  const classes = classnames('arrow-left', {
    'arrow-disabled': disabled,
  });

  const handleClick = () => {
    if (!disabled) {
      onClick(enumObj.LEFT);
    }
  };

  return (
    <span className={classes} onClick={handleClick}>
      <Icon type="left" style={style} />
    </span>
  );
};

export const ArrowRight = (props) => {
  const { disabled, onClick } = props;

  const classes = classnames('arrow-right', {
    'arrow-disabled': props.disabled,
  });

  const handleClick = () => {
    if (!disabled) {
      onClick(enumObj.RIGHT);
    }
  };

  return (
    <span className={classes} onClick={handleClick}>
      <Icon type="right" style={style} />
    </span>
  );
};
