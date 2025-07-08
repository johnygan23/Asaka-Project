import { useState, useEffect } from 'react';
import { people as initialMembers } from '../data/people';
import { projectColors } from '../data/colors';
import { updateProject } from '../API/ProjectAPI';

const ProjectOverview = ({ project, onUpdateProject }) => {
    const [description, setDescription] = useState('');
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const [members, setMembers] = useState(initialMembers);
    // Removed project goals list; project now has a single goal string

    useEffect(() => {
        if (project) {
            setDescription(project.description || 'Click to add a description.');
        }
    }, [project]);

    const [showAddMemberModal, setShowAddMemberModal] = useState(false);

    const [newMember, setNewMember] = useState({ identifier: '', role: 'Member' });

    // Editable fields state
    const [detailsEditMode, setDetailsEditMode] = useState(false);
    const [editValues, setEditValues] = useState({
        goal: project.goal || '',
        priority: project.priority || 'Medium',
        status: project.status || 'NotStarted',
        startDate: project.startDate ? project.startDate.slice(0, 10) : '',
        endDate: project.endDate ? project.endDate.slice(0, 10) : '',
    });

    // When project prop changes, reset edit state
    useEffect(() => {
        setEditValues({
            goal: project.goal || '',
            priority: project.priority || 'Medium',
            status: project.status || 'NotStarted',
            startDate: project.startDate ? project.startDate.slice(0, 10) : '',
            endDate: project.endDate ? project.endDate.slice(0, 10) : '',
        });
    }, [project]);

    const handleSaveDetails = async () => {
        const payload = {
            goal: editValues.goal,
            priority: editValues.priority,
            status: editValues.status,
            startDate: editValues.startDate,
            endDate: editValues.endDate,
        };
        try {
            await updateProject(project.id, payload);
            onUpdateProject?.(project.id, payload);
            setDetailsEditMode(false);
        } catch (error) {
            console.error('Failed to update project details', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'In Progress':
            case 'Active':
                return 'bg-yellow-100 text-yellow-800';
            case 'Paused':
                return 'bg-gray-100 text-gray-800';
            case 'NotStarted':
                return 'bg-gray-50 text-gray-600';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-800';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'Low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        if (newMember.identifier) {
            const isEmail = newMember.identifier.includes('@');
            const extractedName = isEmail ? newMember.identifier.split('@')[0].replace(/\./g, ' ') : newMember.identifier;
            const member = {
                id: members.length + 1,
                name: extractedName.charAt(0).toUpperCase() + extractedName.slice(1),
                email: isEmail ? newMember.identifier : '',
                initials: getInitials(extractedName),
                role: newMember.role,
                color: projectColors[members.length % projectColors.length],
                isOwner: newMember.role === 'Admin'
            };
            setMembers([...members, member]);
            setNewMember({ identifier: '', role: 'Member' });
            setShowAddMemberModal(false);
        }
    };

    const getInitials = (name) => (name || '').split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
                {/* Project Description */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Description</h3>
                    {isEditingDescription ? (
                        <div className="space-y-3">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                rows="4"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsEditingDescription(false)}
                                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditingDescription(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => setIsEditingDescription(true)}
                            className="text-gray-600 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                        >
                            {description}
                        </div>
                    )}
                </div>

                {/* Project Details */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
                        {detailsEditMode ? (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSaveDetails}
                                    className="px-3 py-1 rounded-lg bg-cyan-500 text-white text-sm hover:bg-cyan-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setDetailsEditMode(false);
                                        setEditValues({
                                            goal: project.goal || '',
                                            priority: project.priority || 'Medium',
                                            status: project.status || 'NotStarted',
                                            startDate: project.startDate ? project.startDate.slice(0, 10) : '',
                                            endDate: project.endDate ? project.endDate.slice(0, 10) : '',
                                        });
                                    }}
                                    className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 text-sm hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setDetailsEditMode(true)}
                                className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    {detailsEditMode ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Goal */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm text-gray-500 mb-1">Goal</label>
                                <input
                                    type="text"
                                    value={editValues.goal}
                                    onChange={(e) => setEditValues(v => ({ ...v, goal: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                            {/* Priority */}
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Priority</label>
                                <select
                                    value={editValues.priority}
                                    onChange={(e) => setEditValues(v => ({ ...v, priority: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                            {/* Status */}
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Status</label>
                                <select
                                    value={editValues.status}
                                    onChange={(e) => setEditValues(v => ({ ...v, status: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                >
                                    <option>NotStarted</option>
                                    <option>Active</option>
                                    <option>Paused</option>
                                    <option>Completed</option>
                                    <option>Archived</option>
                                </select>
                            </div>
                            {/* Start Date */}
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={editValues.startDate}
                                    onChange={(e) => setEditValues(v => ({ ...v, startDate: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                            {/* End Date */}
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={editValues.endDate}
                                    onChange={(e) => setEditValues(v => ({ ...v, endDate: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Goal</p>
                                <p className="font-medium text-gray-900 break-words whitespace-pre-wrap">{project.goal || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Priority</p>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(project.priority)}`}>{project.priority}</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>{project.status}</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Start Date</p>
                                <p className="font-medium text-gray-900">{project.startDate ? new Date(project.startDate).toLocaleDateString() : '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">End Date</p>
                                <p className="font-medium text-gray-900">{project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
                {/* Project Members */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Project Members</h3>
                        <span className="text-sm text-gray-500">{members.length} members</span>
                    </div>

                    <div className="space-y-3">
                        {members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${member.color.startsWith('#') ? '' : member.color}`} style={member.color.startsWith('#') ? { backgroundColor: member.color } : {}}>
                                        {member.initials}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{member.name}</p>
                                        <p className="text-sm text-gray-500">{member.role}</p>
                                    </div>
                                </div>
                                {member.isOwner && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Owner</span>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={() => setShowAddMemberModal(true)}
                            className="w-full flex items-center gap-3 p-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
                        >
                            <div className="w-10 h-10 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span className="text-gray-600 font-medium">Add member</span>
                        </button>
                    </div>
                </div>

                {/* Project Stats */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Stats</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Team Members</span>
                            <span className="font-semibold text-gray-900">{members.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Member Modal */}
            {showAddMemberModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Team Member</h2>
                        <form onSubmit={handleAddMember}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name or Email</label>
                                    <input
                                        type="text"
                                        value={newMember.identifier}
                                        onChange={(e) => setNewMember({ ...newMember, identifier: e.target.value })}
                                        placeholder="e.g., alice or alice@example.com"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <select
                                        value={newMember.role}
                                        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    >
                                        <option>Admin</option>
                                        <option>Project Manager</option>
                                        <option>Member</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button type="submit" className="flex-1 bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600">Add</button>
                                <button type="button" onClick={() => setShowAddMemberModal(false)} className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProjectOverview;