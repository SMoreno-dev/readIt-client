import React from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';

//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import RootContainer from './containers/RootContainer';

const App = () => {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
}

export default App;
