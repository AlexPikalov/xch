import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import './Swipeable.css';

export function Swipeable(props) {
  let index = (props.currencies || []).indexOf(props.currencyName);
  index = index > -1 ? index : 0;
  return (
    <div className="swipeable-views-container">
      <SwipeableViews index={index} onChangeIndex={newIdx => props.onChange(newIdx)}>
        {props.children}
      </SwipeableViews>
      <div className="dots-container">
        {props.currencies.map(c => <Dot key={c} active={c === props.currencyName}/>)}
      </div>
    </div>
  );
}

function Dot(props) {
  return <div className={props.active && 'active'}></div>
}
