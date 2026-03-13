import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { CreateTaskModal } from './CreateTaskModal';
import { TaskDetailDrawer } from './TaskDetailDrawer';
import { useTaskStore } from '../../hooks/useTaskStore';

export const MainLayout: React.FC = () => {
    const { isCreateModalOpen, setCreateModalOpen, theme } = useTaskStore();
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <div className="flex h-screen bg-canvas-white overflow-hidden font-sans selection:bg-primary/10 selection:text-primary">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-foggy-blue/20">
                <Navbar onCreateTask={() => setCreateModalOpen(true)} />

                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    <Outlet />
                </div>
            </main>

            {/* Global Modals */}
            <CreateTaskModal
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
            />
            <TaskDetailDrawer />
        </div>
    );
};
