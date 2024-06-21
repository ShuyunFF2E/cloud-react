import React from 'react';

export function highlightKeyword(str, lowerKeyword, prefixCls) {
  const cells = str
    .toLowerCase()
    .split(lowerKeyword)
    .reduce(
      (list, cur, index) => index === 0 ? [cur] : [...list, lowerKeyword, cur],
      [],
    );
  const fillCells = [];
  let start = 0;

  cells.forEach((cell, index) => {
    const end = start + cell.length;
    let originWorld = str.slice(start, end);
    start = end;

    if (index % 2 === 1) {
      originWorld = (
        <span
          className={`${prefixCls}-menu-item-keyword`}
          // eslint-disable-next-line react/no-array-index-key
          key={`seperator-${index}`}
        >
          {originWorld}
        </span>
      );
    }

    fillCells.push(originWorld);
  });

  return fillCells;
}

export const defaultSearchRender = (
  inputValue,
  path,
  prefixCls,
  fieldNames,
) => {
  const optionList = [];

  // We do lower here to save perf
  const lower = inputValue.toLowerCase();

  path.forEach((node, index) => {
    if (index !== 0) {
      optionList.push(' / ');
    }

    let label = node[fieldNames.label];
    const type = typeof label;
    if (type === 'string' || type === 'number') {
      label = highlightKeyword(String(label), lower, prefixCls);
    }

    optionList.push(label);
  });
  return optionList;
};

export const defaultLoadingRender = (prefixCls) => (
  <span className={`${prefixCls}-loading-spin`} />
);

export function DefaultRenderEmpty({ prefixCls }) {
  return (
    <div className={`${prefixCls}-empty`}>
      <img
        src="https://brand-guide.shuyun.com/IAM/276d125f58c2.png"
        alt="缺省"
      />
      暂无数据
    </div>
  );
}

export const ALL_VALUE = 'ALL';
