import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

// 쿠키 정보 가져오는 함수
export const getCookie = (name) => {
  return cookies.get(name);
};

// 쿠키 정보 삭제하는 함수
export const removeCookie = (name) => {
  cookies.remove(name);
};
