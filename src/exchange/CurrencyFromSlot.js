import React, { Component } from 'react';
import { fomatCurrencyValue } from './currency-helpers'

import Currency from './Currency';
import { Input } from './Input';

const MIN_INPUT_SIZE_PX = 2;

export default class CurrencyFromSlot extends Component {
  componentWillMount() {
    const minSize = `${MIN_INPUT_SIZE_PX}px`;
    this.state = { inputSize: minSize };
  }

  componentDidMount() {
    this.input.focus();
  }

  resultStyles() {
    const visibility = this.props.exchangeAmount ? 'visible' : 'hidden';
    return { visibility };
  }

  get formattedResult() {
    const currencySymbol = null;
    return this.props.exchangeAmount ? `${fomatCurrencyValue(this.props.exchangeAmount, currencySymbol)}` : '';
  }

  handleInputChange(value) {
    this.props.onAmountChange(value);
  }

  render() {
    return (
      <div className="currency-slot-container from-currency"
        onClick={() => this.input.focus()}>

        <Currency
          currencyName={this.props.currencyName}
          currencyTotalAmount={this.props.currencyTotalAmount}
        />

        <div className="exchange-result-container">
          <Input
            ref={input => this.input = input}
            sellingInput={true}
            currencyAmount={this.props.sellCurrencyAmount}
            onChange={event => this.handleInputChange(event)}
          />
        </div>

      </div>
    );
  }
}

