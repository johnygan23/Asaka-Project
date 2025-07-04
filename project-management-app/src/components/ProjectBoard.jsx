const ProjectBoard = ({ projectId }) => {
    // Hardcoded tasks data
    const tasks = {
        todo: [
            { id: 1, title: '草拟专案简介', assignee: { initials: 'JZ', color: 'bg-blue-500' }, dueDate: 'Jun 22 - 24', priority: '准度正常' },
            { id: 2, title: '推定启动会议', assignee: { initials: 'JZ', color: 'bg-blue-500' }, dueDate: 'Jun 23 - 25', priority: '存在风险' },
        ],
        inProgress: [
            { id: 3, title: 'Meet with Jacob', assignee: null, dueDate: '', priority: '' },
        ],
        done: [
            { id: 4, title: 'IS Weekly Quiz', assignee: null, dueDate: '', priority: '' },
            { id: 5, title: '与陈友分享时间轴', assignee: null, dueDate: 'Jun 24 - 26', priority: '迟离进度' },
        ],
    };

    const columns = [
        { id: 'todo', title: 'To-Do', count: tasks.todo.length },
        { id: 'inProgress', title: 'In-Progress', count: tasks.inProgress.length },
        { id: 'done', title: 'Done', count: tasks.done.length },
    ];

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case '准度正常':
                return 'bg-green-100 text-green-800';
            case '存在风险':
                return 'bg-yellow-100 text-yellow-800';
            case '迟离进度':
                return 'bg-red-100 text-red-800';
            default:
                return '';
        }
    };

    return (
        <div className="flex gap-6 overflow-x-auto pb-4">
            {columns.map((column) => (
                <div key={column.id} className="flex-shrink-0 w-80">
                    {/* Column Header */}
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">
                            {column.title}
                            <span className="ml-2 text-gray-500">{column.count}</span>
                        </h3>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                    </div>

                    {/* Tasks Container */}
                    <div className="space-y-3">
                        {tasks[column.id].map((task) => (
                            <div key={task.id} className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-2">
                                    <button className="p-1 rounded hover:bg-gray-100">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <h4 className="flex-1 mx-2 text-gray-900">{task.title}</h4>
                                </div>

                                {task.priority && (
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full mb-2 ${getPriorityStyles(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {task.assignee ? (
                                            <div className={`w-6 h-6 ${task.assignee.color} rounded-full flex items-center justify-center text-white text-xs`}>
                                                {task.assignee.initials}
                                            </div>
                                        ) : (
                                            <button className="w-6 h-6 border-2 border-dashed border-gray-300 rounded-full hover:border-gray-400">
                                                <svg className="w-3 h-3 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </button>
                                        )}
                                        {task.dueDate && (
                                            <span className="text-xs text-gray-500">{task.dueDate}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add Task Button */}
                        <button className="w-full p-3 text-left text-gray-500 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add task
                        </button>
                    </div>
                </div>
            ))}

            {/* Add Section Button */}
            <div className="flex-shrink-0">
                <button className="p-3 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add section
                </button>
            </div>
        </div>
    );
};

export default ProjectBoard;