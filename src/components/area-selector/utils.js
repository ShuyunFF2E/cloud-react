import { storageKey } from './const';

/**
 * 从子级到父级的遍历, 首先访问子节点，再访问父节点
 * @param {*} data 
 * @param {*} handler 
 * @param {*} path 
 */
export function traverse(data, handler, path = []) {
    if (!data) return null;
    return data.map(item => {
        const { children } = item;
        const newPath = [item, ...path];

        const newChildren = Array.isArray(children) ? traverse(children, handler, newPath) : undefined;
        
        // 1. item.children = newChildren; // eslint-disable-line
        // 2. {...item, children: newChildren}
        // 前者遍历结束平均需要7ms， 后者遍历结束平均需要20ms。
        const newItem = handler({ ...item, children: newChildren }, newPath) || item;
        return newItem;
    });
}


/**
 * 从父级到子级的遍历，首先访问父节点，再访问子节点
 * @param {*} data 
 * @param {*} handler 
 * @param {*} path 
 */
export function traverseReverse(data, handler, path = []) {
    if (!data) return null;
    return data.map(item => {
        const { children } = item;
        const newPath = [item, ...path];
        const newItem = handler(item, newPath) || item;
        return Array.isArray(children) ? traverseReverse(children, handler, newPath) : newItem;
    });
}

/**
 * 通过path生成PathStr， 例如 [{id:1, name: '陕西省'}, {id:10, name: '西安市'}] => '陕西省 > 西安市'
 * @param {} path 
 */
export function path2PathStr(path) {
    let pathStr = path.reduceRight((rs, item) => {
        return `${rs}>${item.name}`;
    }, '');
    pathStr = pathStr.slice(1); // 移除第一个“>”
    return pathStr;
}


/**
 * 生成id与path的映射关系， { id: path }
 * @param {} data 
 */
export function genPathMap(data) {
    const rs = {};
    traverseReverse(data, (it, path) => {
        rs[it.id] = path;
    });
    return rs;
}


/**
 * 处理源数据，生成新的数据源以及相关对象
 */
export function genNewSource(source, item, checked, pathMap) {

    // 记录父级节点，用于合并/拆分
    const extraList = []; // 记录需要【合并】的结点
    const splitList = []; // 记录需要被切分的节点（移除）

    const targetPath = pathMap[item.id];

    const newSource = traverse(source, node => {
        if (item.id === node.id) {
            const { children } = node;

            // 1. 处理目标
            const rs = { ...node, checked, indeterminate: undefined };
            if (children) {
                // 2. 处理子级关联
                rs.children = traverse(children, child => ({ ...child, checked, indeterminate: undefined }))
            }
            return rs;
        }

        // 3. 处理父级， slice(1) 表示去除当前点击的结点，只处理传播路径上的父结点
        if (targetPath && targetPath.slice(1).find(path => path.id === node.id)) {
            
            const { children } = node;

            // 如何处理父级的选中？？
            // 1） 至少有一个子级是checked:true或者indeterminate:true, 且不是全部checked: true，则父级设置 indeterminate：true
            // 2） 全部未选中，父级设置 checked: false
            // 3） 全部选中，父级设置 checked: true

            // 如何处理合并
            // 记录每一次选中时的项目，当所有子级被选中时【合并】; 合并的状态下，当有一个子项目不被选中时【拆分】；

            const allUnChecked = children.every(child => !child.checked); // 全部未选中
            const allChecked = children.every(child => child.checked); // 全部选中
            const someChecked = children.some(child => child.checked || child.indeterminate); // 部分选中或者indeterminate

            if (someChecked && !allChecked) {
                // 合并/拆分使用
                const tmp = node.children.filter(child => child.checked);
                extraList.push(...tmp);

                // 需要被拆分的节点
                splitList.push(node);

                // 设置状态
                return { ...node, indeterminate: true, checked: undefined };
            }

            if (allUnChecked) {
                return { ...node, indeterminate: undefined, checked: false };
            }

            if (allChecked) {
                extraList.push(node);
                return { ...node, indeterminate: undefined, checked: true }
            }
        }

        return node;
    });

    return { newSource, extraList, splitList };
}


export function genSelctedCount(source) {
    // 记录省市区被选中的个数
    const selectedCount = [0, 0, 0]; // [province, city, county]

    // 正向遍历，保证父级最先出现
    traverse(source, (node, path) => {
        const { checked, indeterminate } = node;
        if (checked || indeterminate) {
            selectedCount[path.length - 1] += 1;
        }
    });

    const [ province, city, county ] = selectedCount;
    return { province, city, county };
}


/**
 * 获取缓存的地址数据
 */
export function getStorageData(platform) {
    const key = storageKey[platform];
    try {
        const resultStr = localStorage.getItem(key);
        return JSON.parse(resultStr);
    } catch (error) {
        return null; // 异常时需要重新获取数据
    }
}

/**
 * 保存数据到缓存
 */
export function setStorageData(platform, data) {
    const key = storageKey[platform];
    localStorage.setItem(key, JSON.stringify(data));    
}
