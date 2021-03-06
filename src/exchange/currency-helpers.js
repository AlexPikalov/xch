// TODO: probably would be better to kepp on back end
export const currencySymbols = {
  GBP: '£',
  USD: '$',
  EUR: '€'
};

export const defaultCurrencySymbol = '';

export function fomatCurrencyValue(amount = 0, currency = null) {
  const symbol = currencySymbols[currency] || defaultCurrencySymbol;
  amount = amount ? amount.toFixed(2) : '';
  return `${symbol}${amount}`;
}

export function roundValue(value) {
  return Math.round(value * 100) / 100;
}
