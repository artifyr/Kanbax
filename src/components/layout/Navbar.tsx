import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Plus, LayoutGrid, ChevronDown, FileText } from 'lucide-react';
import { useTaskStore } from '../../hooks/useTaskStore';
import { useNavigate } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/time';

interface Props {
    onCreateTask: () => void;
}

export const Navbar: React.FC<Props> = ({ onCreateTask }) => {
    const { searchQuery, setSearchQuery, currentUser, unreadNotifications, clearUnread, activities, tasks, users } = useTaskStore();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Outside click handlers
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
                setShowNotifications(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSearchResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredTasks = tasks.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3);

    const hasResults = searchQuery.length > 0 && (filteredTasks.length > 0 || filteredUsers.length > 0);

    return (
        <header className="h-24 flex items-center justify-between px-10 bg-canvas-white/50 backdrop-blur-xl border-b border-midnight/[0.03] sticky top-0 z-40">
            <div className="flex-1 max-w-2xl group">
                <div className="relative" ref={searchRef}>
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-all w-4.5 h-4.5 group-hover:scale-110" />
                    <input
                        ref={inputRef}
                        value={searchQuery}
                        onFocus={() => setShowSearchResults(true)}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSearchResults(true);
                        }}
                        className="w-full bg-paper-white/80 border border-midnight/[0.03] focus:ring-4 focus:ring-primary/5 rounded-[1.5rem] pl-14 pr-6 py-4 text-sm font-bold text-midnight placeholder-slate-400 outline-none transition-all duration-500 focus:bg-paper-white focus:shadow-2xl focus:shadow-midnight/5 group-hover:bg-paper-white/90"
                        placeholder="Universal Search (Tasks, Users, Documentation...)"
                        type="text"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-canvas-white rounded-xl border border-midnight/[0.03] shadow-inner opacity-0 group-hover:opacity-100 transition-all cursor-default">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">⌘ + K</span>
                    </div>

                    {showSearchResults && hasResults && (
                        <div className="absolute top-full left-0 w-full mt-4 bg-paper-white rounded-3xl shadow-2xl border border-midnight/5 p-6 animate-soft-in overflow-hidden z-50">
                            <div className="space-y-6">
                                {filteredTasks.length > 0 && (
                                    <div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Work Items</h4>
                                        <div className="space-y-1">
                                            {filteredTasks.map(task => (
                                                <button
                                                    key={task.id}
                                                    onClick={() => {
                                                        navigate('/active-sprints');
                                                        setShowSearchResults(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-canvas-white transition-all text-left group/res"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                                                        <FileText className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs font-black text-midnight italic leading-none">{task.title}</p>
                                                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-1 block">{task.id} • {task.status}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {filteredUsers.length > 0 && (
                                    <div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Teammates</h4>
                                        <div className="space-y-1">
                                            {filteredUsers.map(user => (
                                                <button
                                                    key={user.id}
                                                    onClick={() => {
                                                        navigate('/profile');
                                                        setShowSearchResults(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-canvas-white transition-all text-left group/res"
                                                >
                                                    <img className="w-8 h-8 rounded-lg object-cover" src={user.avatar} alt="" />
                                                    <div className="flex-1">
                                                        <p className="text-xs font-black text-midnight leading-none">{user.name}</p>
                                                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-1 block">{user.title}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 pt-6 border-t border-midnight/5 flex justify-between items-center px-2">
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Search power-up active</span>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setShowSearchResults(false);
                                    }}
                                    className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline"
                                >
                                    Clear Results
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-6 ml-10">
                <div className="flex items-center gap-3 relative" ref={notificationsRef}>
                    <button
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            if (!showNotifications) clearUnread();
                        }}
                        className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary bg-paper-white/50 hover:bg-paper-white rounded-2xl transition-all relative group border border-midnight/[0.03] shadow-sm active:scale-90"
                    >
                        <Bell className="w-5 h-5 group-hover:rotate-[15deg] transition-transform" />
                        {unreadNotifications > 0 && (
                            <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-paper-white animate-bounce shadow-lg shadow-red-500/20"></span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute top-16 right-0 w-80 bg-paper-white rounded-3xl shadow-2xl border border-midnight/5 p-6 animate-soft-in">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-xs font-black text-midnight uppercase tracking-widest leading-none">Notifications</h4>
                                <span className="text-[10px] font-extrabold text-slate-400 uppercase leading-none">{activities.length} total</span>
                            </div>
                            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                                {activities.slice(0, 5).map((activity) => (
                                    <div key={activity.id} className="flex gap-4 group/item cursor-pointer">
                                        <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-[10px]
                                            ${activity.type === 'success' ? 'bg-lime/10 text-lime' :
                                                activity.type === 'warning' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                                            <Bell className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[11px] font-bold text-midnight leading-tight group-hover/item:text-primary transition-colors">
                                                <span className="opacity-50 font-extrabold uppercase text-[9px] mr-1">{activity.action}</span>
                                                {activity.target}
                                            </p>
                                            <p className="text-[9px] font-extrabold text-slate-400 mt-1 uppercase tracking-tighter opacity-70">{formatRelativeTime(activity.time)}</p>
                                        </div>
                                    </div>
                                ))}
                                {activities.length === 0 && (
                                    <p className="text-center py-8 text-[11px] font-extrabold text-slate-400 italic">No new activity</p>
                                )}
                            </div>
                        </div>
                    )}

                    <button className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary bg-paper-white/50 hover:bg-paper-white rounded-2xl transition-all group border border-midnight/[0.03] shadow-sm active:scale-90">
                        <LayoutGrid className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

                <div className="w-[1px] h-8 bg-midnight/[0.05] mx-2 shrink-0" />

                <button
                    onClick={onCreateTask}
                    className="bg-primary text-white pl-6 pr-5 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95 group leading-none"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    Create Task
                </button>

                <div
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-4 pl-4 cursor-pointer group"
                >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 overflow-hidden ring-4 ring-primary/5 group-hover:ring-primary/20 transition-all shadow-xl group-hover:-translate-y-1 group-active:scale-95 duration-300">
                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={currentUser?.avatar} alt="Profile" />
                    </div>
                    <div className="hidden xl:flex flex-col items-start leading-none gap-1.5 group-hover:translate-x-1 transition-transform">
                        <span className="text-xs font-black text-midnight tracking-tight italic">{currentUser?.name}</span>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-extrabold text-primary uppercase tracking-[0.1em]">{currentUser?.role}</span>
                            <ChevronDown className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
