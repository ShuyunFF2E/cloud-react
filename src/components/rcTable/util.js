// import { useState, useEffect } from 'react';

/**
 * 如果 ajaxData 是数组，则返回 ajaxData；如果 ajaxData 是函数，则返回 ajaxData() 执行后的结果
 * @param ajaxData
 * @param params 表格组件透出的一些参数
 * @returns {*[]|*}
 */
// eslint-disable-next-line import/prefer-default-export
export function getDataSource(ajaxData, params) {
	if (Array.isArray(ajaxData)) {
		return ajaxData;
	}
	if (typeof ajaxData === 'function') {
		return ajaxData(params);
	}
	return [];
}
