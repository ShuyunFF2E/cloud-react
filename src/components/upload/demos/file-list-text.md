---
title: 已上传的文件列表
order: 5
desc: 使用 fileList 设置已上传的文件列表。
---

```jsx
/**
 * title: 已上传的文件列表
 * desc: 使用 fileList 设置已上传的文件列表。
 */
import React from "react";
import { Message, Upload } from "cloud-react";

class UploadDemo extends React.Component {
  state = {
    fileList: [
      {
        id: "1",
        name: "头像哎.png",
        url: "http://wework.qpic.cn/bizmail/VtA3epsUIvNIEUSja4VNWy3a0tWLCEiajSFOBFicBQRosvss0SyZ7t2w/0",
      },
      {
        id: "2",
        name: "yyy.xls",
        url: "http://www.baidu.com/yyy.xls",
      },
      {
        id: "3",
        name: "已上传的文件列表已上传的文件列表已上传的文件列表已上传的文件列表已上传的文件列表xxx.csv",
        url: "http://www.baidu.com/zzz.csv",
        status: "error",
      },
      {
        id: "4",
        name: "zzz.txt",
        url: "http://www.baidu.com/zzz.txt",
      },
      {
        id: "5",
        name: "已上传的文件列表已上传的文件列表已上传的文件列表已上传的文件列表已上传的文件列表xxx.jpg",
        url: "https://qa-pcrm.shuyun.com/pcrm/202206/e2f5f56627cbabf6e6790fe70503cefe/155512_44787_规则标题@2x.jpg",
      },
      {
        id: "6",
        name: "未知文件类型.xlsx",
        url: "未知文件类型.xlsx",
      },
    ],
  };

  handleRemove = (info) => {
    const id = info.file.id;

    // 这里可能需要调用后端接口，删除已经上传的文件
    let restFileList = info.fileList.filter((file) => id !== file.id);

    this.setState({
      fileList: restFileList,
    });

    Message.success(info.file.name + " 删除成功！");
  };

  render() {
    const props = {
      action: "/upload",
      onRemove: this.handleRemove,
    };

    return (
      <div className="wrapper">
        <Upload {...props} fileList={this.state.fileList} />
      </div>
    );
  }
}

export default UploadDemo;
```
