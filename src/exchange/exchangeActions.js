import fetch from 'isomorphic-fetch';

export const XCHANGE_SET_SELL_AMOUNT = 'EXCHANGE.SET_SELL_AMOUNT';

export const XCHANGE_SET_SELL_CURRENCY = 'EXCHANGE.SET_SELL_CURRENCY';

export const XCHANGE_SET_BUY_CURRENCY = 'EXCHANGE.SET_BUY_CURRENCY';

export const XCHANGE_SET_RATES = 'EXCHANGE.SET_RATES';

export function sellAmount(amount) {
  return { type: XCHANGE_SET_SELL_AMOUNT, amount };
}

export function sellCurrency(name) {
  console.log('sellCurrency', name);
  return { type: XCHANGE_SET_SELL_CURRENCY, name };
}

export function buyCurrency(name) {
  return { type: XCHANGE_SET_BUY_CURRENCY, name };
}

export function setRates(rates) {
  return { type: XCHANGE_SET_RATES, rates };
}

export function updateRates(ratesUrl) {
  return dispatch => {
    return fetch(ratesUrl)
      .then(res => res.json())
      .then(rates => dispatch(setRates(rates.rates)))
      .catch(err => alert(err.message));
  };
}
