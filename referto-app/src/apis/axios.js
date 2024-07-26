import axios from "axios";
import { getCookie } from "../utils/cookie";

axios.defaults.baseURL = "http://localhost:8000/api";
//axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");

// 누구나 접근 가능한 API들
export const instance = axios.create();

// Token 있어야 접근 가능한 API들 - 얘는 토큰을 넣어줘야 해요
export const instanceWithToken = axios.create();

// instanceWithToken에는 쿠키에서 토큰을 찾고 담아줍시다!
instanceWithToken.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("access_token");

    if (!accessToken) {
      return Promise.reject(new Error("No access token found"));
    } else {
      // token 있으면 헤더에 담아주기
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceWithToken.interceptors.response.use(
  (response) => {
    // 서버 응답 데이터를 프론트에 넘겨주기 전 수행할 일
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie("refresh_token");

        if (!refreshToken) {
          return Promise.reject(new Error("No refresh token found"));
        }

        const response = await instance.post("/user/auth/refresh/", {
          refresh: refreshToken,
        });

        if (response.status === 200) {
          const newAccessToken = response.data.access;

          document.cookie = `access_token=${newAccessToken}; path=/; HttpOnly`;

          // Update the Authorization header with the new access token
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// instanceWithToken.interceptors.response.use(
//   (response) => {
//     // 서버 응답 데이터를 프론트에 넘겨주기 전 수행할 일
//     console.log("Interceptor Response:", response);
//     return response;
//   },
//   (error) => {
//     // 서버가 오류를 응답했을 때 처리 - 콘솔 찍어주고, 프론트에게 보내지 않고 오류를 발생시킴
//     console.log("Response Error!!");
//     return Promise.reject(error);
//   }
// );
