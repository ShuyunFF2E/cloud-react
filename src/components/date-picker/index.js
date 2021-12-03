// import React from 'react';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker from './generator';
import './index.less';

const DatePicker = generatePicker(momentGenerateConfig);

export default DatePicker;
