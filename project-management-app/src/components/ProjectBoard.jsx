import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import CreateTaskModal from './CreateTaskModal';
import { taskStatuses } from '../data/task';

const statusColumns = [
    { id: taskStatuses.TODO, title: 'To Do' },
    { id: taskStatuses.IN_PROGRESS, title: 'In Progress' },
    { id: taskStatuses.COMPLETED, title: 'Done' },
];

const getPriorityStyles = (priorityObj) => {
    if (!priorityObj) return '';
    switch (priorityObj.value) {
        case 'low':
            return 'bg-gray-100 text-gray-800';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'high':
            return 'bg-orange-100 text-orange-800';
        case 'urgent':
            return 'bg-red-100 text-red-800';
        default:
            return '';
    }
};

const ProjectBoard = ({ projectId }) => {
    const { tasks, addTask } = useTasks();
    const [showModal, setShowModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(taskStatuses.TODO);

    const handleAddClick = (status) => {
        setSelectedStatus(status);
        setShowModal(true);
    };

    const handleCreateTask = (taskData) => {
        addTask({ ...taskData, projectId });
        setShowModal(false);
    };

    return (
        <div className="flex gap-6 overflow-x-auto pb-4">
            {statusColumns.map((column) => {
                const columnTasks = tasks.filter(t => t.status === column.id && (!projectId || t.projectId === projectId));
                return (
                    <div key={column.id} className="flex-shrink-0 w-80">
                        {/* Column Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">
                                {column.title}
                                <span className="ml-2 text-gray-500">{columnTasks.length}</span>
                            </h3>
                        </div>

                        {/* Tasks Container */}
                        <div className="space-y-3">
                            {columnTasks.map((task) => (
                                <div key={task.id} className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="flex-1 text-gray-900">{task.title}</h4>
                                    </div>

                                    {task.priority && (
                                        <span className={`inline-block px-2 py-1 text-xs rounded-full mb-2 ${getPriorityStyles(task.priority)}`}>
                                            {task.priority.label}
                                        </span>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {task.assignee ? (
                                                <div className={`w-6 h-6 ${task.assignee.color} rounded-full flex items-center justify-center text-white text-xs`}>
                                                    {task.assignee.initials}
                                                </div>
                                            ) : null}
                                            {task.dueDate && (
                                                <span className="text-xs text-gray-500">{task.dueDate}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add Task Button */}
                            <button onClick={() => handleAddClick(column.id)} className="w-full p-3 text-left text-gray-500 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add task
                            </button>
                        </div>
                    </div>
                );
            })}
            {showModal && (
                <CreateTaskModal
                    defaultStatus={selectedStatus}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleCreateTask}
                />
            )}
        </div>
    );
};

export default ProjectBoard;