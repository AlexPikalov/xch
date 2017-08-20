export const SET_USER_WALET = 'USER.SET_WALET';

const FAKE_USER_WALET = {
  USD: 1234,
  GBP: 2342,
  EUR: 1
};

export function updateWalet() {
  return dispatch => dispatch(setWalet(FAKE_USER_WALET));
}

export function setWalet(walet) {
  return { type: SET_USER_WALET, walet };
}
