import { defaultLocale, localeOptions } from '../../constants/defaultValues';

import { CHANGE_LOCALE, SET_COUNTRY_CODE } from '../actions';

const INIT_STATE = {
  countryCode: "us",
  locale:
    localStorage.getItem('currentLanguage') &&
    localeOptions.filter(
      (x) => x.id === localStorage.getItem('currentLanguage')
    ).length > 0
      ? localStorage.getItem('currentLanguage')
      : defaultLocale,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.payload };
    case SET_COUNTRY_CODE:
      return { ...state, countryCode: action.payload };
    default:
      return { ...state };
  }
};
