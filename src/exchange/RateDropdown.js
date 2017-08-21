import React from 'react';

import { fomatCurrencyValue, currencySymbols } from './currency-helpers';

import './RateDropdown.css';

export function RateDropdown(props) {
  const smallNums = getSmallNums(props.currencyRatio);
  return (
    <div className="rate-dropdown"
      onClick={() => alert('Not Implemented!')}>
        { currencySymbols[props.currencyName] || '' }1
        =
        { fomatCurrencyValue(props.currencyRatio, props.currencyFromName) }
        { !!smallNums && <small>{smallNums}</small> }
        <i className="dropdown-caret fa fa-caret-down"></i>
    </div>
  );

  function getSmallNums(ratio) {
    ratio *= 100;
    ratio %= 1;
    ratio *= 100;
    return Math.round(ratio);
  }
}
