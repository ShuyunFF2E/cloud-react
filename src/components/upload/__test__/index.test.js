import React from 'react';
import { mount, render } from 'enzyme';

import Upload from '../index';

describe('Upload', () => {
  it('mount correctly', () => {
    const props = {
      size: 2,
      multiple: true,
      isShowIcon: false,
      showBeforeConfirm: false,
      labelText: '点击上传',
      // 此接口调用的 ant-design 的上传的mock服务接口
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onBeforeUpload(file) {
        console.log(file);
        return true;
      },
    };
    const wrapper = render(<Upload {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('return promise in beforeUpload', () => {
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      onBeforeUpload: data,
      onProgress: () => {
        expect(data).toHaveBeenCalled();
      },
    };

    const wrapper = mount(
      <Upload {...props}>
        <button type="button">upload</button>
      </Upload>,
    );

    wrapper.find('input').simulate('change', {
      target: {
        files: [ { file: 'foo.png' } ],
      },
    });
    wrapper.unmount();
  });
  it('upload showBeforeConfirm onClick promise', () => {
    const props = {
      action: 'http://upload.com',
      onClick: () => new Promise((resolve) => resolve()),
      showBeforeConfirm: true,
    };

    const wrapper = mount(<Upload {...props} />);

    wrapper
      .find('.cloud-upload-select')
      .find('.cloud-upload')
      .at(1)
      .simulate('click');
    expect(wrapper.find('.cloud-modal')).toHaveLength(0);
  });
  it('upload onClick promise', () => {
    const props = {
      action: 'http://upload.com',
      onClick: () => new Promise((resolve) => resolve()),
    };

    const wrapper = mount(<Upload {...props} />);

    wrapper
      .find('.cloud-upload-select')
      .find('.cloud-upload')
      .at(1)
      .simulate('click');
    expect(wrapper.find('.cloud-modal')).toHaveLength(0);
  });
  it('upload promise return file in beforeUpload', () => {
    const props = {
      size: 2,
      multiple: true,
      isShowIcon: false,
      showBeforeConfirm: false,
      labelText: '点击上传',

      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onBeforeUpload(file) {
        console.log(file);
        return true;
      },
      onProgress: (file) => {
        console.log(file);
        expect(file.name).toEqual('foo');
      },
    };

    const wrapper = mount(<Upload {...props} />);

    wrapper.find('input').simulate('change', {
      files: [ { file: 'foo.png' } ],
    });
  });
  it('upload disabled', () => {
    const props = {
      size: 2,
      multiple: true,
      isShowIcon: false,
      showBeforeConfirm: false,
      labelText: '点击上传',
      disabled: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onBeforeUpload(file) {
        console.log(file);
        return true;
      },
      onProgress: (file) => {
        console.log(file);
        expect(file.name).toEqual('foo');
      },
    };

    const wrapper = mount(<Upload {...props} />);
    expect(wrapper.find('input').props().disabled).toEqual(true);
  });
  it('upload labelText', () => {
    const props = {
      size: 2,
      multiple: true,
      isShowIcon: false,
      showBeforeConfirm: false,
      labelText: '上传',
      disabled: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      fileList: [
        {
          id: '1',
          name: 'xxx.png',
          url: 'http://www.baidu.com/xxx.png',
        },
        {
          id: '2',
          name: 'yyy.png',
          url: 'http://www.baidu.com/yyy.png',
        },
        {
          id: '3',
          name: 'zzz.png',
          url: 'http://www.baidu.com/zzz.png',
        },
      ],
      onBeforeUpload(file) {
        console.log(file);
        return true;
      },
      onProgress: (file) => {
        console.log(file);
        expect(file.name).toEqual('foo');
      },
    };

    const wrapper = mount(<Upload {...props} />);
    expect(wrapper.find('button').find('span').text()).toEqual('上传');
  });
  it('upload fileList', () => {
    const props = {
      action: '/upload',
    };
    const fileList = [
      {
        id: '1',
        name: 'xxx.png',
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        id: '2',
        name: 'yyy.png',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        id: '3',
        name: 'zzz.png',
        url: 'http://www.baidu.com/zzz.png',
      },
    ];
    const wrapper = mount(<Upload {...props} fileList={fileList} />);
    expect(wrapper.find('.cloud-upload-list-text')).toHaveLength(3);
    expect(
      wrapper.find('.cloud-upload-list-text').at(0).find('span').text(),
    ).toEqual('xxx.png');
    expect(wrapper.find('UploadList').find('Text').props().list).toHaveLength(
      3,
    );
  });
  it('upload removeEvent', () => {
    const fileList = [
      {
        id: '1',
        name: 'xxx.png',
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        id: '2',
        name: 'yyy.png',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        id: '3',
        name: 'zzz.png',
        url: 'http://www.baidu.com/zzz.png',
      },
    ];
    const data = jest.fn();
    const props = {
      action: '/upload',
      onRemove: data,
    };

    const wrapper = mount(
      <div className="wrapper">
        <Upload {...props} fileList={fileList} />
      </div>,
    );
    wrapper
      .find('.cloud-upload-list-text')
      .at(0)
      .find('Icon')
      .simulate('click');
    expect(data).toHaveBeenCalled();
  });
  it('upload input accept', () => {
    const fileList = [
      {
        id: '1',
        name: 'xxx.png',
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        id: '2',
        name: 'yyy.png',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        id: '3',
        name: 'zzz.png',
        url: 'http://www.baidu.com/zzz.png',
      },
    ];
    const data = jest.fn();
    const props = {
      action: '/upload',
      onRemove: data,
      multiple: true,
      accept: 'image/**',
    };

    const wrapper = mount(
      <div className="wrapper">
        <Upload {...props} fileList={fileList} />
      </div>,
    );
    expect(wrapper.find('input').props().accept).toEqual('image/**');
  });
  it('upload input multiple', () => {
    const fileList = [
      {
        id: '1',
        name: 'xxx.png',
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        id: '2',
        name: 'yyy.png',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        id: '3',
        name: 'zzz.png',
        url: 'http://www.baidu.com/zzz.png',
      },
    ];
    const data = jest.fn();
    const props = {
      action: '/upload',
      onRemove: data,
      multiple: true,
    };

    const wrapper = mount(
      <div className="wrapper">
        <Upload {...props} fileList={fileList} />
      </div>,
    );
    expect(wrapper.find('input').props().multiple).toEqual(true);
  });
  it('upload picture list', () => {
    const props = {
      accept: 'image/*',
      labelText: 'Upload',
      action: '/upload',
      type: 'picture',
    };
    const fileList = [
      {
        id: '1',
        name: 'xxx.png',
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        id: '2',
        name: 'yyy.png',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        id: '3',
        name: 'zzz.png',
        url: 'http://www.baidu.com/zzz.png',
      },
    ];
    const wrapper = mount(<Upload {...props} fileList={fileList} />);
    expect(
      wrapper.find('UploadList').find('Picture').props().list,
    ).toHaveLength(3);
  });
  it('upload picture list remove', () => {
    const removeFn = jest.fn();
    const props = {
      accept: 'image/*',
      labelText: 'Upload',
      action: '/upload',
      type: 'picture',
      onRemove: removeFn,
    };
    const fileList = [
      {
        id: '1',
        name: 'xxx.png',
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        id: '2',
        name: 'yyy.png',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        id: '3',
        name: 'zzz.png',
        url: 'http://www.baidu.com/zzz.png',
      },
    ];
    const wrapper = mount(<Upload {...props} fileList={fileList} />);
    expect(
      wrapper.find('UploadList').find('Picture').props().list,
    ).toHaveLength(3);
    wrapper.find('.cloud-upload-list-pic').at(0).find('Icon').at(2)
      .simulate('click');
    expect(removeFn).toHaveBeenCalled();
    wrapper.setState({
      fileList: [
        {
          id: '1',
          name: 'xxx.png',
          url: 'http://www.baidu.com/xxx.png',
        },
        {
          id: '2',
          name: 'yyy.png',
          url: 'http://www.baidu.com/yyy.png',
        },
      ],
    });

    wrapper.update();
  });
  it('upload beforeUpload fn', () => {
    const beforeUploadFn = jest.fn();
    const props = {
      accept: 'image/jpeg,image/jpg,image/png',
      labelText: 'Upload',
      action: 'http://upload.com',
      onBeforeUpload: beforeUploadFn,
    };
    function mockGetRef() {
      return [
        {
          id: 'upload-1631862199498',
          lastModified: 1626418261795,
          name: '20210716145055.jpg',
          size: 58311,
          type: 'image/jpeg',
          webkitRelativePath: '',
        },
      ];
    }
    jest.spyOn(Upload.prototype, 'getFileList').mockImplementation(mockGetRef);
    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', {
      target: {
        files: [
          {
            id: 'upload-1631862199498',
            lastModified: 1626418261795,
            name: '20210716145055.jpg',
            size: 58311,
            type: 'image/jpeg',
            webkitRelativePath: '',
          },
        ],
      },
    });
    expect(beforeUploadFn).toHaveBeenCalled();
  });
  it('upload upload size reject', () => {
    const data = jest.fn();
    const props = {
      accept: 'image/jpeg,image/jpg,image/png',
      labelText: 'Upload',
      action: 'http://upload.com',
      onBeforeUpload: data,
      size: 0,
      unify: true,
    };
    function mockGetRef() {
      return [
        {
          id: 'upload-1631862199498',
          lastModified: 1626418261795,
          name: '20210716145055.jpg',
          size: 58311,
          type: 'image/jpeg',
          webkitRelativePath: '',
        },
      ];
    }
    jest.spyOn(Upload.prototype, 'getFileList').mockImplementation(mockGetRef);
    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', {
      target: {
        files: [
          {
            id: 'upload-1631862199498',
            lastModified: 1626418261795,
            name: '20210716145055.jpg',
            size: 58311,
            type: 'image/jpeg',
            webkitRelativePath: '',
          },
        ],
      },
    });
    expect(data).not.toHaveBeenCalled();
  });
  it('upload upload onSuccess', async () => {
    const onSuccessFn = jest.fn();
    const res = { msh: '123' };
    const customRequest = (opt) => opt.onSuccess(res);
    const props = {
      type: 'picture',
      accept: 'image/jpeg,image/jpg,image/png',
      labelText: 'Upload',
      action: 'http://upload.com',
      customRequest,
      onSuccess: onSuccessFn,
      unify: true,
    };
    function mockGetRef() {
      return [
        {
          id: 'upload-1631862199498',
          lastModified: 1626418261795,
          name: '20210716145055.jpg',
          size: 58311,
          type: 'image/jpeg',
          webkitRelativePath: '',
          abort() {},
        },
      ];
    }
    jest.spyOn(Upload.prototype, 'getFileList').mockImplementation(mockGetRef);
    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', {
      target: {
        files: [
          {
            id: 'upload-1631862199498',
            lastModified: 1626418261795,
            name: '20210716145055.jpg',
            size: 58311,
            type: 'image/jpeg',
            webkitRelativePath: '',
          },
        ],
      },
    });
    expect(await onSuccessFn).toHaveBeenCalled();
    wrapper.unmount();
  });
  it('upload upload  abort', () => {
    const data = jest.fn();
    const customRequest = (opt) => Object.assign(opt, { abort() {} });
    const props = {
      accept: 'image/jpeg,image/jpg,image/png',
      labelText: 'Upload',
      action: 'http://upload.com',
      customRequest,
      onSuccess: data,
      unify: true,
    };
    function mockGetRef() {
      return [
        {
          id: 'upload-1631862199498',
          lastModified: 1626418261795,
          name: '20210716145055.jpg',
          size: 58311,
          type: 'image/jpeg',
          webkitRelativePath: '',
          abort() {},
        },
      ];
    }
    jest.spyOn(Upload.prototype, 'getFileList').mockImplementation(mockGetRef);
    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', {
      target: {
        files: [
          {
            id: 'upload-1631862199498',
            lastModified: 1626418261795,
            name: '20210716145055.jpg',
            size: 58311,
            type: 'image/jpeg',
            webkitRelativePath: '',
          },
        ],
      },
    });
    expect(data).not.toHaveBeenCalled();
    wrapper.unmount();
  });
  it('upload upload onSuccess warn', async () => {
    const data = jest.fn();
    const res = '{"msh":"123"<2:}';
    const customRequest = (opt) => opt.onSuccess(res);
    const props = {
      accept: 'image/jpeg,image/jpg,image/png',
      labelText: 'Upload',
      action: 'http://upload.com',
      customRequest,
      onSuccess: data,
    };
    function mockGetRef() {
      return [
        {
          id: 'upload-1631862199498',
          lastModified: 1626418261795,
          name: '20210716145055.jpg',
          size: 58311,
          type: 'image/jpeg',
          webkitRelativePath: '',
        },
      ];
    }
    jest.spyOn(Upload.prototype, 'getFileList').mockImplementation(mockGetRef);
    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', {
      target: {
        files: [
          {
            id: 'upload-1631862199498',
            lastModified: 1626418261795,
            name: '20210716145055.jpg',
            size: 58311,
            type: 'image/jpeg',
            webkitRelativePath: '',
          },
        ],
      },
    });
    expect(await data).toHaveBeenCalled();
  });
  it('upload upload onError', async () => {
    const data = jest.fn();
    const res = '{"msh":"123"}';
    const customRequest = (opt) => opt.onError(res);
    const props = {
      accept: 'image/jpeg,image/jpg,image/png',
      labelText: 'Upload',
      action: 'http://upload.com',
      customRequest,
      onError: data,
    };
    function mockGetRef() {
      return [
        {
          id: 'upload-1631862199498',
          lastModified: 1626418261795,
          name: '20210716145055.jpg',
          size: 58311,
          type: 'image/jpeg',
          webkitRelativePath: '',
        },
      ];
    }
    jest.spyOn(Upload.prototype, 'getFileList').mockImplementation(mockGetRef);
    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', {
      target: {
        files: [
          {
            id: 'upload-1631862199498',
            lastModified: 1626418261795,
            name: '20210716145055.jpg',
            size: 58311,
            type: 'image/jpeg',
            webkitRelativePath: '',
          },
        ],
      },
    });
    expect(await data).toHaveBeenCalled();
  });
  it('upload upload onProgress', async () => {
    const data = jest.fn();
    const res = '{"msh":"123"}';
    const customRequest = (opt) => opt.onProgress(res);
    const props = {
      accept: 'image/jpeg,image/jpg,image/png',
      labelText: 'Upload',
      action: 'http://upload.com',
      customRequest,
      onProgress: data,
    };
    function mockGetRef() {
      return [
        {
          id: 'upload-1631862199498',
          lastModified: 1626418261795,
          name: '20210716145055.jpg',
          size: 58311,
          type: 'image/jpeg',
          webkitRelativePath: '',
        },
      ];
    }
    jest.spyOn(Upload.prototype, 'getFileList').mockImplementation(mockGetRef);
    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', {
      target: {
        files: [
          {
            id: 'upload-1631862199498',
            lastModified: 1626418261795,
            name: '20210716145055.jpg',
            size: 58311,
            type: 'image/jpeg',
            webkitRelativePath: '',
          },
        ],
      },
    });
    expect(await data).toHaveBeenCalled();
  });
});
