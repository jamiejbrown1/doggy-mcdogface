import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { theme } from './theme';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
