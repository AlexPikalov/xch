import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopPanel from './TopPanel';
import CurrencyFromSlot from './CurrencyFromSlot';
import CurrencyToSlot from './CurrencyToSlot';
import { Swipeable } from './Swipeable';
import {
  sellAmount as updateSellAmount,
  updateRates,
  buyCurrency,
  sellCurrency
} from './exchangeActions';
import config from '../shared/config';

import './Exchange.css';

const mapStateToProps = state => {
  return {
    sellCurrencyName: state.exchange.sellCurrencyName,
    sellCurrencyAmount: state.exchange.sellCurrencyAmount,
    userValet: state.user.walet,
    buyCurrencyName: state.exchange.buyCurrencyName,
    rates: state.exchange.currencyRates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSellAmount: amount => dispatch(updateSellAmount(amount)),
    updateRates: () => {
      const url = `${config.exchangeApiUrl}?app_id=${config.appId}`
      dispatch(updateRates(url));
    },
    setCurrencyBuy: currency => {
      dispatch(buyCurrency(currency));
    },
    setCurrencySell: currency => {
      dispatch(sellCurrency(currency));
    }
  }
};

export class Exchange extends Component {
  componentWillMount() {
    this.props.updateRates();
    this.pollId = setInterval(() => {
      this.props.updateRates();
    }, config.pollIntervalMs);
  }

  compnentWillUnmount() {
    clearInterval(this.pollId);
  }

  get sellCurrencyTotalAmount() {
    return this.currencyTotalAmount(this.props.sellCurrencyName);
  }

  get buyCurrencyTotalAmount() {
    return this.currencyTotalAmount(this.props.buyCurrencyName);
  }

  get exchangeDisabled() {
    return !this.props.sellCurrencyAmount
      || this.props.sellCurrencyName === this.props.buyCurrencyName
      || this.props.sellCurrencyAmount > this.sellCurrencyTotalAmount;
  }

  get allCurrencies() {
    return this.props.userValet ? Object.keys(this.props.userValet).sort() : [];
  }

  ratioFor(buy, sell) {
    return this.props.rates
      ? this.props.rates[buy] / this.props.rates[sell]
      : 0;
  }

  exchangeAmountFor(buy, sell) {
    return this.props.sellCurrencyAmount * this.ratioFor(buy, sell);
  }

  exchange() {
    alert(`You want to exchange
      ${this.props.sellCurrencyAmount} ${this.props.sellCurrencyName}
      to ${this.props.buyCurrencyName}`);
  }

  cancel() {
    this.props.updateSellAmount(0);
  }

  onAmountChange(newAmount) {
    this.props.updateSellAmount(newAmount);
  }

  onToChange(idx) {
    const name = this.allCurrencies[idx];
    this.props.setCurrencyBuy(name);
  }

  onFromChange(idx) {
    const name = this.allCurrencies[idx];
    this.props.setCurrencySell(name);
  }

  currencyTotalAmount(name) {
    return this.props.userValet
      ? (this.props.userValet[name] || 0)
      : 0
  }

  renderToSlot(currency) {
    return <CurrencyToSlot
            key={currency}
            currencyName={currency}
            currencyFromName={this.props.sellCurrencyName}
            currencyTotalAmount={this.buyCurrencyTotalAmount}
            exchangeAmount={this.exchangeAmountFor(currency, this.props.sellCurrencyName)}
            currencyRatio={this.ratioFor(currency, this.props.sellCurrencyName)}
          />;
  }

  renderFromSlot(currency) {
    return <CurrencyFromSlot
          key={currency}
          currencyName={currency}
          currencyTotalAmount={this.sellCurrencyTotalAmount}
          sellCurrencyAmount={this.props.sellCurrencyAmount}
          onAmountChange={amount => this.onAmountChange(amount)}
        />;
  }

  render() {
    return (
      <div className="exchange-container">

        <TopPanel
          currencyName={this.props.buyCurrencyName}
          currencyFromName={this.props.sellCurrencyName}
          exchangeDisabled={this.exchangeDisabled}
          currencyRatio={this.ratioFor(this.props.buyCurrencyName, this.props.sellCurrencyName)}
          onExchange={() => this.exchange()}
          onCancel={() => this.cancel()}
        />

        <Swipeable
          className="container-from"
          currencies={this.allCurrencies}
          currencyName={this.props.sellCurrencyName}
          onChange={name => this.onFromChange(name)}>
          { this.allCurrencies.map(curr => this.renderFromSlot(curr)) }
        </Swipeable>

        <div className="divider"></div>  

        <Swipeable
          currencies={this.allCurrencies}
          currencyName={this.props.buyCurrencyName}
          onChange={name => this.onToChange(name)}>
          { this.allCurrencies.map(curr => this.renderToSlot(curr)) }
        </Swipeable>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
