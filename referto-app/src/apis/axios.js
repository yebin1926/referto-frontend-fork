
import axios from "axios";
import { getCookie } from "../utils/cookie";

// baseURL, credential, 헤더 세팅 
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');

// 누구나 접근 가능한 API들 
export const instance = axios.create();

// Token 있어야 접근 가능한 API들 - 얘는 토큰을 넣어줘야 해요
export const instanceWithToken = axios.create();

// instanceWithToken에는 쿠키에서 토큰을 찾고 담아줍시다!
instanceWithToken.interceptors.request.use(
  // 요청을 보내기전 수행할 일
  (config) => {
    const accessToken = getCookie('access_token');

    if (!accessToken) {
      // token 없으면 리턴
      return;
    } else {
      // token 있으면 헤더에 담아주기 (Authorization은 장고에서 JWT 토큰을 인식하는 헤더 key)
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },

  // 클라이언트 요청 오류 났을 때 처리
  (error) => {
    // 콘솔에 찍어주고, 요청을 보내지 않고 오류를 발생시킴
    console.log("Request Error!!");
    return Promise.reject(error);
  }
);

instanceWithToken.interceptors.response.use(
  (response) => {
    // 서버 응답 데이터를 프론트에 넘겨주기 전 수행할 일 
    console.log("Interceptor Response!!");
    return response;
  },
  (error) => {
    // 서버가 오류를 응답했을 때 처리 - 콘솔 찍어주고, 프론트에게 보내지 않고 오류를 발생시킴
    console.log("Response Error!!");
    return Promise.reject(error);
  }
);