import { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const Home = ({ onLogout }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar
                onLogout={onLogout}
                isCollapsed={isSidebarCollapsed}
            />
            <Dashboard onToggleSidebar={toggleSidebar} />
        </div>
    );
};

export default Home; 