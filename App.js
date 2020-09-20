import React from 'react';
import { StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import AppReducers from '@ReduxSaga/reducers/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@ReduxSaga/sagas/index';
import Apploader from './src/loader';
import HomeScreen from './src/screens/HomeScreen';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(AppReducers, applyMiddleware(...[sagaMiddleware]));
const App = () => {
  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Apploader />
    </Provider>
  );
};
sagaMiddleware.run(rootSaga);
export default App;
