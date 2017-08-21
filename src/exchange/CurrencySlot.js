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
    return this.props.amount ? `${fomatCurrencyValue(this.props.amount, currencySymbol)}` : '';
  }

  resultStyles() {
    const visibility = this.props.amount ? 'visible' : 'hidden';
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

  typeClass(sellingInput) {
    return sellingInput ? 'from-currency' : 'to-currency';
  }

  render() {
    return (
      <div className={'currency-slot-container ' + this.typeClass(this.props.sellingInput)}
        onClick={() => this.input.focus()}>

        <Currency
          currencyName={this.props.currencyName}
          currencyTotalAmount={this.props.currencyTotalAmount}>
        </Currency>

        <div className="exchange-result-container">
          <Input
            ref={input => this.input = input}
            sellingInput={this.props.sellingInput}
            currencyAmount={this.props.amount}
            onChange={event => this.handleInputChange(event)}
          />
          { !this.props.sellingInput && this.renderRatio() }
        </div>

      </div>
    );
  }
}
