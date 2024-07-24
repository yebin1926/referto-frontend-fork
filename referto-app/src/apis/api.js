import { instance, instanceWithToken } from "./axios";

// User 관련 API들
export const signIn = async (data) => {
  const response = await instance.post("api/user/auth/", data);
  if (response.status === 200) {
  } else {
    console.log("[ERROR] error while signing in");
  }
};

export const signUp = async (data) => {
  const response = await instance.post("api/user/register/", data);
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    console.log("[ERROR] error while signing up");
  }
  return response;
};

export const getUser = async () => {
  const response = await instanceWithToken.get("api/user/auth/");
  if (response.status === 200) {
    console.log("USER GET SUCCESS");
  } else {
    console.log("[ERROR] error while getting user");
  }
  return response.data;
};

// export const naverSignIn = async() => {
//   window.location.href = 'http://localhost:8000/naverlogin/'
//   const response = await instance.get("naverlogin/");
//   return response;
// }

// Assignments 관련 API들
export const getAssignments = async () => {
  const response = await instanceWithToken.get("api/assignments/");
  if (response.status === 200) {
    console.log("ASSIGNMENTS GET SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] error while getting assignments");
  }
};

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

export const getAssignment = async (id) => {
  const response = await instanceWithToken.get(`api/assignments/${id}/`);
  if (response.status === 200) {
    console.log("ASSIGNMENTSTYLE GET SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] error while getting ASSIGNMENTSTYLE");
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

export const getPaper = async (paperId) => {
  try {
    const response = await instanceWithToken.get(`api/papers/${paperId}/`, {
      responseType: "blob",
    });

    if (response.status === 200) {
      console.log("PAPER GET SUCCESS");
      const blob = response.data;
      return URL.createObjectURL(blob); // Create a URL for the blob
    } else {
      console.log("[ERROR] Error while getting PAPER");
    }
  } catch (error) {
    console.error("Failed to fetch the paper:", error);
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

export const deletePaper = async (paper_id) => {
  const response = await instanceWithToken.delete(`api/papers/${paper_id}/`);
  if (response.status === 204) {
    console.log("PAPER DELETE SUCCESS");
  } else {
    console.log("[ERROR] error while deleting paper");
  }
};

// PaperInfos AI 생성 관련 API들

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
    return response.data;
  } else {
    console.log("[ERROR] error while updating paperinfo");
  }
};

// PaperInfos 사람이 조회, 수정, 삭제 관련 API들

export const getPaperInfos = async (assignment_id) => {
  const response = await instanceWithToken.get(
    `api/paperinfo/assignment/${assignment_id}/`
  );
  if (response.status === 200) {
    console.log("PAPERINFOS GET SUCCESS");
    //console.log("Response Data:", JSON.stringify(response.data, null, 2));
    return response.data;
  } else {
    console.log("[ERROR] error while getting PAPERINFOS");
  }
};

export const getPaperInfo = async (assignment_id, paper_id) => {
  const response = await instanceWithToken.get(
    `api/paperinfo/assignment/${assignment_id}/${paper_id}/`
  );
  if (response.status === 200) {
    console.log("PAPERINFO GET SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] error while getting PAPERINFO");
  }
};

// Memos 관련 API들

export const getMemo = async (paperId) => {
  const response = await instanceWithToken.get(`api/papers/${paperId}/memo/`);
  return response.data;
};

export const createMemo = async (paperId, data) => {
  const response = await instanceWithToken.post(
    `api/papers/${paperId}/memo/`,
    data
  );
  if (response.status === 201) {
    console.log("MEMO SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] error while creating memo");
  }
};

export const updateMemo = async (paperId, data) => {
  const response = await instanceWithToken.put(
    `api/papers/${paperId}/memo/`,
    data
  );
  if (response.status === 200) {
    console.log("MEMO UPDATE SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] error while updating memo");
  }
};
