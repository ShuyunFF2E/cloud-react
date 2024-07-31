import React, { useCallback } from 'react';
import Checkbox from '../checkbox';
import Icon from '../icon';

function PanelContent({
  filteredData,
  checked,
  labelProp,
  keyProp,
  disabledProp,
  isSingle,
  showRemove,
  classSelector,
  disabled,
  ...restProps
}) {
  const handleGroupChange = useCallback(
    (val) => {
      if (disabled) {
        return;
      }
      restProps.onChange(val);
    },
    [ restProps.onChange ],
  );

  const onChange = useCallback(
    (val) => {
      if (!restProps.onChange || disabled) {
        return;
      }
      restProps.onChange([ val ]);
    },
    [ restProps.onChange ],
  );

  const onRemove = useCallback(
    (item) => {
      if (disabled) {
        return;
      }
      restProps?.onRemove([ item ]);
    },
    [ filteredData, restProps.onChange ],
  );

  const renderSingle = () => filteredData.map((item) => (
    <div
      className={`${classSelector}-single-item`}
      key={item[keyProp]}
      disabled={item[disabledProp]}
      value={item[keyProp]}
      onClick={() => onChange(item[keyProp])}
    >
      <span>{item[labelProp]}</span>
      {showRemove && (
        <Icon
          className={`${classSelector}-single-item-remove`}
          type="close-fill-1"
          style={{ fontSize: '14px' }}
          onClick={() => onRemove(item[keyProp])}
        />
      )}
    </div>
  ));

  const renderCheckGroup = () => (
    <Checkbox.Group
      value={checked}
      onChange={handleGroupChange}
      layout="v"
      disabled={disabled}
    >
      {filteredData.map((item) => (
        <Checkbox
          key={item[keyProp]}
          disabled={item[disabledProp]}
          value={item[keyProp]}
        >
          {item[labelProp]}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );

  return <>{isSingle ? renderSingle() : renderCheckGroup()}</>;
}

export default PanelContent;
