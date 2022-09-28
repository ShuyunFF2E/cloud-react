import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from '@utils';

import Icon from '../icon';
import Tooltip from '../tooltip';
import { TYPE, PREFIX, getFileTypeIcon } from './constant';

const { ColorIcon } = Icon;

const prefix = `${PREFIX}-list`;

const TextItem = ({ item, disabled, onRemove }) => {
  const iconType = getFileTypeIcon(item);
  const { name, status } = item;

  const nameRef = useRef();

  const [ show, setShow ] = useState(false);
  const [ content, setContent ] = useState('');

  useEffect(() => {
    if (nameRef.current) {
      const { width } = nameRef.current.getBoundingClientRect();
      if (width > 270) {
        setShow(true);
        setContent(name);
      }
    }
  }, []);

  useEffect(() => {
    if (status === 'error') {
      setContent('上传失败');
    }
  }, [ item.status ]);

  return (
    <Tooltip content={content} key={item.id}>
      <div key={name} className={`${prefix}-text`}>
        <div className={`${prefix}-text-info`}>
          <div className={`${prefix}-text-info-detail`}>
            {iconType === 'pic' ? (
              <img src={item.url} alt="" />
            ) : (
              <ColorIcon type={iconType} className={`${prefix}-type-icon`} />
            )}
          </div>
          {show ? (
            <span ref={nameRef} style={{ maxWidth: 270 }} className={`${prefix}-text-name ${prefix}-text-${status}`}>{name}</span>
          ) : (
            <span ref={nameRef} className={`${prefix}-text-name ${prefix}-text-${status}`}>{name}</span>
          )}
        </div>
        {!disabled && (
          <Icon
            type="close-fill"
            className={`${prefix}-delete`}
            onClick={() => {
              onRemove(item);
            }}
          />
        )}
      </div>
    </Tooltip>
  );
};

const Text = (props) => {
  const { list, ...otherProps } = props;
  return list.map((item) => <TextItem key={item.id} {...otherProps} item={item} />);
};

const Picture = (props) => {
  const {
    list, hasPreview, disabled, onRemove, onPreview, onReUpload,
  } = props;

  return list.map((item, index) => {
    const classes = classNames(`${prefix}-pic`, {
      [`${prefix}-pic-${item.status}`]: true,
    });
    if (item.status === 'error') {
      return (
        <Tooltip content="上传失败" key={item.id}>
          <div className={classes}>
            <div className={`${prefix}-pic-image`}>
              <img src={item.url} alt="" />
            </div>
            {!disabled && (
              <div className={`${prefix}-pic-icons`}>
                <Icon
                  type="close-fill"
                  className={`${prefix}-delete`}
                  onClick={() => {
                    onRemove(item);
                  }}
                />
              </div>
            )}
          </div>
        </Tooltip>
      );
    }
    return (
      <div key={item.id} className={classes}>
        <div className={`${prefix}-pic-image`}>
          <img src={item.url} alt="" />
        </div>
        <div className={`${prefix}-pic-icons`}>
          {hasPreview && (
            <Icon
              type="view"
              style={{ fontSize: '16px', marginRight: disabled ? 0 : 16 }}
              onClick={() => {
                onPreview(item);
              }}
            />
          )}
          {!disabled && (
            <>
              <Icon
                type="edit"
                style={{ fontSize: '16px' }}
                onClick={() => {
                  onReUpload({ ...item, index });
                }}
              />
              <Icon
                type="close-fill"
                className={`${prefix}-delete`}
                onClick={() => {
                  onRemove(item);
                }}
              />
            </>
          )}
        </div>
      </div>
    );
  });
};

function UploadList(props) {
  const {
    fileList = [], type, hasPreview, disabled, onRemove, onPreview, onReUpload,
  } = props;

  const classes = classNames(`${prefix}`, {
    [`${prefix}-${type}`]: type === TYPE.PICTURE,
    [`${prefix}-${type}-multiple`]: fileList.length > 1,
  });

  return (
    <div className={classes}>
      {type === TYPE.DEFAULT ? (
        <Text disabled={disabled} list={fileList} onRemove={onRemove} />
      ) : (
        <Picture
          disabled={disabled}
          list={fileList}
          hasPreview={hasPreview}
          onRemove={onRemove}
          onPreview={onPreview}
          onReUpload={onReUpload}
        />
      )}
    </div>
  );
}

UploadList.propTypes = {
  fileList: PropTypes.array,
  type: PropTypes.oneOf([ TYPE.PICTURE, TYPE.DEFAULT ]),
  onRemove: PropTypes.func,
};

UploadList.defaultProps = {
  fileList: [],
  type: TYPE.DEFAULT,
  onRemove: noop,
};

export default UploadList;
