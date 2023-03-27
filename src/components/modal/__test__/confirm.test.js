import Modal from '../index';

describe('Modal.confirm triggers callbacks correctly', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should close modals when click button', () => {
    jest.useFakeTimers();
    const config = [
      {
        isShowIcon: false,
        content: 'some descriptions',
      },
      {
        icon: 'flag-solid',
        style: {
          width: '300px',
          height: '200px',
          minHeight: '200px',
          minWidth: '300px',
        },
        content: 'some descriptions',
      },
    ];
    [ 'info', 'success', 'warning', 'error' ].forEach((type) => {
      config.forEach((configItem) => {
        Modal[type]({
          ...configItem,
        });
        jest.runAllTimers();

        expect(document.querySelectorAll('button')).toHaveLength(1);
        document.querySelector('button').click();
        jest.runAllTimers();

        expect(document.querySelector('.cloud-modal-container')).toBe(null);
      });
    });
    jest.useRealTimers();
  });

  it('should render correctly when no Ok', () => {
    Modal.confirm({
      isShowIcon: false,
      content: 'some descriptions',
    });
    expect(document.querySelectorAll('button')).toHaveLength(2);
    document.querySelectorAll('button')[0].click();
  });

  it('should render correctly when onOk return Promise.resolve', () => {
    Modal.confirm({
      isShowIcon: false,
      content: 'some descriptions',
      onOk: () => Promise.resolve(''),
    });
    expect(document.querySelectorAll('button')).toHaveLength(2);
    document.querySelectorAll('button')[0].click();
  });

  it('should render button text correctly', () => {
    Modal.confirm({
      isShowIcon: false,
      content: 'some descriptions',
      okText: 'done',
      cancelText: 'close',
    });
    const btns = document.querySelectorAll('button');
    expect(btns[0].textContent).toBe('close');
    expect(btns[1].textContent).toBe('done');
    btns[1].click();
  });

  it('should render correctly when onOk return Promise.reject', () => {
    Modal.confirm({
      isShowIcon: false,
      content: 'some descriptions',
      onOk: () => Promise.reject(new Error('something wrong')),
    });
    expect(document.querySelectorAll('button')).toHaveLength(2);
    document.querySelectorAll('button')[0].click();
  });

  it('should render correctly when onOk return false', () => {
    Modal.confirm({
      isShowIcon: false,
      content: 'some descriptions',
      onOk: () => false,
    });

    expect(document.querySelectorAll('button')).toHaveLength(2);
    document.querySelector('.cloud-modal-confirm-btn').click();
  });

  it('should render correctly when onOk return object', () => {
    Modal.confirm({
      isShowIcon: false,
      content: 'some descriptions',
      onOk: () => ({}),
    });

    expect(document.querySelectorAll('button')).toHaveLength(2);
    document.querySelector('.cloud-modal-confirm-btn').click();
  });

  // 回车关闭弹框
  it('handleKeyDown', () => {
    jest.useFakeTimers();
    const keydownHandler = {};
    document.body.addEventListener = jest.fn((event, cb) => {
      keydownHandler[event] = cb;
    });

    const button = document.createElement('button');
    button.className = 'testButton';
    document.body.appendChild(button);

    const btnHndler = {};
    document.querySelector('.testButton').addEventListener = jest.fn((event, callback) => {
      if (event === 'keydown') {
        btnHndler[event] = callback;
      }
    });
    Modal.confirm({
      isShowIcon: false,
      showMask: false,
      content: 'some descriptions',
    });

    btnHndler.keydown({ keyCode: 13, preventDefault: jest.fn() });
    keydownHandler.keydown({ keyCode: 27 });

    keydownHandler.keydown({ keyCode: 13 });
    jest.runAllTimers();
    expect(document.querySelector('.cloud-modal-container')).toBe(null);
  });
});
