const getCollapsedHeight = () => ({ height: 0, opacity: 0, marginTop: '-4px' });
const getRealHeight = node => ({ height: node.scrollHeight, opacity: 1 });
const getCurrentHeight = node => ({ height: node.offsetHeight });
const skipOpacityTransition = (_, event) =>
  event?.deadline === true || (event).propertyName === 'height';

const collapseMotion = {
  motionName: 'motion-collapse',
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getRealHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onAppearEnd: skipOpacityTransition,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500,
};

export default collapseMotion;
