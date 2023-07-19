import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LightText extends Component {
  getLightText(originText, keyWords, isFullMatch) {
    const origin = String(originText || '');
    if (!keyWords || !keyWords.length || origin.indexOf(keyWords) === -1) {
      return origin;
    }
    if (isFullMatch) {
      if (origin === String(keyWords)) {
        return `<label style="color: ${this.props.color}; cursor: ${this.props.cursor}">${origin}</label>`;
      }
      return origin;
    }
    const arr = keyWords ? keyWords.split('') : [];
    const isSpot = arr.length === 1 ? arr.every((item) => item === '.') : false;
    if (isSpot) {
      return origin;
    }
    const arr2 = arr.map((item) => {
      if (
        item === '?'
        || item === '('
        || item === ')'
        || item === '+'
        || item === '['
        || item === '.'
        || item === '\\'
      ) {
        return `\\${item}`;
      }
      return item;
    });
    const reg = new RegExp(`${arr2.join('')}`, 'g');
    return origin.replace(
      reg,
      `<label style="color: ${this.props.color}; cursor: ${this.props.cursor}">${keyWords}</label>`,
    );
  }

  render() {
    const {
      originText, keyWords, defaultSymbol, isFullMatch,
    } = this.props;
    return (
      <span
        dangerouslySetInnerHTML={{
          __html:
            this.getLightText(originText, keyWords, isFullMatch)
            || defaultSymbol,
        }}
      />
    );
  }
}

LightText.propTypes = {
  originText: PropTypes.any.isRequired,
  keyWords: PropTypes.any,
  defaultSymbol: PropTypes.string,
  isFullMatch: PropTypes.bool,
  cursor: PropTypes.string,
  color: PropTypes.string,
};

LightText.defaultProps = {
  keyWords: '',
  defaultSymbol: '',
  isFullMatch: false,
  cursor: 'auto',
  color: '#0055CC',
};

export default LightText;
