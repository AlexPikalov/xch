import React, { Component } from 'react';

import {
  currencySymbols,
  defaultCurrencySymbol,
  fomatCurrencyValue
} from './currency-helpers';

export default class Currency extends Component {
  componentWillMount() {
    this.currencySymbols = currencySymbols;
    this.defaultCurrencySymbol = defaultCurrencySymbol;
  }

  get name() {
    return (this.props.currencyName || '').toUpperCase();
  }

  get totalAmount() {
    return fomatCurrencyValue(this.props.currencyTotalAmount, this.name);
  }

  render() {
    return (
      <div className="currency-container">
        <div className="currency-name">{this.name}</div>
        <div className="currency-total-amount">
          You have {this.totalAmount}
        </div>
      </div>
    );
  }
}
