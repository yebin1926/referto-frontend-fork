import { instance, instanceWithToken } from "./axios";
import { store } from "../redux/store";
import { logout } from "../redux/authSlice";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";

// User 관련 API들
export const signIn = async (data) => {
  try {
    store.dispatch(logout());
    removeCookie("access_token");
    removeCookie("refresh_token");

    const response = await instance.post("/user/auth/", data);
    
    if (response.status === 200) {
      
      // response.data 구조 확인
      const { token } = response.data;
      
      if (!token || !token.access_token || !token.refresh_token) {
        throw new Error('Invalid token structure in response');
      }

      // 토큰을 쿠키에 저장
      setCookie("access_token", token.access_token);
      setCookie("refresh_token", token.refresh_token);
      
      // axios 인스턴스의 기본 헤더에 토큰 설정
      instanceWithToken.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
      
      // 토큰 저장 확인
      const savedToken = getCookie("access_token");
      
      if (!savedToken) {
        throw new Error('Failed to save access token');
      }

      return response.data;
    }
    throw new Error("Login failed");
  } catch (error) {
    throw error;
  }
};

export const signUp = async (data) => {
  try {
    const response = await instance.post("/user/register/", data);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    throw new Error("Signup failed");
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await instanceWithToken.get("/user/auth/");
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to get user');
  } catch (error) {
    throw error;
  }
};

// Assignments 관련 API들
export const getAssignments = async () => {
  try {
    const response = await instanceWithToken.get("/assignments/");
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to get assignments');
  } catch (error) {
    throw error;
  }
};

export const createAssignment = async (data) => {
  try {
    const response = await instanceWithToken.post("/assignments/", data);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error('Failed to create assignment');
  } catch (error) {
    throw error;
  }
};

export const updateAssignment = async (id, data) => {
  try {
    const response = await instanceWithToken.put(`/assignments/${id}/`, data);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to update assignment');
  } catch (error) {
    throw error;
  }
};

export const deleteAssignment = async (id) => {
  try {
    const response = await instanceWithToken.delete(`/assignments/${id}/`);
    if (response.status === 204) {
      return true;
    }
    throw new Error('Failed to delete assignment');
  } catch (error) {
    throw error;
  }
};

export const getAssignment = async (id) => {
  try {
    const response = await instanceWithToken.get(`/assignments/${id}/`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to get assignment');
  } catch (error) {
    throw error;
  }
};

// Papers 관련 API

export const uploadPaper = async (formData, config) => {
  try {
    const response = await instanceWithToken.post("/papers/", formData, config);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error('Failed to upload paper');
  } catch (error) {
    throw error;
  }
};

export const getPaper = async (paperId) => {
  try {
    const response = await instanceWithToken.get(`/papers/${paperId}/`, {
      responseType: "blob",
    });

    if (response.status === 200) {
      const blob = response.data;
      return URL.createObjectURL(blob);
    }
    throw new Error('Failed to get paper');
  } catch (error) {
    throw error;
  }
};

export const deletePaper = async (paper_id) => {
  try {
    const response = await instanceWithToken.delete(`/papers/${paper_id}/`);
    if (response.status === 204) {
      return true;
    }
    throw new Error('Failed to delete paper');
  } catch (error) {
    throw error;
  }
};

// PaperInfos AI 생성 관련 API들

export const uploadPaperInfo = async (paper_id) => {
  try {
    const response = await instanceWithToken.post(`/paperinfo/${paper_id}/`);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error('Failed to upload paper info');
  } catch (error) {
    throw error;
  }
};

export const updatePaperInfo = async (paper_id, data) => {
  try {
    const response = await instanceWithToken.put(`/paperinfo/${paper_id}/`, data);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to update paper info');
  } catch (error) {
    throw error;
  }
};

// PaperInfos 사람이 조회, 수정, 삭제 관련 API들

export const getPaperInfos = async (assignment_id) => {
  try {
    const response = await instanceWithToken.get(`/paperinfo/assignment/${assignment_id}/`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to get paper infos');
  } catch (error) {
    throw error;
  }
};

export const getPaperInfo = async (assignment_id, paper_id) => {
  try {
    const response = await instanceWithToken.get(`/paperinfo/assignment/${assignment_id}/${paper_id}/`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to get paper info');
  } catch (error) {
    throw error;
  }
};

// Memos 관련 API들

export const getMemo = async (paperId) => {
  try {
    const response = await instanceWithToken.get(`/papers/${paperId}/memo/`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to get memo');
  } catch (error) {
    throw error;
  }
};

export const createMemo = async (paperId, data) => {
  try {
    const response = await instanceWithToken.post(`/papers/${paperId}/memo/`, data);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error('Failed to create memo');
  } catch (error) {
    throw error;
  }
};

export const updateMemo = async (paperId, data) => {
  try {
    const response = await instanceWithToken.put(`/papers/${paperId}/memo/`, data);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to update memo');
  } catch (error) {
    throw error;
  }
};

// 랜딩 페이지 테스트 api
export const testUploadPaper = async (formData, config) => {
  try {
    const response = await instance.post("/papers/landingpage/", formData, config);
    if (response.status === 200 || response.status === 201) {
      return response;
    }
    throw new Error('Failed to upload test paper');
  } catch (error) {
    throw error;
  }
};

// 소셜 로그인 API들
export const googleSignIn = async () => {
  try {
    // 기존 로그인 정보를 클리어
    store.dispatch(logout());
    removeCookie("access_token");
    removeCookie("refresh_token");

    const backendUrl = "https://api.referto.site";

    const redirectUri = "https://api.referto.site/api/user/google/login/";

    window.location.href = redirectUri;
  } catch (error) {
    throw error;
  }
};

// export const naverSignIn = async () => {
//   const redirectUri = `${process.env.REACT_APP_API_URL}/user/naver/login/`;
//   window.location.href = redirectUri;
// };

// export const kakaoSignIn = async () => {
//   const redirectUri = `${process.env.REACT_APP_API_URL}/user/kakao/login/`;
//   window.location.href = redirectUri;
// };

export const getNotes = async (paperId) => {
  try {
    const response = await instanceWithToken.get(`/notes/${paperId}/`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to get notes');
  } catch (error) {
    throw error;
  }
};

export const createNote = async (paperId, data) => {
  try {
    const response = await instanceWithToken.post(`/notes/${paperId}/`, data);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error('Failed to create note');
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await instanceWithToken.delete(`/notes/detail/${noteId}/`);
    if (response.status === 204) {
      return true;
    }
    throw new Error('Failed to delete note');
  } catch (error) {
    throw error;
  }
};
