import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
// import AuthProvider from './authentication/AuthProvider';
import { Provider } from 'react-redux';
import { store } from './store';

const root = createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <AuthProvider> */}
        <App />
        {/* </Provider> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

