import { instance, instanceWithToken } from "./axios";
import { useNavigate } from "react-router-dom";

// Account 관련 API들
export const signIn = async (data) => {
  const response = await instance.post("/account/signin/", data);
  if (response.status === 200) {
    window.location.href = "/";
  } else {
    console.log("[ERROR] error while signing in");
  }
};

export const signUp = async (data) => {
  const response = await instance.post("/account/signup/", data);
  if (response.status === 200 || response.status === 201) {
    window.location.href = "/";
  } else {
    console.log("[ERROR] error while signing up");
  }
  return response;
};

// Assignments 관련 API들
export const getAssignments = async () => {
  const response = await instance.get("/assignments/");
  return response.data;
};

//   export const getAssignment = async (id) => {
//     const response = await instance.get(`/assignments/${id}/`);
//     return response.data;
//   };

export const createAssignment = async (data, navigate) => {
  const response = await instanceWithToken.post("/assignments/", data);
  if (response.status === 201) {
    console.log("ASSIGNMENT CREATE SUCCESS");
    navigate("/");
  } else {
    console.log("[ERROR] error while creating assignment");
  }
};

export const updateAssignment = async (id, data) => {
  const response = await instanceWithToken.put(`/assignments/${id}/`, data);
  if (response.status === 200) {
    console.log("ASSIGNMENT UPDATE SUCCESS");
  } else {
    console.log("[ERROR] error while updating assignment");
  }
};

export const deleteAssignment = async (id) => {
  const response = await instanceWithToken.delete(`/assignments/${id}/`);
  if (response.status === 200) {
    console.log("ASSIGNMENT DELETE SUCCESS");
  } else {
    console.log("[ERROR] error while deleting assignment");
  }
};

// Papers 관련 API

export const uploadPaper = async (formData, navigate) => {
  const response = await instanceWithToken.post("/papers/upload/", formData);
  if (response.status === 201) {
    console.log("PAPER CREATE SUCCESS");
    navigate("/");
  } else {
    console.log("[ERROR] error while creating paper");
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
  const response = await instanceWithToken.delete(`/papers/${id}/`);
  if (response.status === 200) {
    console.log("PAPER DELETE SUCCESS");
  } else {
    console.log("[ERROR] error while deleting paper");
  }
};

// Memos 관련 API들

// PaperInfos 관련 API들
