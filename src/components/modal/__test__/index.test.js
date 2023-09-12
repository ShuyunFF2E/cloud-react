/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-classes-per-file */
import React from 'react';
import { mount } from 'enzyme';
import Modal from '../index';

class ModalTester extends React.Component {
	saveContainer = (container) => {
	  this.container = container;
	};

	render() {
	  return (
	    <div>
	      <div ref={this.saveContainer} className="selfContainer" />
	      <Modal {...this.props} visible getContainer={this.getContainer}>
          Here is content of Modal
	      </Modal>
      </div>
	  );
	}
}

class ModalTester1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.setState({
      visible: true,
    });
  }

	saveContainer = (container) => {
	  this.container = container;
	};

	onCancel = () => {
	  const { onCancel } = this.props;
	  this.setState({ visible: false });
	  if (onCancel) {
	    onCancel();
	  }
	};

	onOk = () => {
	  const { onOk } = this.props;
	  this.setState({ visible: false });
	  if (onOk) {
	    onOk();
	  }
	};

	render() {
	  return (
	    <div>
	      <div ref={this.saveContainer} className="selfContainer" />
	      <Modal {...this.props} visible={this.state.visible} getContainer={this.getContainer} onOk={this.onOk} onCancel={this.onCancel}>
    Here is content of Modal
	      </Modal>
  </div>
	  );
	}
}

const Footer = <div>我是自定义Footer组件</div>;

beforeEach(() => {
  // eslint-disable-next-line no-undef
  Element.prototype.getBoundingClientRect = jest.fn(() => ({
    width: 200,
    height: 100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }));
});

const getClientNumber = (type) => {
  jest.spyOn(document.documentElement, type, 'get').mockImplementation(() => 100);
};

describe('Modal', () => {
  it('not close modal when click mask', () => {
    const component = mount(<ModalTester clickMaskCanClose={false} />);
    expect(component).toMatchSnapshot();

    const onClose = jest.fn();
    component.find('.cloud-modal-mask').simulate('click');
    expect(onClose).not.toHaveBeenCalled();

    component.unmount();
  });

  it('render without mask', () => {
    const component = mount(
      <ModalTester visible showMask={false}>
        测试modal
      </ModalTester>,
    );
    expect(component).toMatchSnapshot();

    component.unmount();
  });

  it('render without footer', () => {
    const component = mount(
      <ModalTester visible hasFooter={false}>
        测试modal
      </ModalTester>,
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('render with custom footer', () => {
    const component = mount(
      <ModalTester visible footer={Footer}>
        测试modal
      </ModalTester>,
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('default function should be called if there are no props', () => {
    const component = mount(<ModalTester visible>测试modal</ModalTester>);

    component
      .find('button')
      .first()
      .simulate('click');

    component
      .find('button')
      .last()
      .simulate('click');

    component.find('.cloud-icon.icon-close').simulate('click');

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('onClose should be called when click mask', () => {
    const onClose = jest.fn();
    const component = mount(<ModalTester visible clickMaskCanClose showMask onClose={onClose} />);
    component.find('.cloud-modal-mask').simulate('click');
    expect(onClose).toHaveBeenCalled();
    component.unmount();
  });

  it('onOk should be called', () => {
    const onOk = jest.fn();
    const component = mount(<ModalTester visible onOk={onOk} />);
    component
      .find('button')
      .last()
      .simulate('click');
    expect(onOk).toHaveBeenCalled();

    component.unmount();
  });

  it('onCancel should be called', () => {
    const onCancel = jest.fn();

    const component = mount(<ModalTester onCancel={onCancel} />);

    component
      .find('button')
      .first()
      .simulate('click');
    expect(onCancel).toHaveBeenCalled();
    component.unmount();
  });

  it('modal should be close when click cancel', () => {
    const onCancel = jest.fn();

    const component = mount(<ModalTester1 onCancel={onCancel} />);

    component
      .find('button')
      .first()
      .simulate('click');
    expect(onCancel).toHaveBeenCalled();
    component.unmount();
  });

  it('onClose should be called', () => {
    const onClose = jest.fn();
    const component = mount(<ModalTester visible onClose={onClose} />);
    component.find('.cloud-icon.icon-close').simulate('click');
    expect(onClose).toHaveBeenCalled();

    component.unmount();
  });

  it('should do some stuff on mouseDown', () => {
    const handler = {};
    window.document.addEventListener = jest.fn((event, callback) => {
      handler[event] = callback;
    });

    const wrapper = mount(<ModalTester visible showMask />);

    wrapper.find('.cloud-modal-header').simulate('mouseDown');

    wrapper.find('.cloud-modal-title').simulate('mouseDown');

    wrapper.find('.cloud-icon.icon-close').simulate('mouseDown');

    expect(handler).toHaveProperty('mousemove');
    expect(handler).toHaveProperty('mouseup');

    wrapper.unmount();
  });

  it('should do some stuff on mouseMove', () => {
    const mouseMoveHandler = {};
    window.document.addEventListener = jest.fn((event, callback) => {
      mouseMoveHandler[event] = callback;
    });

    let animationHandler = {};
    window.requestAnimationFrame = jest.fn((event) => {
      animationHandler = event;
    });

    const component = mount(<ModalTester visible showMask />);
    component.find('.cloud-modal-header').simulate('mouseDown', {
      target: {
        getBoundingClientRect: () => ({
          bottom: 303,
          height: 42,
          left: 534.6000366210938,
          right: 984.6000366210938,
          top: 261,
          width: 450,
          x: 534.6000366210938,
          y: 261,
        }),
      },
      pageX: 656,
      screenY: 388,
    });

    mouseMoveHandler.mousemove({
      target: {
        getBoundingClientRect: () => ({
          bottom: 334,
          height: 42,
          left: 70.5999984741211,
          right: 520.5999984741211,
          top: 292,
          width: 450,
          x: 70.5999984741211,
          y: 292,
        }),
      },
      pageX: 192,
      screenY: 419,
      preventDefault: jest.fn(),
    });

    animationHandler();

    getClientNumber('clientWidth');
    getClientNumber('clientHeight');

    mouseMoveHandler.mousemove({
      target: {
        getBoundingClientRect: () => ({
          bottom: 334,
          height: 42,
          left: 70.5999984741211,
          right: 520.5999984741211,
          top: 292,
          width: 450,
          x: 70.5999984741211,
          y: 292,
        }),
      },
      pageX: 192,
      screenY: 419,
      preventDefault: jest.fn(),
    });
    animationHandler();

    mouseMoveHandler.mousemove({
      target: {
        getBoundingClientRect: () => ({
          bottom: 0,
          height: 0,
          left: 100,
          right: 100,
          top: 0,
          width: 450,
          x: 0,
          y: 0,
        }),
      },
      pageX: 0,
      screenY: 0,
      preventDefault: jest.fn(),
    });
    animationHandler();

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should do some stuff on mouseUp', () => {
    const mouseUpHandler = {};
    window.document.addEventListener = jest.fn((event, callback) => {
      mouseUpHandler[event] = callback;
    });

    const removeEventHandler = {};
    window.document.removeEventListener = jest.fn((event, callback) => {
      removeEventHandler[event] = callback;
    });

    let animationHandler = {};
    window.requestAnimationFrame = jest.fn((event) => {
      animationHandler = event;
    });

    const component = mount(<ModalTester visible showMask />);
    component.find('.cloud-modal-header').simulate('mouseDown');

    mouseUpHandler.mouseup();

    expect(removeEventHandler).toHaveProperty('mousemove');
    expect(removeEventHandler).toHaveProperty('mouseup');

    animationHandler();
  });
});
