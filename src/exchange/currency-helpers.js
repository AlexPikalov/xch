// TODO: probably would be better to kepp on back end
export const currencySymbols = {
  GBP: '£',
  USD: '$',
  EUR: '€'
};

export const defaultCurrencySymbol = '';

export function fomatCurrencyValue(amount = 0, currency = null) {
  const symbol = currencySymbols[currency]
      || defaultCurrencySymbol;
  amount = amount ? amount.toFixed(2) : '0';
  return `${symbol}${amount}`;
}
