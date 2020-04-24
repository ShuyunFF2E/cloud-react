import React from 'react';
import classnames from 'classnames';
import Icon from '../../icon';
import { enumObj } from '../constant';

const style = {
	fontSize: '16px',
	verticalAlign: 'middle'
};

export const ArrowLeft = props => {
	const classes = classnames('arrow-left', {
		'arrow-disabled': props.disabled
	});

	return (
		<span className={classes} onClick={() => props.onClick(enumObj.LEFT)}>
			<Icon type="left" style={style} />
		</span>
	);
};

export const ArrowRight = props => {
	const classes = classnames('arrow-right', {
		'arrow-disabled': props.disabled
	});

	return (
		<span className={classes} onClick={() => props.onClick(enumObj.RIGHT)}>
			<Icon type="right" style={style} />
		</span>
	);
};
