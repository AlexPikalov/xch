import React, { Component } from 'react';

import { fomatCurrencyValue, currencySymbols } from './currency-helpers';
import Currency from './Currency';

export default class CurrencyToSlot extends Component {
  componentWillMount() {
    this.currencySymbols = currencySymbols;
  }

  get formattedResult() {
    const currencySymbol = null;
    return `+${fomatCurrencyValue(this.props.exchangeAmount, currencySymbol)}`;
  }

  ratio() {
    return (
      <div className="currencies-ratio">
          {this.currencySymbols[this.props.currencyName] || ''}1
          =
          {fomatCurrencyValue(this.props.currencyRatio, this.props.currencyFromName)}
      </div>
    );
  }

  resultStyles() {
    const visibility = this.props.exchangeAmount ? 'visible' : 'hidden';
    return { visibility };
  }

  render() {
    return (
      <div className="currency-slot-container to-currency">

        <Currency
          currencyName={this.props.currencyName}
          currencyTotalAmount={this.props.currencyTotalAmount}>
        </Currency>

        <div className="exchange-result-container">
          <div
            className="exchange-result"
            style={this.resultStyles()}>
            {this.formattedResult}
          </div>
          {this.ratio()}
        </div>

      </div>
    );
  }
}
