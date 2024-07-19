import { instance, instanceWithToken } from "./axios";

// Account 관련 API들
export const signIn = async (data) => {
  const response = await instance.post("api/account/signin/", data);
  if (response.status === 200) {
    window.location.href = "/";
  } else {
    console.log("[ERROR] error while signing in");
  }
};

export const signUp = async (data) => {
  const response = await instance.post("api/account/signup/", data);
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    console.log("[ERROR] error while signing up");
  }
  return response;
};

export const naverSignIn = async () => {
  window.location.href = "http://localhost:8000/accounts/naver/login/";
  const response = await instance.get("accounts/naver/login/");
  return response;
};

// Assignments 관련 API들
export const getAssignments = async () => {
  try {
    const response_user = await instanceWithToken.get("api/account/info/");
  } catch (error) {
    console.log("No Access Token");
    return [];
  }
  const response = await instanceWithToken.get("api/assignments/");
  if (response.status === 200) {
    console.log("ASSIGNMENT GET SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] error while getting assignment");
  }
};

//   export const getAssignment = async (id) => {
//     const response = await instance.get(`/assignments/${id}/`);
//     return response.data;
//   };

export const createAssignment = async (data) => {
  const response = await instanceWithToken.post("api/assignments/", data);
  if (response.status === 201) {
    console.log("ASSIGNMENT CREATE SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] error while creating assignment");
  }
};

export const updateAssignment = async (id, data) => {
  const response = await instanceWithToken.put(`api/assignments/${id}/`, data);
  if (response.status === 200) {
    console.log("ASSIGNMENT UPDATE SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] error while updating assignment");
  }
};

export const deleteAssignment = async (id) => {
  const response = await instanceWithToken.delete(`api/assignments/${id}/`);
  if (response.status === 200) {
    console.log("ASSIGNMENT DELETE SUCCESS");
  } else {
    console.log("[ERROR] error while deleting assignment");
  }
};

// Papers 관련 API

export const uploadPaper = async (formData, config) => {
  const response = await instanceWithToken.post(
    "api/papers/",
    formData,
    config
  );
  if (response.status === 201) {
    console.log("PAPER UPLOAD SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] error while uploading paper");
  }
};

// paper 수정은 현재 없음
// export const updatePaper = async (id, data) => {
//     const response = await instanceWithToken.put(`/paper/${id}/`, data);
//     if (response.status === 200) {
//       console.log("PAPER UPDATE SUCCESS");
//     } else {
//       console.log("[ERROR] error while updating assignment");
//     }
//   };

export const deletePaper = async (id) => {
  const response = await instanceWithToken.delete(`api/papers/${id}/`);
  if (response.status === 200) {
    console.log("PAPER DELETE SUCCESS");
  } else {
    console.log("[ERROR] error while deleting paper");
  }
};

// PaperInfos 관련 API들

export const getPaperInfos = async (assignment_id) => {
  try {
    const response_user = await instanceWithToken.get("api/account/info/");
  } catch (error) {
    console.log("No Access Token");
    return [];
  }
  const response = await instanceWithToken.get(
    `api/paperinfo/assignment/${assignment_id}/`
  );
  if (response.status === 200) {
    console.log("PAPERINFO GET SUCCESS");
    //console.log("Response Data:", JSON.stringify(response.data, null, 2));
    return response.data;
  } else {
    console.log("[ERROR] error while getting PAPERINFO");
  }
};

export const uploadPaperInfo = async (paper_id) => {
  const response = await instanceWithToken.post(`api/paperinfo/${paper_id}/`);
  if (response.status === 200) {
    console.log("PAPERINFO UPLOAD SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] error while uploading paperinfo");
  }
};

export const updatePaperInfo = async (paper_id, data) => {
  const response = await instanceWithToken.put(
    `api/paperinfo/${paper_id}/`,
    data
  );
  if (response.status === 200) {
    console.log("PAPERINFO UPDATE SUCCESS");
  } else {
    console.log("[ERROR] error while updating paperinfo");
  }
};

// Memos 관련 API들

export const getMemo = async (paperId) => {
  const response = await instanceWithToken.get(`api/papers/${paperId}/memo/`);
  return response.data;
};

export const updateMemo = async (paperId, data) => {
  const response = await instanceWithToken.put(
    `/papers/${paperId}/memo/`,
    data
  );
  if (response.status === 200) {
    console.log("MEMO UPDATE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while updating memo");
  }
};

//User 관련 API
export const getUser = async () => {
  const response = await instanceWithToken.get("api/account/info/");
  if (response.status === 200) {
    console.log("USER GET SUCCESS");
  } else {
    console.log("[ERROR] error while getting user");
  }
  return response.data;
};
