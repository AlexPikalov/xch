import { SET_USER_WALET, MAKE_EXCHANGE } from './userActions';

export function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER_WALET:
      return { ...state, walet: action.walet };
    case MAKE_EXCHANGE:
      return makeExchange(state, action.exchange);
    default:
      return state;
  }
}

function makeExchange(state, {sell, buy}) {
  let walet = state.walet;
  const solt = makeSell(walet, { name: sell.name, amount: sell.amount });
  const bought = makeBuy(walet, { name: buy.name, amount: buy.amount });
  walet = { ...walet, ...solt, ...bought };
  return { ...state, walet };
}

function makeSell(walet, { name, amount }) {
  return { [name]: walet[name] - amount };
}

function makeBuy(walet, { name, amount }) {
  return { [name]: walet[name] + amount };
}
