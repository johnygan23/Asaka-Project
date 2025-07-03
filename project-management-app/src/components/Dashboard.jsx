const Dashboard = () => {
    return (
        <main className="flex-1 flex flex-col">
            <div className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Dashboard</h1>
                        <p className="text-gray-600">Manage your projects and tasks efficiently</p>
                    </div>

                    {/* Placeholder content - you can expand this later */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Stats</h3>
                            <p className="text-gray-600">Your project overview will appear here</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
                            <p className="text-gray-600">Latest updates and notifications</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Tasks</h3>
                            <p className="text-gray-600">Your pending tasks and deadlines</p>
                        </div>
                    </div>

                    {/* Additional sections can be added here */}
                    <div className="mt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">Website Redesign</span>
                                            <span className="text-sm text-gray-500">75%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">Mobile App</span>
                                            <span className="text-sm text-gray-500">45%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">API Development</span>
                                            <span className="text-sm text-gray-500">90%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                AS
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Alice Smith</p>
                                                <p className="text-sm text-gray-500">Frontend Developer</p>
                                            </div>
                                        </div>
                                        <span className="text-green-600 font-semibold">95%</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                BJ
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Bob Johnson</p>
                                                <p className="text-sm text-gray-500">Backend Developer</p>
                                            </div>
                                        </div>
                                        <span className="text-green-600 font-semibold">88%</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                CD
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Carol Davis</p>
                                                <p className="text-sm text-gray-500">UI/UX Designer</p>
                                            </div>
                                        </div>
                                        <span className="text-green-600 font-semibold">92%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard; 