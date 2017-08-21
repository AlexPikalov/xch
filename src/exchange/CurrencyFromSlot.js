import React, { Component } from 'react';

import Currency from './Currency';

const MIN_INPUT_SIZE_PX = 2;

export default class CurrencyFromSlot extends Component {
  componentWillMount() {
    const minSize = `${MIN_INPUT_SIZE_PX}px`;
    this.setState({inputSize: minSize})
  }

  get inputSize() {
    const el = this.fakeInputEl;
    return `${el ? el.offsetWidth || MIN_INPUT_SIZE_PX : MIN_INPUT_SIZE_PX}px`;
  }

  fakeInput() {
    // use this input in order to calculate input's minimal width
    return <div
      className="fake-input"
      ref={fakeInputEl => this.fakeInputEl = fakeInputEl}>
        {this.props.sellCurrencyAmount > 0 ? this.props.sellCurrencyAmount : '' }
    </div>;
  }

  handleInputChange(event) {
    if (this.props.onAmountChange) {
      let val = +(event.target.value);
      val = !isNaN(val) ? val : '';
      this.props.onAmountChange(val);
    }
    this.adjustInputWidth();
  }

  adjustInputWidth() {
    setTimeout(() => this.forceUpdate());
  }

  render() {
    return (
      <div className="currency-slot-container from-currency"
        onClick={() => this.input.focus()}>

        { this.fakeInput() }

        <Currency
          currencyName={this.props.currencyName}
          currencyTotalAmount={this.props.currencyTotalAmount}
        />

        <div className="from-currency-input">
          { this.props.sellCurrencyAmount ? '-' : '' }
          <input type="number"
            autoFocus={true}
            ref={input => this.input = input}
            value={this.props.sellCurrencyAmount || ''}
            style={{width: this.inputSize}}
            onChange={event => this.handleInputChange(event)} />
        </div>

      </div>
    );
  }
}

