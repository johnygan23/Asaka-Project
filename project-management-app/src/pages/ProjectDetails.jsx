import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectColors } from '../data/colors';
import Layout from '../components/Layout';
import ProjectOverview from '../components/ProjectOverview';
import ProjectBoard from '../components/ProjectBoard.jsx';

const ProjectDetails = ({ onLogout, projects = [], onUpdateProject }) => {
    const { projectId } = useParams();
    const [activeTab, setActiveTab] = useState('board');
    const [showColorPicker, setShowColorPicker] = useState(false);

    // Find current project from list (convert id to number)
    const currentProject = projects.find(p => p.id === Number(projectId));

    // Determine color styling
    const isHexColor = currentProject?.color?.startsWith('#');

    return (
        <Layout onLogout={onLogout} projects={projects}>
            {/* Project Header */}
            <div className="mb-6">
                {currentProject && (
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <button
                                onClick={() => setShowColorPicker(prev => !prev)}
                                className={`w-6 h-6 rounded-lg flex items-center justify-center ${!isHexColor ? currentProject.color : ''}`}
                                style={isHexColor ? { backgroundColor: currentProject.color } : {}}
                                aria-label="Change project color"
                            />

                            {showColorPicker && (
                                <div className="absolute top-8 left-0 bg-white shadow-lg border border-gray-200 rounded-lg p-3 flex flex-wrap gap-2 w-37 z-50">
                                    {projectColors.map(col => {
                                        const isHex = col.startsWith('#');
                                        return (
                                            <button
                                                key={col}
                                                onClick={() => {
                                                    onUpdateProject?.(currentProject.id, { color: col });
                                                    setShowColorPicker(false);
                                                }}
                                                className={`w-6 h-6 rounded ${!isHex ? col : ''} border border-gray-300 hover:ring-2 hover:ring-cyan-400 transition`}
                                                style={isHex ? { backgroundColor: col } : {}}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 truncate max-w-full">
                            {currentProject.name}
                        </h1>
                    </div>
                )}

                {/* Tab Navigation */}
                <div className="mt-4 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-2">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview'
                                ? 'border-cyan-500 text-cyan-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('board')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'board'
                                ? 'border-cyan-500 text-cyan-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Board
                        </button>
                        {/* Add more tabs as needed: List, Timeline, Calendar, etc. */}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && <ProjectOverview projectId={projectId} />}
            {activeTab === 'board' && <ProjectBoard projectId={projectId} />}
        </Layout>
    );
};

export default ProjectDetails;