import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, onLogout, showSidebar: externalShowSidebar = null }) => {
    // Internal state for sidebar visibility (only used if not controlled externally)
    const [internalShowSidebar, setInternalShowSidebar] = useState(true);

    // Use external state if provided, otherwise use internal state
    const showSidebar = externalShowSidebar !== null ? externalShowSidebar : internalShowSidebar;
    const setShowSidebar = externalShowSidebar !== null ? () => { } : setInternalShowSidebar;

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header spans full width above everything */}
            <Header onToggleSidebar={toggleSidebar} />

            {/* Content area with sidebar and main content */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar with smooth transitions */}
                <div
                    className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-64' : 'w-0'
                        } overflow-hidden relative z-10`}
                >
                    <div className={`w-64 h-full bg-white shadow-lg transform transition-all duration-300 ease-in-out ${showSidebar
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-full opacity-0'
                        }`}>
                        <Sidebar onLogout={onLogout} />
                    </div>
                </div>

                {/* Main Content Area with smooth transition */}
                <main className="flex-1 flex flex-col overflow-auto transition-all duration-300 ease-in-out">
                    <div className="flex-1 p-6">
                        <div className="max-w-7xl mx-auto transition-all duration-300 ease-in-out">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout; 