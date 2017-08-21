import {
  XCHANGE_SET_BUY_CURRENCY,
  XCHANGE_SET_SELL_AMOUNT,
  XCHANGE_SET_SELL_CURRENCY,
  XCHANGE_SET_BUY_AMOUNT,
  XCHANGE_SET_RATES,
  XCHANGE_MAKE_EXCHANGE
} from './exchangeActions';

const sellCurrencyName = 'USD';
const buyCurrencyName = 'EUR';

export function exchangeReducer(
  state = { sellCurrencyName, buyCurrencyName },
  action
) {
  switch (action.type) {
    case XCHANGE_SET_SELL_CURRENCY:
      return { ...state, sellCurrencyName: action.name };
    case XCHANGE_SET_SELL_AMOUNT:
      return { ...state, sellCurrencyAmount: action.amount };
    case XCHANGE_SET_BUY_CURRENCY:
      return { ...state, buyCurrencyName: action.name };
    case XCHANGE_SET_BUY_AMOUNT:
      return { ...state, buyCurrencyAmount: action.amount };
    case XCHANGE_SET_RATES:
      return { ...state, currencyRates: action.rates };
    default:
      return state;
  }
}
