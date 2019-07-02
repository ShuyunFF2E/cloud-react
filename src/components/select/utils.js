import jeasy from 'jeasy';

// 将组件children转换成带label|value的对象数组
export default function formatOptionSource(data) {
  const result = [];
  if (jeasy.type(data) === 'object') {
    result.push({ label: data.children, value: data.value });
  }
  return result;
}
