/* eslint-disable */
import ShuyunUtils from 'shuyun-utils';
import { copyData } from './const';

class Store {
  /**
   * 初始化数据
   * @param treeData
   * @param maxLevel
   * @param selectedValue
   * @param isUnfold
   * @param disabled
   * @returns {{length}|*|*[]}
   */
  initData = ({ treeData, maxLevel, selectedValue, isUnfold, disabled }) => {
    // 数据不存在或无数据使时
    if (!treeData || !treeData.length) {
      return [];
    }
    const cloneData = this.onResetData(copyData(treeData));

    // 处理已选中的节点，treeData中存在selectedValue中的值则选中
    const activeNode = selectedValue && selectedValue[0];
    if (activeNode) {
      this.updateNodeById(cloneData, activeNode.id, { isActive: true });
    }

    // 递归向上查找选择
    const upFind = (currentNode) => {
      // 被选节点没有子节点则找到父节点对其进行半选
      Object.assign(currentNode, { indeterminate: true });
      const pNode = this.findNodeById(cloneData, currentNode.pId);
      // 没有父节点则不再查找
      if (pNode) {
        pNode.indeterminate = true;
        // 如果子节点全部选中则父节点选中
        if (pNode.children.every((x) => x.checked)) {
          pNode.checked = true;
        }
        upFind(pNode);
      }
    };

    // 递归向下查找选择
    const downFind = (currentNode) => {
      Object.assign(currentNode, { checked: true });
      // 没有子节点则不再进行查找
      if (!currentNode.children || !currentNode.children.length) {
        return;
      }
      currentNode.children.forEach((son) => {
        Object.assign(son, { checked: true });
        downFind(son);
      });
    };

    // 递归格式化数据
    const format = (node, level) => {
      const { children } = node;
      const tmp = node;
      // 增加层级
      tmp.level = level;

      // 禁用增加数据标识
      if (disabled) {
        tmp.disableAdd = true;
        tmp.disableRename = true;
        tmp.disableRemove = true;
        tmp.disableSelected = true;
      }

      // 增加是否展开标志
      if (isUnfold !== undefined) {
        tmp.isUnfold = isUnfold;
      }

      // 寻找父节点
      const pNode = this.findNodeById(cloneData, tmp.pId);
      // 无父节点则为根节点，默认展开
      if (!pNode && isUnfold !== undefined) {
        tmp.isUnfold = true;
      }

      if (pNode) {
        // 同级第一个节点
        tmp.isFirstChild = pNode.children[0].id === tmp.id;
        // 同级最后一个节点
        tmp.isLastChild = pNode.children[pNode.children?.length - 1].id === tmp.id;

        const index = pNode.children.findIndex(item => item.id === tmp.id);
        if (index > -1 && index <= pNode?.children?.length - 2) {
          // 弟弟节点是否有儿子
          tmp.isSiblingHasChild = pNode?.children?.[index + 1]?.children?.length;
        }
        // 哥哥节点是否有儿子
        if (index > 0) {
          tmp.isPreSilbingHasChild = pNode?.children?.[index - 1]?.children?.length;
        }

        const ppNode = this.findNodeById(cloneData, pNode.pId);
        if (ppNode) {
          // 父结点是否是最后一个节点
          tmp.isParentLastChild = ppNode?.children?.[ppNode.children?.length - 1]?.id === pNode?.id;

          const index1 = ppNode.children.findIndex(item => item.id === pNode.id);
          if (index1 > -1) {
            // 父结点的弟弟节点是否有儿子
            tmp.isParentSiblingHasChild = ppNode?.children?.[index1 + 1]?.children?.length;

            const pppNode = this.findNodeById(cloneData, ppNode.pId);
            if (pppNode) {
              const index2 = pppNode.children.findIndex(item => item.id === ppNode.id);
              if (index2 > -1) {
                // 父结点的父结点的弟弟节点是否有儿子
                tmp.isGrandParentSiblingHasChild = pppNode?.children?.[index1 + 1]?.children?.length;
              }
            }
          }
        }
      }

      // 存在已选中节点，则根节点半选
      if (selectedValue && selectedValue.length && !pNode) {
        // 特殊情况处理——有多个根节点
        if (selectedValue.find((item) => this.findNodeById([tmp], item.id))) {
          tmp.indeterminate = true;
        }
      }

      if (!children) {
        tmp.children = [];
      }

      // 超过最大层级的节点将不允许新增节点
      if (maxLevel && node.level >= maxLevel) {
        tmp.disableAdd = true;
      }

      // 找到treeData中对应的值进行选中
      if (selectedValue) {
        const activeNodeIndex = selectedValue.findIndex((x) => x.id === tmp.id);
        if (activeNodeIndex !== -1) {
          // 当前节点选中
          tmp.checked = true;
          // 被选中的元素有子节点，则子节点全部选中
          if (tmp.children.length) {
            downFind(tmp);
          }
          // 寻找父节点
          upFind(tmp);
        }
      }

      if (!children || !children.length) {
        return node;
      }
      children.forEach((item) => {
        format(item, node.level + 1);
      });
      return node;
    };
    if (cloneData.length) {
      cloneData.map((item) => {
        return format(item, 1);
      });
    }
    return cloneData;
  };

  /**
   * 重置选中情况
   * @param data
   * @returns {{length}|*}
   */
  onResetData = (data) => {
    const format = (list) => {
      if (!list.length) {
        return [];
      }
      return list.map((item) => {
        const newItem = {
          ...item,
          indeterminate: false,
          checked: false,
        };
        if (Array.isArray(item.children)) {
          newItem.children = format(item.children);
        }
        return newItem;
      });
    };
    return format(data);
  };

  /**
   * 单选选中
   * @param data
   * @param node
   * @returns {Array}
   */
  selectedForRadio = (data, node) => {
    let selectedNode = null;

    function setSelected(nodeList) {
      // 使用some可以在匹配成功后中止循环
      return nodeList.some((item) => {
        if (node.id === item.id) {
          selectedNode = item;
          return true;
        }
        if (item.children && item.children.length) {
          return setSelected(item.children);
        }
        return false;
      });
    }

    return setSelected(data) ? [selectedNode] : [];
  };

  /**
   * 多选选中
   * @param data
   * @param node
   * @returns {*}
   */
  selectedForCheckbox(data, node) {
    const { checked, children, pId } = node;
    Object.assign(node, { indeterminate: false });
    // 变更自身节点选中状态
    if (node.children && node.children.length) {
      node.children.forEach((item) => {
        if (!item.checked) {
          const tmpNode = node;
          tmpNode.checked = checked;
          tmpNode.indeterminate = false;
        }
      });
    }

    // 变更子项选中状态
    const changeChildren = (child) => {
      child.forEach((item) => {
        const tmp = item;
        tmp.checked = checked;
        tmp.indeterminate = false;
        const itemChildren = item.children;
        if (itemChildren && itemChildren.length) {
          changeChildren(itemChildren);
        }
      });
    };

    // 变更父项选中状态
    const changeParent = (pNodeId) => {
      const parentNode = this.findNodeById(data, pNodeId);
      // 无父节点
      if (!parentNode) {
        return;
      }
      let childrenCheckedNumber = 0;
      let childrenIndeterminateNumber = 0;

      parentNode.children.forEach((item) => {
        // 子项中有被选中的节点childrenCheckedNumber则加1
        if (item.checked) {
          childrenCheckedNumber += 1;
        }
        // 子项存在部分选中节点则父节点部分选中
        if (item.indeterminate) {
          parentNode.indeterminate = true;
          childrenIndeterminateNumber += 1;
        }
      });

      if (childrenCheckedNumber === 0 && childrenIndeterminateNumber === 0) {
        // 子项全部未选中
        parentNode.checked = false;
        parentNode.indeterminate = false;
      } else if (childrenCheckedNumber === parentNode.children.length) {
        // 子项全部选中
        parentNode.checked = true;
        parentNode.indeterminate = false;
      } else {
        // 子项部分选中
        parentNode.checked = false;
        parentNode.indeterminate = true;
      }

      if (parentNode.pId || parentNode.pId === 0) {
        changeParent(parentNode.pId);
      }
    };

    changeChildren(children || []);
    changeParent(pId);
    return data;
  }

  /**
   * 获取所有选中数据的最底层节点
   * @param preAry 上一次树选中的节点
   * @param curAry 当前树选中的节点
   * @param node 当前操作的节点
   * @returns {*|*[]}
   */
  getSelectedLowestNodeList = (preAry, curAry, node = null) => {
    let preAryTemp = preAry || [];
    const curAryTemp = curAry || [];
    // 首先，判断是选中还是不选中， 选中--则不处理，不选中--移除
    if (preAryTemp.length && node && !node.checked) {
      const removeTemp = [];
      const getRemoveTemp = (n) => {
        const { children } = n;
        if (children && children.length) {
          children.forEach((c) => {
            getRemoveTemp(c);
          });
        } else {
          removeTemp.push(n);
        }
      };
      getRemoveTemp(node);
      preAryTemp = preAryTemp.filter(
        (pre) => !removeTemp.find((y) => y.id === pre.id),
      );
    }
    let temp = [...preAryTemp, ...curAryTemp];
    // 两个数组取并集，且移除掉有children属性的节点
    temp = temp.reduce((returnData, item) => {
      const obj = returnData.find((i) => i.id === item.id);
      if (!obj && (!item.children || !item.children.length)) {
        returnData.push(item);
      }
      return returnData;
    }, []);
    return temp;
  };

  /**
   * 根据参数获取节点
   * @param data
   * @param param
   * @param value
   * @returns {*}
   */
  findNodeByParam = (data, param, value) => {
    let node = null;
    const find = (array) => {
      array.some((item) => {
        if (item[param] === value) {
          node = item;
          return true;
        }
        if (Array.isArray(item.children)) {
          return find(item.children);
        }
        return false;
      });
    };
    find(data);
    return node;
  };

  /**
   * 根据id获取节点
   * @param data
   * @param id
   * @returns {*}
   */
  findNodeById(data, id) {
    return this.findNodeByParam(data, 'id', id);
  }

  /**
   * 根据id更新节点数据
   * @param data
   * @param id
   * @param updatePart
   */
  updateNodeById(data, id, updatePart) {
    const node = this.findNodeById(data, id);
    return node && Object.assign(node, updatePart);
  }

  /**
   * 收起/展开节点
   * @param data
   * @param node
   */
  onFoldNode(data, node) {
    this.updateNodeById(data, node.id, { isUnfold: !node.isUnfold });
    return data;
  }

  /**
   * 新增节点
   * @param data
   * @param pId
   * @param newNode
   * @param isAddFront
   */
  addChildNode(data, pId, newNode, isAddFront) {
    const pNode = this.findNodeById(data, pId);

    if (!pNode.children) {
      pNode.children = [];
    }
    if (isAddFront) {
      pNode.children.unshift(newNode);
      return data;
    }
    pNode.children.push(newNode);
    return data;
  }

  /**
   * 名称重复校验
   * @param data
   * @param node
   * @param name
   * @returns {*}
   */
  checkRepeatName(data, node, name) {
    const sameNode = this.findNodeByParam(data, 'name', name);
    if (!sameNode) {
      return false;
    }
    const { isAdd, id } = node;

    // 当前为新增 且 存在node相同的节点
    if (isAdd) {
      return true;
    }

    // 当前为编辑 且 存在node相同的节点不为当前节点
    return !isAdd && sameNode.id !== id;
  }

  /**
   * 删除节点
   * @param data
   * @param node
   * @returns {*}
   */
  removeChildNode(data, node) {
    const parentNode = this.findNodeById(data, node.pId);

    // 删除失败: 当前为顶层
    if (!parentNode) {
      return false;
    }

    // 删除失败: 存在子节点
    if (Array.isArray(node.children) && node.children.length) {
      return false;
    }
    return parentNode.children.some((child, index) => {
      if (child.id === node.id) {
        parentNode.children.splice(index, 1);
        return true;
      }
      return false;
    });
  }

  /**
   * 重命名节点
   * @param data
   * @param id
   * @param newValue
   * @returns {*}
   */
  renameChildNode(data, id, newValue) {
    const item = this.findNodeById(data, id);
    item.name = newValue;
    return data;
  }

  /**
   * 搜索节点
   * @param data
   * @param searchText
   */
  searchNode = (data, searchText) => {
    const cloneData = [...data];
    if (!searchText) {
      return cloneData;
    }

    const search = (node) => {
      return node.filter((item) => {
        // 当前节点匹配
        if (item.name.indexOf(searchText) !== -1) {
          if (
            item.children &&
            Array.isArray(item.children) &&
            item.children.length
          ) {
            const children = search(item.children);
            if (children.length) {
              Object.assign(item, { children, isUnfold: true });
            } else {
              Object.assign(item, { isUnfold: false });
            }
          }
          return true;
        }

        // 当前节点未匹配: 对子项进行匹配
        if (Array.isArray(item.children) && item.children.length) {
          Object.assign(item, {
            children: search(item.children),
            isUnfold: true,
          });
          return item.children.length > 0;
        }
        return false;
      });
    };
    return search(cloneData);
  };
}

export default Store;
