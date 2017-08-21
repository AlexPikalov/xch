import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopPanel from './TopPanel';
import CurrencySlot from './CurrencySlot';
import { Swipeable } from './Swipeable';
import { ExchangeValidationRules } from './ExchangeValidationRules';
import {
  sellAmount as updateSellAmount,
  updateRates,
  buyCurrency,
  sellCurrency,
  buyAmount
} from './exchangeActions';
import { makeExchange } from '../shared/user/userActions';
import config from '../shared/config';
import { roundValue } from './currency-helpers';

import './Exchange.css';

const mapStateToProps = state => {
  return {
    sellCurrencyName: state.exchange.sellCurrencyName,
    sellCurrencyAmount: state.exchange.sellCurrencyAmount,
    userValet: state.user.walet,
    buyCurrencyName: state.exchange.buyCurrencyName,
    buyCurrencyAmount: state.exchange.buyCurrencyAmount,
    rates: state.exchange.currencyRates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSellAmount: amount => dispatch(updateSellAmount(amount)),
    updateBuyAmount: amount => dispatch(buyAmount(amount)),
    updateRates: () => {
      const url = `${config.exchangeApiUrl}?app_id=${config.appId}`
      dispatch(updateRates(url));
    },
    setCurrencyBuy: currency => {
      dispatch(buyCurrency(currency));
    },
    setCurrencySell: currency => {
      dispatch(sellCurrency(currency));
    },
    makeExchange: exchange => {
      dispatch(makeExchange(exchange))
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
    const validationRules = [
      ExchangeValidationRules.isNumerical(this.props.sellCurrencyAmount),
      ExchangeValidationRules.isLessOrEqual(
        this.props.sellCurrencyAmount,
        this.sellCurrencyTotalAmount
      ),
      ExchangeValidationRules.notZero(this.props.buyCurrencyAmount),
      ExchangeValidationRules.notSame(
        this.props.sellCurrencyName,
        this.props.buyCurrencyName
      )
    ];
    return ExchangeValidationRules.validate(validationRules).length > 0;
  }

  get allCurrencies() {
    return this.props.userValet ? Object.keys(this.props.userValet).sort() : [];
  }

  ratioFor(buy, sell) {
    return this.props.rates ? this.props.rates[buy] / this.props.rates[sell] : 0;
  }

  exchange() {
    const exchange = {
      sell: {
        name: this.props.sellCurrencyName,
        amount: this.props.sellCurrencyAmount
      },
      buy: {
        name: this.props.buyCurrencyName,
        amount: this.props.buyCurrencyAmount
      }
    };
    this.props.makeExchange(exchange);
    this.cancel();
  }

  cancel() {
    this.props.updateSellAmount(0);
    this.props.updateBuyAmount(0);
  }

  onSellAmountChange(newAmount) {
    const buyAmount = newAmount
      * this.ratioFor(this.props.buyCurrencyName, this.props.sellCurrencyName);

    this.props.updateSellAmount(newAmount);
    this.props.updateBuyAmount(roundValue(buyAmount));
  }

  onBuyAmountChange(newAmount) {
    const sellAmount = newAmount
      / this.ratioFor(this.props.buyCurrencyName, this.props.sellCurrencyName);

    this.props.updateSellAmount(roundValue(sellAmount));
    this.props.updateBuyAmount(newAmount);
  }

  onBuyNameChange(idx) {
    const name = this.allCurrencies[idx];
    const buyAmount = this.props.sellCurrencyAmount
      * this.ratioFor(name, this.props.sellCurrencyName);

    this.props.setCurrencyBuy(name);
    this.props.updateBuyAmount(roundValue(buyAmount));
  }

  onSellNameChange(idx) {
    const name = this.allCurrencies[idx];
    const buyAmount = this.props.sellCurrencyAmount
      * this.ratioFor(this.props.buyCurrencyName, name);
    this.props.setCurrencySell(name);
    this.props.updateBuyAmount(roundValue(buyAmount));
  }

  currencyTotalAmount(name) {
    return this.props.userValet ? (this.props.userValet[name] || 0) : 0
  }

  renderToSlot(currency) {
    return <CurrencySlot
              key={currency}
              currencyName={currency}
              sellingInput={false}
              currencyFromName={this.props.sellCurrencyName}
              currencyTotalAmount={this.buyCurrencyTotalAmount}
              amount={this.props.buyCurrencyAmount}
              onAmountChange={amount => this.onBuyAmountChange(amount)}
              currencyRatio={1 / this.ratioFor(currency, this.props.sellCurrencyName)}
            />;
  }

  renderFromSlot(currency) {
    return <CurrencySlot
              key={currency}
              currencyName={currency}
              sellingInput={true}
              currencyTotalAmount={this.sellCurrencyTotalAmount}
              amount={this.props.sellCurrencyAmount}
              onAmountChange={amount => this.onSellAmountChange(amount)}
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
          onChange={name => this.onSellNameChange(name)}>
          { this.allCurrencies.map(curr => this.renderFromSlot(curr)) }
        </Swipeable>

        <div className="divider"></div>  

        <Swipeable
          currencies={this.allCurrencies}
          currencyName={this.props.buyCurrencyName}
          onChange={name => this.onBuyNameChange(name)}>
          { this.allCurrencies.map(curr => this.renderToSlot(curr)) }
        </Swipeable>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);
