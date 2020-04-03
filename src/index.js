import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import store from 'stores';
import { TranslatorProvider } from 'utils/translator';

import App from './App';
import ScrollToTop from './ScrollToTop';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
          <TranslatorProvider>
            <ScrollToTop>
              <App />
            </ScrollToTop>
          </TranslatorProvider>
      </BrowserRouter>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
