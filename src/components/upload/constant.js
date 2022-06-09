import { prefixCls } from '@utils';

export const TYPE = {
  PICTURE: 'picture',
  DEFAULT: 'button',
};

export const PREFIX = `${prefixCls}-upload`;

const FILE_TYPE_ICONS = {
  csv: 'CSV',
  video: 'video',
  pdf: 'PDF',
  ppt: 'PPT',
  txt: 'TXT',
  doc: 'DOC',
  zip: 'ZIP',
  xls: 'XLS',
};

const PIC_TYPES = [
  'jpg',
  'jpeg',
  'png',
  'gif',
];

export const getFileTypeIcon = (file = {}) => {
  const { name = '' } = file;
  const _names = name.split('.');
  const type = _names[_names.length - 1];

  if (PIC_TYPES.includes(type)) {
    return 'pic';
  }

  if (FILE_TYPE_ICONS[type]) {
    return FILE_TYPE_ICONS[type];
  }

  return 'mr';
};
