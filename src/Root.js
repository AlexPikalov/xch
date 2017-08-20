import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import Exchange from './exchange/Exchange';

export const Root = ({store}) => {
    const defaultPage = () => <Redirect to="/exchange" />;
    return <Provider store={store}>
        <Router>
            <App>
                <Route exact path="/exchange" component={Exchange} />
                {/* In case we would have many routes it would be a fallback page */}
                <Route path="/" render={defaultPage} />
            </App>
        </Router>
    </Provider>
};