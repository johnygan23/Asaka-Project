// src/components/CreateProjectModal.jsx
import { useState } from 'react';
import { projectColors } from '../data/colors';

const CreateProjectModal = ({ onClose, onCreate, projectsCount = 0 }) => {
    const [projectName, setProjectName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (projectName.trim()) {
            // Select the next color in order based on existing projects length
            const colorIndex = projectsCount % projectColors.length;
            const selectedColor = projectColors[colorIndex];

            onCreate({
                name: projectName,
                color: selectedColor
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center">
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-900 ml-4">New project</h2>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Project Name */}
                    <div className="mb-6">
                        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                            Project name
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="my project"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                            required
                        />
                    </div>

                    {/* Continue Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;