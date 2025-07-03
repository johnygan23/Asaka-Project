import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const Home = ({ onLogout }) => {
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onToggleSidebar={toggleSidebar} />
            <div className="flex flex-1">
                {showSidebar && (
                    <Sidebar onLogout={onLogout} />
                )}
                <Dashboard />
            </div>
        </div>
    );
};

export default Home; 