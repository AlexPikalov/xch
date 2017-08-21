import React, { Component } from 'react';

import { fomatCurrencyValue, currencySymbols } from './currency-helpers';
import Currency from './Currency';
import { Input } from './Input';

export default class CurrencyToSlot extends Component {
  componentWillMount() {
    this.currencySymbols = currencySymbols;
  }

  get formattedResult() {
    const currencySymbol = null;
    return this.props.exchangeAmount ? `${fomatCurrencyValue(this.props.exchangeAmount, currencySymbol)}` : '';
  }

  resultStyles() {
    const visibility = this.props.exchangeAmount ? 'visible' : 'hidden';
    return { visibility };
  }

  renderRatio() {
    return (
      <div className="currencies-ratio">
          {this.currencySymbols[this.props.currencyName] || ''}1
          =
          {fomatCurrencyValue(this.props.currencyRatio, this.props.currencyFromName)}
      </div>
    );
  }

  handleInputChange(value) {
    if (this.props.onAmountChange) {
      this.props.onAmountChange(value);
    }
  }

  render() {
    return (
      <div className="currency-slot-container to-currency"
        onClick={() => this.input.focus()}>

        <Currency
          currencyName={this.props.currencyName}
          currencyTotalAmount={this.props.currencyTotalAmount}>
        </Currency>

        <div className="exchange-result-container">
          <Input
            ref={input => this.input = input}
            autoFocus={true}
            sellingInput={false}
            currencyAmount={this.props.exchangeAmount}
            onChange={event => this.handleInputChange(event)}
          />
          { this.renderRatio() }
        </div>

      </div>
    );
  }
}
