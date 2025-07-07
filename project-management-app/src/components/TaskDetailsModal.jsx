import { useState, useEffect, useRef } from 'react';
import { people } from '../data/people';
import { taskPriorities, taskStatuses } from '../data/task';
import { FiPaperclip, FiX, FiDownload, FiFile } from 'react-icons/fi';
import { uploadAttachment } from '../API/AttachmentAPI';

const statusColors = {
  completed: 'bg-green-700 text-white',
  'in progress': 'bg-yellow-600 text-white',
  todo: 'bg-gray-600 text-white',
  'at risk': 'bg-yellow-400 text-gray-900',
};

const priorityColors = {
  low: 'bg-green-400 text-gray-900',
  medium: 'bg-yellow-400 text-gray-900',
  high: 'bg-orange-400 text-white',
  urgent: 'bg-red-500 text-white',
};

function TaskDetailsModal({ task, onClose, onSave, projects }) {
  const [editTask, setEditTask] = useState({ ...task, subtasks: task.subtasks || [], attachments: task.attachments || [] });
  const [assigneeQuery, setAssigneeQuery] = useState('');
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [showSubtaskModal, setShowSubtaskModal] = useState(null); // subtask object or null
  const [addingSubtask, setAddingSubtask] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const modalRef = useRef(null);
  const assigneeInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Trap focus
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusable = modalRef.current.querySelectorAll('input,button,select,textarea');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setEditTask({ ...task, subtasks: task.subtasks || [], attachments: task.attachments || [] });
  }, [task]);

  // Filter people by query
  const filteredPeople = assigneeQuery
    ? people.filter(p =>
        p.name.toLowerCase().includes(assigneeQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(assigneeQuery.toLowerCase())
      )
    : people;

  const handleSave = () => {
    onSave(editTask);
    onClose();
  };

  // Subtask logic
  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      setEditTask(t => ({
        ...t,
        subtasks: [
          ...t.subtasks,
          {
            id: Date.now().toString(),
            title: newSubtaskTitle,
            completed: false,
            subtasks: [],
          },
        ],
      }));
      setNewSubtaskTitle('');
      setAddingSubtask(false);
    }
  };

  const handleToggleSubtask = (subId) => {
    setEditTask(t => ({
      ...t,
      subtasks: t.subtasks.map(st =>
        st.id === subId ? { ...st, completed: !st.completed } : st
      ),
    }));
  };

  const handleUpdateSubtask = (subId, updated) => {
    setEditTask(t => ({
      ...t,
      subtasks: t.subtasks.map(st =>
        st.id === subId ? { ...st, ...updated } : st
      ),
    }));
  };

  // File handling functions
  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
  
    const file = files[0]; // Only handle the first file
  
    try {
      // Upload to backend
      const uploaded = await uploadAttachment("BBBBBBB1-BBBB-BBBB-BBBB-BBBBBBBBBBBB", file);
  
      setEditTask(prev => ({
        ...prev,
        attachments: [
          ...(prev.attachments || []),
          {
            id: uploaded.id,
            name: uploaded.attachmentName,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
            // Add more fields if needed from backend response
          }
        ]
      }));
    } catch (err) {
      alert(`Failed to upload ${file.name}`);
    }
  
    // Reset file input
    event.target.value = '';
  };

  const handleRemoveAttachment = (attachmentId) => {
    setEditTask(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📈';
    return '📎';
  };

  return (
    <>
    <div className="fixed top-0 right-0 h-full z-50 w-full max-w-xl bg-white text-black rounded-l-2xl shadow-2xl transition-transform duration-300 ease-in-out animate-slide-in flex flex-col" style={{ minWidth: 380 }} ref={modalRef} tabIndex={-1}>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
        aria-label="Close"
      >
        ×
      </button>
      {/* Main scrollable content */}
      <div className="flex-1 overflow-y-auto pr-2" style={{ paddingTop: 8, paddingBottom: 24 }}>
        <div className="px-6 py-4">
          {/* Status badge */}
          <div className="mb-2 mt-2">
            <span className="inline-block px-3 py-1 rounded-full bg-green-700 text-white text-xs font-semibold">
              {editTask.completed ? 'Completed' : (editTask.statusLabel || editTask.status || 'To do')}
            </span>
          </div>
          {/* Title */}
          <h2 className="text-2xl font-bold mb-6">{editTask.title}</h2>
          {/* Vertical Fields */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Assignee */}
            <div>
              <div className="text-sm text-gray-500 mb-1">Assignee</div>
              {editTask.assignee ? (
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 mb-2">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base ${editTask.assignee.color} text-white`}>
                    {editTask.assignee.initials}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium">{editTask.assignee.name}</span>
                    <span className="text-xs text-gray-500">{editTask.assignee.email}</span>
                  </div>
                  <button
                    className="ml-2 text-gray-400 hover:text-red-500 text-lg font-bold"
                    onClick={() => setEditTask(t => ({ ...t, assignee: null }))}
                    aria-label="Remove assignee"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <input
                    ref={assigneeInputRef}
                    type="text"
                    className="w-full bg-gray-100 rounded-lg px-3 py-2 text-black focus:outline-none"
                    placeholder="Name or email"
                    value={assigneeQuery}
                    onChange={e => {
                      setAssigneeQuery(e.target.value);
                      setShowAssigneeDropdown(true);
                    }}
                    onFocus={() => setShowAssigneeDropdown(true)}
                    onBlur={() => setTimeout(() => setShowAssigneeDropdown(false), 150)}
                    autoComplete="off"
                  />
                  {showAssigneeDropdown && filteredPeople.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-56 overflow-y-auto">
                      {filteredPeople.map(person => (
                        <button
                          key={person.id}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left"
                          onMouseDown={e => {
                            e.preventDefault();
                            setEditTask(t => ({ ...t, assignee: person }));
                            setAssigneeQuery('');
                            setShowAssigneeDropdown(false);
                          }}
                        >
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base ${person.color} text-white`}>
                            {person.initials}
                          </span>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{person.name}</span>
                            <span className="text-xs text-gray-500">{person.email}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Due date */}
            <div>
              <div className="text-sm text-gray-500 mb-1">Due date</div>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <span className="text-lg">📅</span>
                <input
                  type="date"
                  className="bg-transparent text-black focus:outline-none"
                  value={editTask.dueDate || ''}
                  onChange={e => setEditTask(t => ({ ...t, dueDate: e.target.value }))}
                />
              </div>
            </div>
            {/* Projects (read-only for now) */}
            {editTask.projectName && (
              <div>
                <div className="text-sm text-gray-500 mb-1">Project</div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                  <span>{editTask.projectName}</span>
                  <span className="ml-2 text-xs text-gray-500">To do</span>
                </div>
              </div>
            )}
          </div>
          {/* Fields: Priority, Status */}
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-1">Fields</div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex flex-col divide-y divide-gray-200">
                <div className="flex items-center px-4 py-2">
                  <span className="mr-2">Priority</span>
                  <select
                    className={`rounded px-2 py-1 text-xs font-semibold ml-auto ${priorityColors[editTask.priority?.value || editTask.priority || 'medium']}`}
                    value={editTask.priority?.value || editTask.priority || 'medium'}
                    onChange={e => setEditTask(t => ({ ...t, priority: e.target.value }))}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="flex items-center px-4 py-2">
                  <span className="mr-2">Status</span>
                  <select
                    className={`rounded px-2 py-1 text-xs font-semibold ml-auto ${statusColors[editTask.status?.toLowerCase() || 'todo']}`}
                    value={editTask.status}
                    onChange={e => setEditTask(t => ({ ...t, status: e.target.value }))}
                  >
                    <option value="todo">To do</option>
                    <option value="in progress">In progress</option>
                    <option value="completed">Completed</option>
                    <option value="at risk">At risk</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-1">Description</div>
            <textarea
              className="w-full bg-gray-100 rounded-lg p-3 text-black focus:outline-none"
              rows={3}
              placeholder="What is this task about?"
              value={editTask.description || ''}
              onChange={e => setEditTask(t => ({ ...t, description: e.target.value }))}
            />
          </div>
          {/* Attachments */}
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">Attachments</div>
            {editTask.attachments && editTask.attachments.length > 0 && (
              <div className="space-y-2 mb-3">
                {editTask.attachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
                    <span className="text-xl">{getFileIcon(attachment.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{attachment.name}</div>
                      <div className="text-xs text-gray-500">{formatFileSize(attachment.size)}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveAttachment(attachment.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      aria-label="Remove attachment"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                accept="*/*"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 border border-gray-400 rounded text-sm text-black hover:bg-gray-100"
              >
                <FiPaperclip size={16} />
                Add files
              </button>
            </div>
          </div>
          {/* Subtasks */}
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">Subtasks</div>
            <div className="divide-y divide-gray-200">
              {editTask.subtasks && editTask.subtasks.map(subtask => (
                <div key={subtask.id} className="flex items-center gap-2 py-2 cursor-pointer group" onClick={() => setShowSubtaskModal(subtask)}>
                  <button
                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${subtask.completed ? 'bg-green-100 border-green-400' : 'bg-white border-gray-300'}`}
                    onClick={e => { e.stopPropagation(); handleToggleSubtask(subtask.id); }}
                    aria-label={subtask.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {subtask.completed && (
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </button>
                  <span className={`flex-1 ${subtask.completed ? 'line-through text-gray-400' : 'text-black'}`}>{subtask.title}</span>
                </div>
              ))}
            </div>
            {addingSubtask ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  className="flex-1 bg-gray-100 rounded px-3 py-2 text-black border border-gray-300 focus:outline-none"
                  placeholder="Subtask name"
                  value={newSubtaskTitle}
                  onChange={e => setNewSubtaskTitle(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleAddSubtask();
                    if (e.key === 'Escape') { setAddingSubtask(false); setNewSubtaskTitle(''); }
                  }}
                  autoFocus
                />
                <button
                  className="px-3 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
                  onClick={handleAddSubtask}
                >
                  Add
                </button>
                <button
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  onClick={() => { setAddingSubtask(false); setNewSubtaskTitle(''); }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="mt-2 px-3 py-2 border border-gray-400 rounded text-sm text-black hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setAddingSubtask(true)}
              >
                <span className="text-lg">+</span> Add subtask
              </button>
            )}
          </div>
          {/* Comments (placeholder) */}
          <div className="mt-8 border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold">WB</span>
              <input
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-black focus:outline-none"
                placeholder="Add a comment"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      {/* Save/Cancel */}
      <div className="flex justify-end gap-2 mt-8 p-4 bg-white border-t border-gray-100 sticky bottom-0 left-0 right-0 z-10">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 font-semibold"
        >
          Save
        </button>
      </div>
      <style jsx>{`
        .animate-slide-in {
          transform: translateX(100%);
          animation: slideInDrawer 0.3s forwards;
        }
        @keyframes slideInDrawer {
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
    {/* Subtask detail modal */}
    {showSubtaskModal && (
      <TaskDetailsModal
        task={showSubtaskModal}
        onClose={() => setShowSubtaskModal(null)}
        onSave={updated => {
          handleUpdateSubtask(showSubtaskModal.id, updated);
          setShowSubtaskModal(null);
        }}
        projects={projects}
      />
    )}
    </>
  );
}

export default TaskDetailsModal; 