import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './Root';
import { store } from './shared/AppStore'

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
