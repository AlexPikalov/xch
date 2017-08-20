import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { exchangeReducer as exchange } from '../exchange/exchangeReducer';
import { userReducer as user } from './user/userReducer';

// let forms = combineForms({ login }, 'forms');
let app = combineReducers({ exchange, user });

export let store = createStore(app, applyMiddleware(thunkMiddleware));
