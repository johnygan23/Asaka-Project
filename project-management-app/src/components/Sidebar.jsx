import { NavLink } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
    return (
        <div className="flex-col bg-white shadow-lg transition-all duration-300 overflow-hidden w-64">
            <nav className="flex-1 p-4 flex flex-col">
                <ul className="space-y-1 flex-1">
                    <li>
                        <NavLink to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50">
                            <span className="font-medium truncate">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tasks" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50">
                            <span className="font-medium truncate">My Tasks</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/inbox" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50">
                            <span className="font-medium truncate">Inbox</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50">
                            <span className="font-medium truncate">Projects</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/teams" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50">
                            <span className="font-medium truncate">Team</span>
                        </NavLink>
                    </li>
                </ul>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 w-full text-left"
                    >
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;