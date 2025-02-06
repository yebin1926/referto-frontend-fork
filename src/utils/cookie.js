import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const setCookie = (name, value, options = {}) => {
  const {
    path = '/',
    secure = process.env.NODE_ENV === 'production',
    sameSite = 'Lax',
    maxAge = 7 * 24 * 60 * 60, // 7 days
  } = options;

  document.cookie = `${name}=${value}; path=${path}; secure=${secure}; samesite=${sameSite}; max-age=${maxAge}`;
};

export const removeCookie = (name) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
