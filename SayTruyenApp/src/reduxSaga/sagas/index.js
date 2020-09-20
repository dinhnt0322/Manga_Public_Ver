import { all } from 'redux-saga/effects';
import { watchInitTheme, watchUpdateTheme } from './CommonSagas';

export default function* rootSaga() {
  yield all([watchInitTheme(), watchUpdateTheme()]);
}
