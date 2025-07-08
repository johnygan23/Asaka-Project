import { requestWrapper } from "./AuthAPI";

const PROJECT_API_URL = "http://localhost:5179/api/Notification";

export const getAllNotifications = async () => {
    const response = await requestWrapper(`${PROJECT_API_URL}/all`, "GET");
    const data = response?.data || response;
    return Array.isArray(data) ? data : [];
};