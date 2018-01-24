import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './styles/index.css';

import { Provider } from 'react-redux';
import AppRoutes from './routes';
import store from './store';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <AppRoutes />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
