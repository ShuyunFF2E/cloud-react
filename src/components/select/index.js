import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import SingleSelect from './views/single-select';
import Selected from './views/selected';
import Option from './views/option';
import formatOptionSource from './utils';

import './index.less';

const selector = 'select';

class Select extends Component {

  static Option = Option;

  constructor(props) {
    super(props);

    const { open, defaultOpen, value, defaultValue } = props;
    this.state = {
      open: open || defaultOpen,
      value: value || defaultValue
    };
    this.node = React.createRef();
  }

  componentDidMount() {
    this.setDefaultSelected();

    document.addEventListener('click', this.handleClick);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { disabled, width, open: propOpen } = nextProps;
    const { open, value, selected } = nextState;
    const { disabled: prevDisabled, width: preWidth, open: prePropOpen } = this.props;
    const { open: prevOpen, value: preValue, selected: preSelected } = this.state;
    return disabled !== prevDisabled ||
           width !== preWidth ||
           propOpen !== prePropOpen ||
           open !== prevOpen ||
           value !== preValue ||
           selected !== preSelected;
  }

  componentDidUpdate() {
    const { open: propOpen } = this.props;
    const { open } = this.state;
    const visible = propOpen !== null ? propOpen : open;
    if (visible) this.getSelectContainer();
    if (this.selectContainer) {
      return visible ? ReactDOM.render(this.optionsNode, this.selectContainer) : ReactDOM.unmountComponentAtNode(this.selectContainer);
    }
    return null;
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);

    if (this.selectContainer) {
      ReactDOM.unmountComponentAtNode(this.selectContainer);
      document.body.removeChild(this.selectContainer);
      this.selectContainer = null;
    }
  }

  get optionsNode() {
    const { searchable, children, onSearch } = this.props;
    const { value } = this.state;

    return (
      <SingleSelect
        value={value}
        dataSource={children}
        searchable={searchable}
        onChange={this.onOptionChange}
        onSearch={onSearch} />
    )
  }

  setDefaultSelected() {
    const { value } = this.state;
    const { children } = this.props;
    if (value) {
      Children.map(children, child => {
        if (child.props.value === value ) {
          const selected = formatOptionSource(child.props);
          this.setState({ selected });
        };
      })
    }
  }

  getSelectContainer() {
    if (!this.selectContainer) {
      this.selectContainer = document.createElement('div');
      document.body.appendChild(this.selectContainer);
    }
    const nodePosition = this.node.current.getBoundingClientRect();
    this.selectContainer.style.position = 'absolute';
    this.selectContainer.style.top = `${nodePosition.top + nodePosition.height}px`;
    this.selectContainer.style.left = `${nodePosition.left}px`;
    this.selectContainer.style.minWidth = `${nodePosition.width}px`;
    return this.selectContainer;
  }

  handleClick = e => {
    const { open } = this.state;
    const isClickSelect = this.node.current.contains(e.target) || (this.selectContainer && this.selectContainer.contains(e.target));
    if (!isClickSelect && open) {
      const { onSelectClose, open: propOpen } = this.props;
      onSelectClose();
      if (propOpen === null) this.setState({ open: false });
    };
  }

  handleSelect = () => {
    const { open } = this.state;
    const { onSelectOpen, onSelectClose, open: propOpen } = this.props;
    if (open) onSelectClose();
    if (!open) onSelectOpen();
    if (propOpen === null) this.setState({ open: !open });
  }

	onClickSelected = () => {
    const { disabled } = this.props;
		if (disabled) {
			return;
    }
  
    this.handleSelect();
  }
  
  onClickOption = (selected, value) => {
    this.setState({ selected, value });
    this.handleSelect();
  }

  onOptionChange = data => {
    const { labelInValue, onChange } = this.props;
    const option = formatOptionSource(data);
    const selectValue = option[0].value;
    const optionValue = labelInValue ? option[0] : selectValue;
    this.onClickOption(option, selectValue);
    onChange(optionValue);
  }

	render() {
    const {
      placeholder, disabled,
      style, className, width
    } = this.props;
    const { selected } = this.state;
    const classNames = classnames(`${selector}`, className);
    const selectStyle = { width: typeof width === 'number' ? `${width}px` : width, ...style };

    return (
      <div className={`${classNames}`} style={selectStyle} ref={this.node}>
        {/* 已选显示区域 */}
        <Selected
          onClick={this.onClickSelected}
          placeholder={placeholder}
          dataSource={selected}
          disabled={disabled} />
      </div>
    );
	}
}

Select.propTypes = {
  defaultOpen: PropTypes.bool,
  open: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  searchable: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  labelInValue: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onSelectOpen: PropTypes.func,
  onSelectClose: PropTypes.func
};

Select.defaultProps = {
  defaultOpen: false,
  open: null,
  disabled: false,
  placeholder: '',
  width: 'auto',
  searchable: false,
  defaultValue: '',
  value: '',
  labelInValue: false,
  className: '',
  onChange: () => {},
  onSearch: () => {},
  onSelectOpen: () => {},
  onSelectClose: () => {}
};

export default Select;
