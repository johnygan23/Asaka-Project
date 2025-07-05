import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import CreateTaskModal from './CreateTaskModal';
import { taskStatuses } from '../data/task';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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
    const { tasks, addTask, updateTask, deleteTask } = useTasks();
    const [showModal, setShowModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(taskStatuses.TODO);
    const [editingTask, setEditingTask] = useState(null);

    const handleAddClick = (status) => {
        setSelectedStatus(status);
        setEditingTask(null);
        setShowModal(true);
    };

    const handleModalSubmit = (taskData) => {
        if (editingTask) {
            updateTask(taskData.id, taskData);
        } else {
            addTask({ ...taskData, projectId });
        }
        setShowModal(false);
    };

    const handleTaskClick = (task) => {
        setEditingTask(task);
        setShowModal(true);
    };

    const handleDelete = (taskId) => {
        deleteTask(taskId);
        setShowModal(false);
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        const destStatus = destination.droppableId;
        const sourceStatus = source.droppableId;
        if (destStatus !== sourceStatus) {
            // update status
            updateTask(draggableId, { status: destStatus });
        }
        // Could handle ordering here if needed
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-6 overflow-x-auto pb-4">
                {statusColumns.map((column) => {
                    const columnTasks = tasks.filter(t => t.status === column.id && (!projectId || t.projectId === projectId));
                    return (
                        <Droppable droppableId={column.id} key={column.id}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className={`flex-shrink-0 w-80 rounded-lg ${snapshot.isDraggingOver ? 'bg-cyan-50' : ''}`}>
                                    {/* Column Header */}
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="font-medium text-gray-900">
                                            {column.title}
                                            <span className="ml-2 text-gray-500">{columnTasks.length}</span>
                                        </h3>
                                    </div>

                                    {/* Tasks Container */}
                                    <div className="space-y-3 min-h-[20px]">
                                        {columnTasks.map((task, index) => (
                                            <Draggable draggableId={task.id} index={index} key={task.id}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        onClick={() => handleTaskClick(task)}
                                                        className={`bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow ${snapshot.isDragging ? 'rotate-3 opacity-80' : ''}`}
                                                    >
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h4 className="flex-1 text-gray-900 font-medium text-sm md:text-base">{task.title}</h4>
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
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}

                                        {/* Add Task Button */}
                                        <button onClick={() => handleAddClick(column.id)} className="w-full p-3 text-left text-gray-500 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add task
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    );
                })}
                {showModal && (
                    <CreateTaskModal
                        defaultStatus={selectedStatus}
                        onClose={() => setShowModal(false)}
                        onSubmit={handleModalSubmit}
                        onDelete={handleDelete}
                        initialData={editingTask}
                    />
                )}
            </div>
        </DragDropContext>
    );
};

export default ProjectBoard;