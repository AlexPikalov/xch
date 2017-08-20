import React, { Component } from 'react';

import Currency from './Currency';

export default class CurrencyFromSlot extends Component {
  constructor() {
    super();
    this.state = {
      inputSize: '0px'
    };
  }

  get inputSize() {
    const el = this.fakeInputEl;
    const minSize = 2;
    return `${el ? el.offsetWidth || minSize : minSize}px`;
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
    let val = +(event.target.value);
    val = !isNaN(val) ? val : '';
    this.adjustInputWidth();
    if (this.props.onAmountChange) {
      this.props.onAmountChange(val);
    }
    // if (!isNaN(val)) {
    //   this.adjustInputWidth();
    //   if (this.props.onAmountChange) {
    //     this.props.onAmountChange(val);
    //   }
    // }
  }

  adjustInputWidth() {
    setTimeout(() => this.forceUpdate());
  }

  render() {
    return (
      <div className="currency-slot-container from-currency"
        onClick={() => this.input.focus()}>

        {this.fakeInput()}

        <Currency
          currencyName={this.props.currencyName}
          currencyTotalAmount={this.props.currencyTotalAmount}
        />

        <div className="from-currency-input">
          {this.props.sellCurrencyAmount ? '-' : ''}
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

