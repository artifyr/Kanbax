import React from 'react';
import { Search, Bell, Plus, LayoutGrid, ChevronDown } from 'lucide-react';
import { useTaskStore } from '../../hooks/useTaskStore';
import { useNavigate } from 'react-router-dom';

interface Props {
    onCreateTask: () => void;
}

export const Navbar: React.FC<Props> = ({ onCreateTask }) => {
    const { searchQuery, setSearchQuery, currentUser } = useTaskStore();
    const navigate = useNavigate();

    return (
        <header className="h-24 flex items-center justify-between px-10 bg-canvas-white/50 backdrop-blur-xl border-b border-midnight/[0.03] sticky top-0 z-40">
            <div className="flex-1 max-w-2xl group">
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-all w-4.5 h-4.5 group-hover:scale-110" />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-paper-white/80 border border-midnight/[0.03] focus:ring-4 focus:ring-primary/5 rounded-[1.5rem] pl-14 pr-6 py-4 text-sm font-bold placeholder-slate-400 outline-none transition-all duration-500 focus:bg-white focus:shadow-2xl focus:shadow-midnight/5 group-hover:bg-white"
                        placeholder="Universal Search (Tasks, Users, Documentation...)"
                        type="text"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-canvas-white rounded-xl border border-midnight/[0.03] shadow-inner opacity-0 group-hover:opacity-100 transition-all cursor-default">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">⌘ + K</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 ml-10">
                <div className="flex items-center gap-3">
                    <button className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-midnight bg-paper-white/50 hover:bg-white rounded-2xl transition-all relative group border border-midnight/[0.03] shadow-sm active:scale-90">
                        <Bell className="w-5 h-5 group-hover:rotate-[15deg] transition-transform" />
                        <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-bounce shadow-lg shadow-red-500/20"></span>
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-midnight bg-paper-white/50 hover:bg-white rounded-2xl transition-all group border border-midnight/[0.03] shadow-sm active:scale-90">
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
