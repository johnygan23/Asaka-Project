import Layout from '../components/Layout';

const Tasks = ({ onLogout }) => {
    return (
        <Layout onLogout={onLogout}>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
                <p className="text-gray-600">View and manage all your assigned tasks</p>
            </div>

            {/* Tasks Content */}
            <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Task List</h2>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="w-4 h-4 text-cyan-600" />
                                <div>
                                    <h3 className="font-medium text-gray-900">Review project proposal</h3>
                                    <p className="text-sm text-gray-500">Due: Tomorrow</p>
                                </div>
                            </div>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">In Progress</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="w-4 h-4 text-cyan-600" />
                                <div>
                                    <h3 className="font-medium text-gray-900">Update user interface</h3>
                                    <p className="text-sm text-gray-500">Due: Next week</p>
                                </div>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Tasks; 