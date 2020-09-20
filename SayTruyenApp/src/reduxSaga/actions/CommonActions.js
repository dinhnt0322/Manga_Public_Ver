export const commonTypes = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',

  INIT_USER: 'INIT_USER',

  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

  GET_USER: 'GET_USER',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',

  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',

  INIT_THEME: 'INIT_THEME',
  INIT_THEME_SUCCESS: 'INIT_THEME_SUCCESS',

  UPDATE_THEME: 'UPDATE_THEME',
  UPDATE_THEME_SUCCESS: 'UPDATE_THEME_SUCCESS',
};

export function login(params, cb) {
  return {
    type: commonTypes.LOGIN,
    params,
    cb,
  };
}

export function initUser(params, cb) {
  return {
    type: commonTypes.INIT_USER,
    params,
    cb,
  };
}

export function getUser(params, cb) {
  return {
    type: commonTypes.GET_USER,
    params,
    cb,
  };
}

export function logout() {
  return {
    type: commonTypes.LOGOUT,
  };
}

export function updateUser(params, cb) {
  return {
    type: commonTypes.UPDATE_USER,
    params,
    cb,
  };
}

export function initTheme(params, cb) {
  return {
    type: commonTypes.INIT_THEME,
    params,
    cb,
  };
}

export function updateTheme(params, cb) {
  return {
    type: commonTypes.UPDATE_THEME,
    params,
    cb,
  };
}
