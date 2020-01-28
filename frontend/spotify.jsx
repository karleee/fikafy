import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './root';

import {signup, login, logout} from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  window.signup = signup;
  window.login = login;
  window.logout = logout;

  const root = document.getElementById('root');
  const store = configureStore();

  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(<Root store={store} />, root);
});