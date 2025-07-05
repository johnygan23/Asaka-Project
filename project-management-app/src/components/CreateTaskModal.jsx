import { useState, useEffect } from 'react';
import { people } from '../data/people';
import { taskPriorities, taskStatuses } from '../data/task';

const CreateTaskModal = ({ onClose, onSubmit, onDelete, defaultStatus, initialData = null }) => {
    const isEdit = Boolean(initialData);
    const [taskData, setTaskData] = useState(initialData || {
        title: '',
        assignee: null,
        dueDate: '',
        priority: taskPriorities.MEDIUM,
        status: defaultStatus ?? taskStatuses.TODO,
        tags: []
    });

    useEffect(() => {
        if (initialData) {
            setTaskData(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = isEdit ? taskData : { ...taskData, id: Date.now().toString() };
        onSubmit(payload);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit Task' : 'Create New Task'}</h2>

                <form onSubmit={handleSubmit}>
                    {/* Task Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Task Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            value={taskData.title}
                            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                        />
                    </div>

                    {/* Assignee */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Assignee
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            onChange={(e) => {
                                const user = people.find(u => u.id.toString() === e.target.value);
                                setTaskData({ ...taskData, assignee: user });
                            }}
                        >
                            <option value="">Select assignee</option>
                            {people.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Due Date */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Due Date
                        </label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                        />
                    </div>

                    {/* Priority */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Priority
                        </label>
                        <div className="flex gap-2">
                            {Object.values(taskPriorities).map(priority => (
                                <button
                                    key={priority.value}
                                    type="button"
                                    className={`px-3 py-1 rounded-full text-sm ${taskData.priority.value === priority.value
                                        ? `bg-${priority.color}-100 text-${priority.color}-700 ring-2 ring-${priority.color}-500`
                                        : 'bg-gray-100 text-gray-600'
                                        }`}
                                    onClick={() => setTaskData({ ...taskData, priority })}
                                >
                                    {priority.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 justify-end mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        {isEdit && (
                            <button
                                type="button"
                                onClick={() => onDelete && onDelete(taskData.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                        >
                            {isEdit ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;