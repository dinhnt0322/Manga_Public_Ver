import React from 'react';
import _ from 'lodash';
import { CommonActions, StackActions } from '@react-navigation/native';

let _drawer = {};

const navigationRef = React.createRef();

const navigate = (routeName, params = {}) => {
  try {
    if (navigationRef.current) {
      navigationRef.current.dispatch(
        CommonActions.navigate({
          name: routeName,
          params,
        })
      );
    }
  } catch (e) {}
};

const goBack = () => {
  try {
    if (navigationRef.current && navigationRef.current.canGoBack) {
      navigationRef.current.dispatch(CommonActions.goBack());
    }
  } catch (e) {}
};

const popToTop = () => {
  try {
    if (navigationRef.current) {
      navigationRef.current.dispatch(StackActions.popToTop());
    }
  } catch (e) {}
};

const push = (routeName, params = {}) => {
  try {
    if (navigationRef.current) {
      navigationRef.current.dispatch(StackActions.push(routeName, params));
    }
  } catch (e) {}
};

const setDrawer = (drawerRef, currentScreenId) => {
  _drawer[currentScreenId] = drawerRef;
};

const openDrawer = currentScreenId => {
  if (_drawer[currentScreenId]) {
    _drawer[currentScreenId].openDrawer();
  }
};

const closeDrawer = currentScreenId => {
  if (_drawer[currentScreenId]) {
    _drawer[currentScreenId].closeDrawer();
  }
};

export default {
  navigationRef,
  navigate,
  goBack,
  popToTop,
  push,
  setDrawer,
  openDrawer,
  closeDrawer,
};
