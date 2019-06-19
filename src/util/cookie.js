import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const TOKEN_LANG = 'language';

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token);
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}

export function getLanguage() {
  return Cookies.get(TOKEN_LANG) || process.env.VUE_APP_I18N_LOCALE;
}

export function setLanguage(lang) {
  Cookies.set(TOKEN_LANG, lang);
}
