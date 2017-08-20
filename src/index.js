import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Root } from './Root';
import registerServiceWorker from './registerServiceWorker';
import { store } from './shared/AppStore'

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
