import React, { Component } from 'react';

import { fomatCurrencyValue } from './currency-helpers';

const MIN_INPUT_SIZE_PX = 2;

export class Input extends Component {
  get prefix() {
    if (!this.props.currencyAmount) {
      return '';
    }

    return this.props.sellingInput ? '-' : '+';
  }

  get inputSize() {
    const el = this.fakeInputEl;
    return `${el ? el.offsetWidth || MIN_INPUT_SIZE_PX : MIN_INPUT_SIZE_PX}px`;
  }

  get formattedResult() {
    const currencySymbol = null;
    return this.props.currencyAmount ? `${fomatCurrencyValue(+this.props.currencyAmount, currencySymbol)}` : '0';
  }

  componentWillMount() {
    this.state = { focused: false };
  }

  componentDidUpdate() {
    requestAnimationFrame(() => this.forceUpdate());
  }

  focus() {
    this.setState({focused: true});
    requestAnimationFrame(() => {
      this.input.focus();
      const pos = this.props.currencyAmount ? this.props.currencyAmount.toString().length : 0;
      this.input.setSelectionRange(pos, pos)
    });
  }

  blur() {
    this.setState({focused: false});
  }

  resultStyles() {
    const visibility = +this.props.currencyAmount ? 'visible' : 'hidden';
    return { visibility };
  }

  fakeInput() {
    // use this input in order to calculate input's minimal width
    return <div
      className="fake-input"
      ref={fakeInputEl => this.fakeInputEl = fakeInputEl}>
        { this.props.currencyAmount || '' }
    </div>;
  }

  handleInputChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value || '');
    }
  }

  render() {
    return (
      <div className="currency-input">
        { this.fakeInput() }
        { this.prefix }
        { this.state.focused && <input type="text"
          ref={input => this.input = input}
          value={this.props.currencyAmount || ''}
          style={{width: this.inputSize}}
          onBlur={() => this.blur()}
          onChange={event => this.handleInputChange(event.target.value)} /> }
        { !this.state.focused && <span style={this.resultStyles()}>{this.formattedResult}</span> }
      </div>
    );
  }
}
