import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreSession, csrfFetch } from './store/csrf';
import { fetchUser, createUser, updateUser, deleteUser, loginUser, logoutUser } from './store/usersReducer';

const initializeApp = () => {

  let initialState = {};
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  if (currentUser) {
    initialState.users = {
      [currentUser.id]: currentUser
    }
  };

  const store = configureStore(initialState);

  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
    window.state = store.getState;
    window.csrfFetch = csrfFetch;
    window.fetchUser = fetchUser;
    window.createUser = createUser;
    window.updateUser = updateUser;
    window.deleteUser = deleteUser;
    window.loginUser = loginUser;
    window.logoutUser = logoutUser;
  };

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

restoreSession().then(initializeApp);