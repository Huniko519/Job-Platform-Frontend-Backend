export const SET_TOKEN_DATA = "SET_TOKEN_DATA";
export const SET_USER_DATA = "SET_USER_DATA";
export const GET_VALIDATE_DATA = "GET_VALIDATE_DATA";
export const SAVE_USER_DATA = "SAVE_USER_DATA";

/* SETTINGS */
export const CHANGE_LOCALE = "CHANGE_LOCALE";

/* AUTH */
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";
export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";
export const LOGOUT_USER = "LOGOUT_USER";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

/* MENU */
export const MENU_SET_CLASSNAMES = "MENU_SET_CLASSNAMES";
export const MENU_CONTAINER_ADD_CLASSNAME = "MENU_CONTAINER_ADD_CLASSNAME";
export const MENU_CLICK_MOBILE_MENU = "MENU_CLICK_MOBILE_MENU";
export const MENU_CHANGE_DEFAULT_CLASSES = "MENU_CHANGE_DEFAULT_CLASSES";
export const MENU_CHANGE_HAS_SUB_ITEM_STATUS =
  "MENU_CHANGE_HAS_SUB_ITEM_STATUS";

export const SET_COUNTRY_CODE = "SET_COUNTRY_CODE";

/* Offer */

export const SET_OFFERS = "SET_OFFERS";

/** Jobs */

export const SET_JOB = "SET_JOB";

/**contractors */
export const SET_CONTRACTORS = "SET_CONTRACTORS";
export const DELETE_CONTRACTORS = "DELETE_CONTRACTORS";
export const UPDATE_CONTRACTORS = "UPDATE_CONTRACTORS,";

/**superadmins */
export const SET_SUPERADMINS = "SET_SUPERADMINS";
export const DELETE_SUPERADMINS = "DELETE_SUPERADMINS";

/**clients */
export const SET_CLIENTS = "SET_CLIENTS";
export const DELETE_CLIENTS = "DELETE_CLIENTS";

export * from "./common/actions";
export * from "./menu/actions";
export * from "./settings/actions";
