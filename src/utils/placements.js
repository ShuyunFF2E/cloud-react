const autoAdjustOverflowEnabled = {
  adjustX: 1,
  adjustY: 1,
};

const autoAdjustOverflowDisabled = {
  adjustX: 0,
  adjustY: 0,
};

const targetOffset = [ 0, 0 ];

export function getOverflowOptions(autoAdjustOverflow) {
  if (typeof autoAdjustOverflow === 'boolean') {
    return autoAdjustOverflow
      ? autoAdjustOverflowEnabled
      : autoAdjustOverflowDisabled;
  }
  return {
    ...autoAdjustOverflowDisabled,
    ...autoAdjustOverflow,
  };
}

export default function getPlacements(config) {
  const {
    arrowWidth = 4,
    horizontalArrowShift = 16,
    verticalArrowShift = 8,
    autoAdjustOverflow,
    arrowPointAtCenter,
  } = config;
  const offsetArrowWidth = 8;
  const arrowPointAtCenterPlacementMap = {
    left: {
      points: [ 'cr', 'cl' ],
      offset: [ -offsetArrowWidth, 0 ],
    },
    right: {
      points: [ 'cl', 'cr' ],
      offset: [ offsetArrowWidth, 0 ],
    },
    top: {
      points: [ 'bc', 'tc' ],
      offset: [ 0, -offsetArrowWidth ],
    },
    bottom: {
      points: [ 'tc', 'bc' ],
      offset: [ 0, offsetArrowWidth ],
    },
    topLeft: {
      points: [ 'bl', 'tc' ],
      offset: [ -(horizontalArrowShift + arrowWidth), -offsetArrowWidth ],
    },
    leftTop: {
      points: [ 'tr', 'cl' ],
      offset: [ -offsetArrowWidth, -(verticalArrowShift + arrowWidth) ],
    },
    topRight: {
      points: [ 'br', 'tc' ],
      offset: [ horizontalArrowShift + arrowWidth, -offsetArrowWidth ],
    },
    rightTop: {
      points: [ 'tl', 'cr' ],
      offset: [ offsetArrowWidth, -(verticalArrowShift + arrowWidth) ],
    },
    bottomRight: {
      points: [ 'tr', 'bc' ],
      offset: [ horizontalArrowShift + arrowWidth, offsetArrowWidth ],
    },
    rightBottom: {
      points: [ 'bl', 'cr' ],
      offset: [ offsetArrowWidth, verticalArrowShift + arrowWidth ],
    },
    bottomLeft: {
      points: [ 'tl', 'bc' ],
      offset: [ -(horizontalArrowShift + arrowWidth), offsetArrowWidth ],
    },
    leftBottom: {
      points: [ 'br', 'cl' ],
      offset: [ -offsetArrowWidth, verticalArrowShift + arrowWidth ],
    },
  };
  const placementMap = {
    left: {
      points: [ 'cr', 'cl' ],
      offset: [ -offsetArrowWidth, 0 ],
    },
    right: {
      points: [ 'cl', 'cr' ],
      offset: [ offsetArrowWidth, 0 ],
    },
    top: {
      points: [ 'bc', 'tc' ],
      offset: [ 0, -offsetArrowWidth ],
    },
    bottom: {
      points: [ 'tc', 'bc' ],
      offset: [ 0, offsetArrowWidth ],
    },
    topLeft: {
      points: [ 'bl', 'tl' ],
      offset: [ 0, -offsetArrowWidth ],
    },
    leftTop: {
      points: [ 'tr', 'tl' ],
      offset: [ -offsetArrowWidth, 0 ],
    },
    topRight: {
      points: [ 'br', 'tr' ],
      offset: [ 0, -offsetArrowWidth ],
    },
    rightTop: {
      points: [ 'tl', 'tr' ],
      offset: [ offsetArrowWidth, 0 ],
    },
    bottomRight: {
      points: [ 'tr', 'br' ],
      offset: [ 0, offsetArrowWidth ],
    },
    rightBottom: {
      points: [ 'bl', 'br' ],
      offset: [ offsetArrowWidth, 0 ],
    },
    bottomLeft: {
      points: [ 'tl', 'bl' ],
      offset: [ 0, offsetArrowWidth ],
    },
    leftBottom: {
      points: [ 'br', 'bl' ],
      offset: [ -offsetArrowWidth, 0 ],
    },
  };
  Object.keys(placementMap).forEach((key) => {
    placementMap[key] = arrowPointAtCenter
      ? {
        ...arrowPointAtCenterPlacementMap[key],
        overflow: getOverflowOptions(autoAdjustOverflow),
        targetOffset,
      }
      : {
        ...placementMap[key],
        targetOffset,
        overflow: getOverflowOptions(autoAdjustOverflow),
      };

    placementMap[key].ignoreShake = true;
  });
  return placementMap;
}
