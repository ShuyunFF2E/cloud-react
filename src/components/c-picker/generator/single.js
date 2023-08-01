import * as React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import RCPicker from 'rc-picker';
import defaultLocale from '../../../locale/zh_CN';
import { prefixCls as rootPrefixCls } from '../../../utils';
import Icon from '../../icon';
import components from './components';
import { getTimeProps, transformValue2Moment } from './utils';

export default function generateSinglePicker(generateConfig) {
  function getPicker(picker, displayName) {
    class Picker extends React.Component {
      pickerRef = React.createRef();

      constructor(props) {
        super(props);
        moment.locale('zh-cn', {
          week: {
            dow: 1,
            doy: 4,
          },
        });
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
          placeholder,
          locale = defaultLocale.lang,
          presets = [],
          ...restProps
        } = this.props;
        const { format, showTime } = this.props;
        const prefixCls = `${rootPrefixCls}-picker`;

        let additionalOverrideProps = {};
        if (picker) {
          additionalOverrideProps.picker = picker;
        }
        if (format) {
          additionalOverrideProps.format = format;
        }
        const mergedPicker = picker || this.props.picker;

        additionalOverrideProps = {
          ...additionalOverrideProps,
          ...(showTime
            ? getTimeProps({ format, picker: mergedPicker, ...showTime })
            : {}),
          ...(mergedPicker === 'time'
            ? getTimeProps({ format, ...this.props, picker: mergedPicker })
            : {}),
        };

        return (
          <RCPicker
            ref={this.pickerRef}
            placeholder={
              placeholder !== undefined
                ? placeholder
                : defaultLocale.lang[
                    `${mergedPicker ? `${mergedPicker}P` : 'p'}laceholder`
                  ]
            }
            suffixIcon={
              mergedPicker === 'time' ? (
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
            locale={locale}
            presets={presets.map(({ label, value: v }) => {
              let preset = transformValue2Moment(v, format);
              if (typeof v === 'function') {
                preset = () => transformValue2Moment(v(), format);
              }
              return { label, value: preset };
            })}
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
      Picker.displayName = displayName;
    }

    return Picker;
  }

  const DatePicker = getPicker();
  const WeekPicker = getPicker('week', 'WeekPicker');
  const MonthPicker = getPicker('month', 'MonthPicker');
  const YearPicker = getPicker('year', 'YearPicker');
  const TimePicker = getPicker('time', 'TimePicker');
  const QuarterPicker = getPicker('quarter', 'QuarterPicker');

  return {
    DatePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker,
  };
}
