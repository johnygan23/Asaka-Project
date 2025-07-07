import { requestWrapper } from "./AuthAPI";
import { getUserId } from "./AuthAPI";

const PROJECT_TASK_API_URL = "http://localhost:5179/api/ProjectTask";

export const getAllProjectTasks = async () => {
    return await requestWrapper(PROJECT_TASK_API_URL, "GET");
}

export const getAllProjectTasksByProjectId = async (projectTaskId) => {
    return await requestWrapper(`${PROJECT_TASK_API_URL}/${projectTaskId}`, "GET");
};

export const getAssignedProjectTasks = async (userId) => {
    return await requestWrapper(`${PROJECT_TASK_API_URL}/assigned-tasks/${userId}`, "GET");
}

export const getOwnedProjectTasks = async (userId) => {
    return await requestWrapper(`${PROJECT_TASK_API_URL}/owned-tasks/${userId}`, "GET");
}

export const addProjectTask = async (projectId, data) => {
    var userId = getUserId();
    if (userId == null) {
        return;
    }
    return await requestWrapper(`${PROJECT_TASK_API_URL}/${projectId}/${userId}`, "POST", {
        ...data,
    });
}

export const addProjectSubTask = async (projectTaskId, data) => {
    var userId = getUserId();
    if (userId == null) {
        return;
    }
    return await requestWrapper(`${PROJECT_TASK_API_URL}/${projectTaskId}/${userId}/subtask`, "POST", {
        ...data,
    });
}

export const assignUserToProjectTask = async (projectTaskId, userId) => {
    return await requestWrapper(`${PROJECT_TASK_API_URL}/assign-user/${projectTaskId}/${userId}`, "POST");
}

export const removeUserFromProjectTask = async (projectTaskId, userId) => {
    return await requestWrapper(`${PROJECT_TASK_API_URL}/remove-user/${projectTaskId}/${userId}`, "DELETE");
}

export const removeProjectTask = async (projectTaskId) => {
    return await requestWrapper(`${PROJECT_TASK_API_URL}/${projectTaskId}`, "DELETE");
}

export const updateProjectTask = async (projectTaskId, data) => {
    return await requestWrapper(`${PROJECT_TASK_API_URL}/${projectTaskId}`, "PUT", {
        ...data,
    });
}