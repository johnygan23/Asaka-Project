import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CreateProjectModal from '../components/CreateProjectModal';

const Projects = ({ onLogout, projects, onAddProject }) => {
    const [showCreateModal, setShowCreateModal] = useState(false);

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
        </Layout>
    );
};

export default Projects;