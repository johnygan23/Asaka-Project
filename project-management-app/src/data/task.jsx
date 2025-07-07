export const taskStatuses = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    ARCHIVED: 'archived'
};

export const taskPriorities = {
    LOW: { value: 'low', label: 'Low', color: 'gray' },
    MEDIUM: { value: 'medium', label: 'Medium', color: 'yellow' },
    HIGH: { value: 'high', label: 'High', color: 'orange' },
    URGENT: { value: 'urgent', label: 'Urgent', color: 'red' }
};

export const initialTasks = [
    {
        id: '1',
        title: 'Review project proposal',
        assignee: { id: '1', name: 'John Zhang', avatar: 'JZ', color: 'blue' },
        dueDate: 'Jun 22 - 24',
        priority: taskPriorities.MEDIUM,
        status: taskStatuses.TODO,
        tags: ['Low Priority', 'In Progress'],
        projectId: '1'
    },
    // Add more initial tasks...
];