import * as React from 'react';
import classNames from 'classnames';
import RCPicker from 'rc-picker';
import { prefixCls as rootPrefixCls } from '../../../utils';
import Icon from '../../icon';
import components from './components';
import { getTimeProps } from './utils';

const defaultLocale = {
  locale: 'zh_CN',
  today: '今天',
  now: '此刻',
  backToToday: '返回今天',
  ok: '确定',
  timeSelect: '选择时间',
  dateSelect: '选择日期',
  weekSelect: '选择周',
  clear: '清除',
  month: '月',
  year: '年',
  previousMonth: '上个月 (翻页上键)',
  nextMonth: '下个月 (翻页下键)',
  monthSelect: '选择月份',
  yearSelect: '选择年份',
  decadeSelect: '选择年代',
  yearFormat: 'YYYY年',
  dayFormat: 'D日',
  dateFormat: 'YYYY年M月D日',
  dateTimeFormat: 'YYYY年M月D日 HH时mm分ss秒',
  previousYear: '上一年 (Control键加左方向键)',
  nextYear: '下一年 (Control键加右方向键)',
  previousDecade: '上一年代',
  nextDecade: '下一年代',
  previousCentury: '上一世纪',
  nextCentury: '下一世纪',
};

const defaultPlaceholders = {};

export default function generateSinglePicker(generateConfig) {
  function getPicker(picker, displayName) {
    class Picker extends React.Component {
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

        const additionalProps = {
          showToday: true,
        };

        let additionalOverrideProps = {};
        if (picker) {
          additionalOverrideProps.picker = picker;
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
                : defaultPlaceholders[mergedPicker]
            }
            suffixIcon={
              mergedPicker === 'time' ? (
                <Icon type="close" />
              ) : (
                <Icon type="calendar" />
              )
            }
            clearIcon={<Icon type="close-circle-solid" />}
            prevIcon={<span className={`${prefixCls}-prev-icon`} />}
            nextIcon={<span className={`${prefixCls}-next-icon`} />}
            superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
            superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
            allowClear
            transitionName={`${rootPrefixCls}-slide-up`}
            {...additionalProps}
            {...restProps}
            {...additionalOverrideProps}
            locale={defaultLocale}
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
