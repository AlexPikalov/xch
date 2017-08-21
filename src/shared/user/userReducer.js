import { SET_USER_WALET, MAKE_EXCHANGE } from './userActions';

export function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER_WALET:
      return { ...state, walet: action.walet };
    case MAKE_EXCHANGE:
      return makeExchange(state.walet, action.exchange);
    default:
      return state;
  }
}

function makeExchange(walet, {sell, buy}) {
  const solt = makeSell(walet, { sellName, sellAmount });
  const bought = makeSell(walet, { buyName, buyAmount });
  const walet = { ...walet, ...solt, ...bought };
  return { ...state, walet };
}

function makeSell(walet, { sellName, sellAmount }) {
  return { [sellName]: walet[sellName] - sellAmount };
}

function makeBuy(walet, { buyName, buyAmount }) {
  return { [buyName]: walet[buyName] + buyAmount };
}
