import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { formatThousands, isVoid } from '../util';

export default function NumberTpl({
  value,
  precision = 0,
  isThousands = true,
  prefix = '',
  suffix = '',
}) {
  const [resolvedValue, setResolvedValue] = useState(value);

  const getNumberVal = useCallback(() => {
    let number = value;
    if (isVoid(number)) {
      return '';
    }
    if (precision > 0) {
      number = Number(number).toFixed(precision);
    }
    if (isThousands) {
      number = formatThousands(number);
    }
    return `${prefix || ''}${number}${suffix || ''}`;
  }, [value, precision, isThousands, prefix, suffix]);

  useEffect(() => {
    setResolvedValue(getNumberVal());
  }, [getNumberVal]);

  return resolvedValue || '-';
}

NumberTpl.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  precision: PropTypes.number, // 小数位数
  isThousands: PropTypes.bool, // 是否使用千分位格式
  prefix: PropTypes.string, // 前缀
  suffix: PropTypes.string, // 后缀
};

NumberTpl.defaultProps = {
  precision: 0,
  isThousands: true,
  prefix: '',
  suffix: '',
};
