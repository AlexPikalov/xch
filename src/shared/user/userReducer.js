import { SET_USER_WALET } from './userActions';

export function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER_WALET:
      return { ...state, walet: action.walet };
    default:
      return state;
  }
}
