import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CreateProjectModal from '../components/CreateProjectModal';
import { useNavigate } from 'react-router-dom';

const Projects = ({ onLogout, projects, onAddProject }) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const navigate = useNavigate();

    // Listen for custom event from Header
    useEffect(() => {
        const handleOpenCreateProject = () => {
            setShowCreateModal(true);
        };

        window.addEventListener('openCreateProject', handleOpenCreateProject);

        return () => {
            window.removeEventListener('openCreateProject', handleOpenCreateProject);
        };
    }, []);

    const handleCreateClick = () => {
        setShowCreateModal(true);
    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
    };

    const handleProjectCreate = (projectData) => {
        onAddProject(projectData);
        setShowCreateModal(false);
    };

    const handleProjectClick = (id) => {
        navigate(`/projects/${id}`);
    };

    return (
        <Layout onLogout={onLogout} projects={projects}>
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
                        <p className="text-gray-600">Manage your team projects and collaborations</p>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => handleProjectClick(project.id)}
                        className="cursor-pointer bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span
                                className={`w-4 h-4 rounded-sm flex-shrink-0 ${project.color.startsWith('#') ? '' : project.color}`}
                                style={project.color.startsWith('#') ? { backgroundColor: project.color } : {}}
                            />
                            <h2 className="text-lg font-semibold text-gray-900 truncate">{project.name}</h2>
                        </div>
                        {project.status && (
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                {project.status}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Create Project Modal */}
            {showCreateModal && (
                <CreateProjectModal
                    onClose={handleCloseModal}
                    onCreate={handleProjectCreate}
                    projectsCount={projects.length}
                />
            )}
        </Layout>
    );
};

export default Projects;