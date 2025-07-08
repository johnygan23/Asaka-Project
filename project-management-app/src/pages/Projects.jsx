import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CreateProjectModal from '../components/CreateProjectModal';
import { useNavigate } from 'react-router-dom';
import { getAllProjectsByUserId, addProject } from '../API/ProjectAPI';

const Projects = ({ onLogout }) => {
    const [projects, setProjects] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getAllProjectsByUserId();
                const data = response?.data ?? [];
                // Some APIs wrap list inside property, handle gracefully
                const list = Array.isArray(data) ? data : data.projects || [];
                setProjects(list);
            } catch (error) {
                console.error('Failed to load projects', error);
                setProjects([]);
            }
        };
        fetchProjects();
    }, []);

    // Listen for custom event from Header to open the Create Project modal
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

    const handleProjectCreate = async (projectData) => {
        try {
            await addProject(projectData);
            // After successful creation, refresh list from server so sidebar stays in sync everywhere
            const reload = await getAllProjectsByUserId();
            const list = Array.isArray(reload?.data) ? reload.data : reload?.data?.projects || [];
            setProjects(list);
        } catch (error) {
            // Optionally handle error
            console.error("Error creating project", error);
        }
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
                                className={`w-4 h-4 rounded-sm flex-shrink-0 ${project.color?.startsWith('#') ? '' : project.color}`}
                                style={project.color?.startsWith('#') ? { backgroundColor: project.color } : {}}
                            />
                            <h2 className="text-lg font-semibold text-gray-900 truncate">{project.title}</h2>
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