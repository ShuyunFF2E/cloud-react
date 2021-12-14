import * as React from 'react';
import classNames from 'classnames';
import { RangePicker as RCRangePicker } from 'rc-picker';
import { prefixCls as rootPrefixCls } from '../../../utils';
import Icon from '../../icon';
import defaultLocale from '../locales/zh_CN';
import components from './components';
import { getTimeProps } from './utils';

export default function generateRangePicker(generateConfig) {
  function getRangePicker(picker, displayName) {
    class RangePicker extends React.Component {
      pickerRef = React.createRef();

      focus = () => {
        if (this.pickerRef.current) {
          this.pickerRef.current.focus();
        }
      };

      blur = () => {
        if (this.pickerRef.current) {
          this.pickerRef.current.blur();
        }
      };

      render() {
        const {
          className,
          size,
          bordered = true,
          placeholder,
          ...restProps
        } = this.props;
        const { format, showTime } = this.props;
        const prefixCls = `${rootPrefixCls}-picker`;

        let additionalOverrideProps = {};
        if (picker) {
          additionalOverrideProps.picker = picker;
        }

        additionalOverrideProps = {
          ...additionalOverrideProps,
          ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
          ...(picker === 'time'
            ? getTimeProps({ format, ...this.props, picker })
            : {}),
        };

        return (
          <RCRangePicker
            separator={
              <span aria-label="to" className={`${prefixCls}-separator`}>
                ~
              </span>
            }
            ref={this.pickerRef}
            placeholder={
              placeholder !== undefined
                ? placeholder
                : defaultLocale.lang[
                    `${picker ? `${picker}R` : 'r'}angePlaceholder${
                      picker !== 'time' && showTime ? 'WithTime' : ''
                    }`
                  ]
            }
            suffixIcon={
              picker === 'time' ? (
                <Icon type="close" /> // TODO: 换成秒表图标
              ) : (
                <Icon type="calendar" />
              )
            }
            clearIcon={<Icon type="close-circle-solid" />}
            prevIcon={<Icon type="left" />}
            nextIcon={<Icon type="right" />}
            superPrevIcon={<Icon type="double-left" />}
            superNextIcon={<Icon type="double-right" />}
            allowClear
            transitionName={`${prefixCls}-slide-up`}
            {...restProps}
            {...additionalOverrideProps}
            locale={defaultLocale.lang}
            className={classNames(
              {
                [`${prefixCls}-${size}`]: size,
                [`${prefixCls}-borderless`]: !bordered,
              },
              className,
            )}
            prefixCls={prefixCls}
            generateConfig={generateConfig}
            components={components}
          />
        );
      }
    }

    if (displayName) {
      RangePicker.displayName = displayName;
    }

    return RangePicker;
  }

  const DateRangePicker = getRangePicker();
  const TimeRangePicker = getRangePicker('time', 'TimeRangePicker');

  return {
    DateRangePicker,
    TimeRangePicker,
  };
}
