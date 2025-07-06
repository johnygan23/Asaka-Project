import axios from 'axios';

const API_URL = 'http://localhost:5173/api/Project';

// Project API Functions
export const ProjectAPI = {
    // Get all projects
    getAllProjects: async () => {
        try {
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    },

    // Get project by ID
    getProjectById: async (projectId) => {
        try {
            const response = await axios.get(`${API_URL}/${projectId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching project:', error);
            throw error;
        }
    },

    // Create new project
    createProject: async (projectData) => {
        try {
            const response = await axios.post(`${API_URL}`, projectData);
            return response.data;
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    },

    // Update project
    updateProject: async (projectId, projectData) => {
        try {
            const response = await axios.put(`${API_URL}/${projectId}`, projectData);
            return response.data;
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    },

    // Delete project
    deleteProject: async (projectId) => {
        try {
            const response = await axios.delete(`${API_URL}/${projectId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    },

    // Get project statistics
    getProjectStats: async (projectId) => {
        try {
            const response = await axios.get(`${API_URL}/${projectId}/stats`);
            return response.data;
        } catch (error) {
            console.error('Error fetching project stats:', error);
            throw error;
        }
    },

    // Get project goals
    getProjectGoals: async (projectId) => {
        try {
            const response = await axios.get(`${API_URL}/${projectId}/goals`);
            return response.data;
        } catch (error) {
            console.error('Error fetching project goals:', error);
            throw error;
        }
    },

    // Update project status
    updateProjectStatus: async (projectId, status) => {
        try {
            const response = await axios.patch(`${API_URL}/${projectId}/status`, { status });
            return response.data;
        } catch (error) {
            console.error('Error updating project status:', error);
            throw error;
        }
    }
};

// Task API Functions
export const TaskAPI = {
    // Get all tasks
    getAllTasks: async () => {
        try {
            const response = await axios.get(`${API_URL}/Tasks`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },

    // Get tasks by project ID
    getTasksByProject: async (projectId) => {
        try {
            const response = await axios.get(`${API_URL}/${projectId}/Tasks`);
            return response.data;
        } catch (error) {
            console.error('Error fetching project tasks:', error);
            throw error;
        }
    },

    // Get task by ID
    getTaskById: async (taskId) => {
        try {
            const response = await axios.get(`${API_URL}/${taskId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching task:', error);
            throw error;
        }
    },

    // Create new task
    createTask: async (taskData) => {
        try {
            const response = await axios.post(`${API_URL}/Tasks`, taskData);
            return response.data;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    },

    // Update task
    updateTask: async (taskId, taskData) => {
        try {
            const response = await axios.put(`${API_URL}/${taskId}`, taskData);
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    // Delete task
    deleteTask: async (taskId) => {
        try {
            const response = await axios.delete(`${API_URL}/${taskId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    },

    // Update task status
    updateTaskStatus: async (taskId, status) => {
        try {
            const response = await axios.patch(`${API_URL}/${taskId}/status`, { status });
            return response.data;
        } catch (error) {
            console.error('Error updating task status:', error);
            throw error;
        }
    },

    // Update task priority
    updateTaskPriority: async (taskId, priority) => {
        try {
            const response = await axios.patch(`${API_URL}/${taskId}/priority`, { priority });
            return response.data;
        } catch (error) {
            console.error('Error updating task priority:', error);
            throw error;
        }
    },

    // Assign task to user
    assignTask: async (taskId, assigneeId) => {
        try {
            const response = await axios.patch(`${API_URL}/${taskId}/assign`, { assigneeId });
            return response.data;
        } catch (error) {
            console.error('Error assigning task:', error);
            throw error;
        }
    },

    // Get tasks by status
    getTasksByStatus: async (status) => {
        try {
            const response = await axios.get(`${API_URL}/Tasks?status=${status}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks by status:', error);
            throw error;
        }
    },

    // Get tasks by assignee
    getTasksByAssignee: async (assigneeId) => {
        try {
            const response = await axios.get(`${API_URL}/Tasks?assignee=${assigneeId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks by assignee:', error);
            throw error;
        }
    },

    // Get overdue tasks
    getOverdueTasks: async () => {
        try {
            const response = await axios.get(`${API_URL}/Tasks/overdue`);
            return response.data;
        } catch (error) {
            console.error('Error fetching overdue tasks:', error);
            throw error;
        }
    },

    // Get upcoming tasks
    getUpcomingTasks: async (days = 7) => {
        try {
            const response = await axios.get(`${API_URL}/Tasks/upcoming?days=${days}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching upcoming tasks:', error);
            throw error;
        }
    },

    // Bulk update tasks
    bulkUpdateTasks: async (taskIds, updateData) => {
        try {
            const response = await axios.patch(`${API_URL}/Tasks/bulk`, {
                taskIds,
                updateData
            });
            return response.data;
        } catch (error) {
            console.error('Error bulk updating tasks:', error);
            throw error;
        }
    },

    // Get task statistics
    getTaskStats: async (projectId = null) => {
        try {
            const url = projectId 
                ? `${API_URL}/Tasks/stats?projectId=${projectId}`
                : `${API_URL}/Tasks/stats`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching task stats:', error);
            throw error;
        }
    }
};

// Utility functions for local development (fallback when API is not available)
export const LocalAPI = {
    // Project utilities
    getLocalProjects: () => {
        // Import from data file for local development
        const { initialProjects } = require('../data/project.jsx');
        return Promise.resolve(initialProjects);
    },

    // Task utilities
    getLocalTasks: () => {
        // Import from data file for local development
        const { initialTasks } = require('../data/task.jsx');
        return Promise.resolve(initialTasks);
    },

    // Get tasks by project (local)
    getLocalTasksByProject: (projectId) => {
        const { initialTasks } = require('../data/task.jsx');
        const filteredTasks = initialTasks.filter(task => task.projectId === projectId);
        return Promise.resolve(filteredTasks);
    }
};

// Export default API object for convenience
export default {
    projects: ProjectAPI,
    tasks: TaskAPI,
    local: LocalAPI
};

