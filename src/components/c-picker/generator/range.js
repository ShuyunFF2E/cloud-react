import * as React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { RangePicker as RCRangePicker } from 'rc-picker';
import defaultLocale from '../../../locale/zh_CN';
import { prefixCls as rootPrefixCls } from '../../../utils';
import Icon from '../../icon';
import components from './components';
import { getTimeProps, transformValue2Moment } from './utils';

export default function generateRangePicker(generateConfig) {
  function getRangePicker(picker, displayName) {
    class RangePicker extends React.Component {
      pickerRef = React.createRef();

      constructor(props) {
        super(props);
        moment.locale('zh-cn', { week: { dow: 1 } });
      }

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
          placeholder: _placeholder,
          presets = [],
          type = picker,
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

        const placeholder = typeof _placeholder === 'string'
          ? [_placeholder, _placeholder]
          : _placeholder;

        return (
          <RCRangePicker
            separator={
              <span aria-label="to" className={`${prefixCls}-separator`}>
                至
              </span>
            }
            ref={this.pickerRef}
            placeholder={
              placeholder !== undefined
                ? placeholder
                : defaultLocale.lang[
                  `${picker ? `${picker}R` : 'r'}angePlaceholder${picker !== 'time' && showTime ? 'WithTime' : ''}`
                ]
            }
            suffixIcon={
              picker === 'time' ? (
                <Icon type="time" />
              ) : (
                <Icon type="calendar" />
              )
            }
            clearIcon={<Icon type="close-fill" />}
            prevIcon={<Icon type="left" />}
            nextIcon={<Icon type="right" />}
            superPrevIcon={<Icon type="double-left" />}
            superNextIcon={<Icon type="double-right" />}
            transitionName={`${prefixCls}-slide-up`}
            {...restProps}
            {...additionalOverrideProps}
            {...(picker === 'time' ? {} : { picker: type })}
            presets={presets?.map(({ label, value: vs = [] }) => ({
              label,
              value: () => {
                if (typeof vs === 'function') {
                  return vs()?.map(v => transformValue2Moment(v, format));
                }
                return vs?.map(v => transformValue2Moment(v, format));
              },
            }))}
            ranges={null}
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
