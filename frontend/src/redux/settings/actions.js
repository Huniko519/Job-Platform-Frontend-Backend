import { CHANGE_LOCALE, SET_COUNTRY_CODE } from '../actions';

export const changeLocale = (locale) => {
  localStorage.setItem('currentLanguage', locale);
  return {
    type: CHANGE_LOCALE,
    payload: locale,
  };
};

export const setCountryCode = (code) => {
  return {
    type: SET_COUNTRY_CODE,
    payload: code,
  };
}