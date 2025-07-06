import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { taskStatuses, taskPriorities } from '../data/task';
import { people } from '../data/people';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FiCalendar, FiUser } from 'react-icons/fi';
import TaskDetailsModal from './TaskDetailsModal';

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

const ProjectBoard = ({ projectId, projects = [] }) => {
    const { tasks, addTask, updateTask } = useTasks();
    const [inlineAddStatus, setInlineAddStatus] = useState(null); // which column is adding
    const [inlineTask, setInlineTask] = useState({ title: '', priority: 'medium', status: taskStatuses.TODO, dueDate: '', assignee: '' });
    const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleInlineAdd = (colId) => {
        if (inlineTask.title.trim()) {
            const assigneeObj = people.find(p => p.id === Number(inlineTask.assignee));
            addTask({
                id: Date.now().toString(),
                title: inlineTask.title,
                priority: taskPriorities[inlineTask.priority.toUpperCase()],
                status: colId,
                dueDate: inlineTask.dueDate,
                assignee: assigneeObj || null,
                completed: false,
                projectId
            });
            setInlineTask({ title: '', priority: 'medium', status: colId, dueDate: '', assignee: '' });
            setInlineAddStatus(null);
            setShowAssigneeDropdown(false);
            setShowDatePicker(false);
        }
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        const destStatus = destination.droppableId;
        const sourceStatus = source.droppableId;
        if (destStatus !== sourceStatus) {
            updateTask(draggableId, { status: destStatus });
        }
    };

    // Find project name for modal
    const project = Array.isArray(projects) ? projects.find(p => p.id === projectId) : undefined;

    return (
        <>
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
                                    {/* Inline Add Task Card */}
                                    {inlineAddStatus === column.id ? (
                                        <div className="bg-white rounded-lg p-4 shadow flex flex-col gap-2 border border-gray-800 mb-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    value={inlineTask.title}
                                                    onChange={e => setInlineTask(prev => ({ ...prev, title: e.target.value }))}
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') handleInlineAdd(column.id);
                                                        if (e.key === 'Escape') { setInlineAddStatus(null); setInlineTask({ title: '', priority: 'medium', status: column.id, dueDate: '', assignee: '' }); setShowAssigneeDropdown(false); setShowDatePicker(false); }
                                                    }}
                                                    placeholder="Write a task name"
                                                    className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-base"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <select
                                                    value={inlineTask.priority}
                                                    onChange={e => setInlineTask(prev => ({ ...prev, priority: e.target.value }))}
                                                    className="px-2 py-1 rounded text-xs font-semibold border border-dashed border-gray-500 text-gray-700"
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                    <option value="urgent">Urgent</option>
                                                </select>
                                                <select
                                                    value={inlineTask.status}
                                                    onChange={e => setInlineTask(prev => ({ ...prev, status: e.target.value }))}
                                                    className="px-2 py-1 rounded text-xs font-semibold border border-dashed border-gray-500 text-gray-700"
                                                >
                                                    {statusColumns.map(col => (
                                                        <option key={col.id} value={col.id}>{col.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 relative">
                                                {/* Assignee Icon and Dropdown */}
                                                <button
                                                    type="button"
                                                    className={`w-8 h-8 flex items-center justify-center rounded-full border border-dashed border-gray-500 text-gray-400 bg-white ${showAssigneeDropdown ? 'z-20' : ''}`}
                                                    onClick={() => { setShowAssigneeDropdown(v => !v); setShowDatePicker(false); }}
                                                    tabIndex={-1}
                                                >
                                                    <FiUser />
                                                </button>
                                                {showAssigneeDropdown && (
                                                    <div className="absolute left-0 top-10 bg-white border border-gray-200 rounded shadow z-30 min-w-[120px]">
                                                        <ul>
                                                            {people.map(person => (
                                                                <li key={person.id}>
                                                                    <button
                                                                        className={`w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 ${inlineTask.assignee == person.id ? 'bg-blue-100' : ''}`}
                                                                        onClick={() => { setInlineTask(prev => ({ ...prev, assignee: person.id })); setShowAssigneeDropdown(false); }}
                                                                    >
                                                                        <span className={`w-5 h-5 ${person.color} rounded-full flex items-center justify-center text-white text-xs`}>{person.initials}</span>
                                                                        {person.name}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {/* Due Date Icon and Picker */}
                                                <button
                                                    type="button"
                                                    className={`w-8 h-8 flex items-center justify-center rounded-full border border-dashed border-gray-500 text-gray-400 bg-white ${showDatePicker ? 'z-20' : ''}`}
                                                    onClick={() => { setShowDatePicker(v => !v); setShowAssigneeDropdown(false); }}
                                                    tabIndex={-1}
                                                >
                                                    <FiCalendar />
                                                </button>
                                                {showDatePicker && (
                                                    <input
                                                        type="date"
                                                        value={inlineTask.dueDate}
                                                        onChange={e => { setInlineTask(prev => ({ ...prev, dueDate: e.target.value })); setShowDatePicker(false); }}
                                                        className="absolute left-0 top-10 bg-white border border-gray-200 rounded shadow px-2 py-1 z-30 text-gray-700 text-sm"
                                                        style={{ minWidth: '120px' }}
                                                        autoFocus
                                                    />
                                                )}
                                                <button
                                                    className="ml-auto px-2 py-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
                                                    onClick={() => handleInlineAdd(column.id)}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setInlineAddStatus(column.id);
                                                setInlineTask({ title: '', priority: 'medium', status: column.id, dueDate: '', assignee: '' });
                                            }}
                                            className="w-full p-3 text-left text-gray-500 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add task
                                        </button>
                                    )}
                                    {/* Tasks Container */}
                                    <div className="space-y-3 min-h-[20px]">
                                        {columnTasks.map((task, index) => (
                                            <Draggable draggableId={task.id} index={index} key={task.id}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        onClick={() => setSelectedTask({ ...task, projectName: project?.name })}
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
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    );
                })}
            </div>
        </DragDropContext>
        {selectedTask && (
            <TaskDetailsModal
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                onSave={updated => updateTask(selectedTask.id, updated)}
                projects={projects}
            />
        )}
        </>
    );
};

export default ProjectBoard;