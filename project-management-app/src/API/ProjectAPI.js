import { requestWrapper } from "./AuthAPI";
import { getUserId } from "./AuthAPI";

const PROJECT_API_URL = "http://localhost:5179/api/Project";

export const getAllProjects = async () => {
  return await requestWrapper(PROJECT_API_URL, "GET");
};

export const getAllProjectsByUserId = async () => {
  var userId = await getUserId();
  if (userId == null) {
    return;
  }
  return await requestWrapper(`${PROJECT_API_URL}/assigned-projects/${userId}`, "GET");
};

export const getProjectById = async (projectId) => {
  return await requestWrapper(`${PROJECT_API_URL}/${projectId}`, "GET");
};

export const addProject = async (data) => {
  var userId = await getUserId();
  if (userId == null) {
    return;
  }
  return await requestWrapper(`${PROJECT_API_URL}/${userId}`, "POST", {
    ...data,
  });
};

export const updateProject = async (projectId, data) => {
  return await requestWrapper(`${PROJECT_API_URL}/${projectId}`, "PUT", {
    ...data,
  });
};

export const deleteProject = async (projectId) => {
  return await requestWrapper(`${PROJECT_API_URL}/${projectId}`, "DELETE");
};