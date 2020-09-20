import { Alert, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { put, takeLatest, takeEvery, select, call } from 'redux-saga/effects';
import { themeColor } from '../util';

import { commonTypes } from '../actions/CommonActions';

export function* updateTheme({ params, cb }) {
  let { name } = yield select(state => state.common.theme);
  name = name === 'light' ? 'dark' : 'light';
  yield AsyncStorage.setItem('THEME', name);
  yield put({
    type: commonTypes.UPDATE_THEME_SUCCESS,
    payload: { name, value: themeColor[name] },
  });
  cb && cb();
}

export function* initTheme({ params, cb }) {
  let { theme } = params;
  if (!theme) {
    theme = 'light';
  }
  yield put({
    type: commonTypes.INIT_THEME_SUCCESS,
    payload: { name: theme, value: themeColor[theme] },
  });
  cb && cb();
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export function* watchInitTheme() {
  yield takeLatest(commonTypes.INIT_THEME, initTheme);
}

export function* watchUpdateTheme() {
  yield takeLatest(commonTypes.UPDATE_THEME, updateTheme);
}
