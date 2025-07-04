import { useState, useEffect } from 'react';
import { people as initialMembers } from '../data/people';
import { projectGoalsMap } from '../data/project';
import { projectColors } from '../data/colors';

const ProjectOverview = ({ project }) => {
    const [description, setDescription] = useState('');
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const [members, setMembers] = useState(initialMembers);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        if (project) {
            setDescription(project.description || 'Click to add a description.');
            setGoals(projectGoalsMap[project.id] || []);
        }
    }, [project]);

    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showAddGoalModal, setShowAddGoalModal] = useState(false);

    const [newMember, setNewMember] = useState({ identifier: '', role: 'Member' });
    const [newGoal, setNewGoal] = useState({ title: '', description: '', startDate: '', endDate: '' });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            case 'Upcoming': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getInitials = (name) => (name || '').split(' ').map(n => n[0]).join('').toUpperCase();

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

    const handleAddGoal = (e) => {
        e.preventDefault();
        if (newGoal.title && newGoal.startDate && newGoal.endDate) {
            const goal = {
                id: goals.length + 1,
                title: newGoal.title,
                description: newGoal.description,
                dateRange: `${new Date(newGoal.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(newGoal.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
                status: 'Upcoming',
                progress: 0
            };
            setGoals([...goals, goal]);
            setNewGoal({ title: '', description: '', startDate: '', endDate: '' });
            setShowAddGoalModal(false);
        }
    };

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

                {/* Project Goals */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Project Goals</h3>
                        <button
                            onClick={() => setShowAddGoalModal(true)}
                            className="text-sm bg-cyan-500 text-white px-3 py-1.5 rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Goal
                        </button>
                    </div>

                    <div className="space-y-4">
                        {goals.map((goal) => (
                            <div key={goal.id} className="border-l-4 border-cyan-500 pl-4 py-2">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">{goal.title}</h4>
                                        {goal.description && <p className="text-sm text-gray-600 mt-1">{goal.description}</p>}
                                        <div className="mt-2">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-cyan-500 h-2 rounded-full"
                                                    style={{ width: `${goal.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right ml-4">
                                        <span className="text-xs text-gray-500">{goal.dateRange}</span>
                                        <div className="mt-1">
                                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(goal.status)}`}>
                                                {goal.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
                            <span className="text-gray-600">Total Goals</span>
                            <span className="font-semibold text-gray-900">{goals.length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Completed</span>
                            <span className="font-semibold text-green-600">{goals.filter(g => g.status === 'Completed').length}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">In Progress</span>
                            <span className="font-semibold text-yellow-600">{goals.filter(g => g.status === 'In Progress').length}</span>
                        </div>
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

            {/* Add Goal Modal */}
            {showAddGoalModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Project Goal</h2>
                        <form onSubmit={handleAddGoal}>
                            <div className="space-y-4">
                                <input type="text" value={newGoal.title} onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })} placeholder="Title" className="w-full p-2 border rounded" required />
                                <textarea value={newGoal.description} onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })} placeholder="Description" className="w-full p-2 border rounded" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="date" value={newGoal.startDate} onChange={(e) => setNewGoal({ ...newGoal, startDate: e.target.value })} className="w-full p-2 border rounded" required />
                                    <input type="date" value={newGoal.endDate} onChange={(e) => setNewGoal({ ...newGoal, endDate: e.target.value })} className="w-full p-2 border rounded" required />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button type="submit" className="flex-1 bg-cyan-500 text-white py-2 rounded-lg">Add Goal</button>
                                <button type="button" onClick={() => setShowAddGoalModal(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectOverview;