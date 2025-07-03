import Layout from '../components/Layout';

const Projects = ({ onLogout }) => {
    return (
        <Layout onLogout={onLogout}>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
                <p className="text-gray-600">Manage your team projects and collaborations</p>
            </div>

            {/* Projects Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Website Redesign</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Active</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Complete redesign of the company website with modern UI/UX.</p>
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">AS</div>
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">CD</div>
                        </div>
                        <span className="text-sm text-gray-500">75% Complete</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Mobile App</h3>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Planning</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Development of cross-platform mobile application.</p>
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">BJ</div>
                        </div>
                        <span className="text-sm text-gray-500">45% Complete</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">API Development</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Nearly Done</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Backend API development and documentation.</p>
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">BJ</div>
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">AS</div>
                        </div>
                        <span className="text-sm text-gray-500">90% Complete</span>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Projects; 