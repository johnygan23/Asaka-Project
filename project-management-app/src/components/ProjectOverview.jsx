import { useState } from 'react';
import { people } from '../data/people';
import { projectGoalsMap } from '../data/project';

const ProjectOverview = ({ projectId }) => {
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [description, setDescription] = useState('Complete redesign of the company website with modern UI/UX principles, focusing on user engagement and conversion optimization.');

    // Data from shared data files
    const projectMembers = people; // In real app, filter members by projectId
    const projectGoals = projectGoalsMap[projectId] || [];

    return (
        <div className="space-y-8">
            {/* Project Description */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Description</h2>
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

            {/* Project Members */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Members</h2>
                <div className="flex flex-wrap gap-4">
                    {projectMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${member.color} rounded-full flex items-center justify-center text-white font-semibold`}>
                                {member.initials}
                            </div>
                            <span className="text-gray-700">{member.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Goals */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Goals</h2>
                <div className="space-y-3">
                    {projectGoals.map((goal) => (
                        <div key={goal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-900">{goal.title}</span>
                            <span className="text-sm text-gray-500">{goal.period}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;