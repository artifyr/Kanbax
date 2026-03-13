import React, { useState } from 'react';
import { UserPlus, MoreHorizontal, ChevronRight, CheckCircle2, Plus, Trash2, Mail, ExternalLink } from 'lucide-react';
import { useTaskStore } from '../hooks/useTaskStore';
import { motion, AnimatePresence } from 'framer-motion';

export const Team: React.FC = () => {
    const { users, tasks, removeUser, currentUser } = useTaskStore();
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const handleDelete = (userId: string) => {
        if (window.confirm('Are you sure you want to remove this team member? Their assigned tasks will remain but will become unassigned.')) {
            removeUser(userId);
            setActiveMenu(null);
        }
    };

    return (
        <div className="space-y-12 animate-soft-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 mb-1 uppercase tracking-[0.2em]">
                        <span>Workspace</span>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                        <span className="text-primary font-bold">Team Overview</span>
                    </div>
                    <h2 className="text-4xl text-midnight tracking-tight italic">Team Management</h2>
                    <div className="flex gap-10 mt-6 overflow-x-auto pb-2 no-scrollbar">
                        <div className="flex flex-col min-w-max">
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1 leading-none">Total Members</span>
                            <span className="text-2xl font-black text-midnight tabular-nums">{users.length}</span>
                        </div>
                        <div className="flex flex-col min-w-max">
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1 leading-none">Status</span>
                            <span className="text-2xl font-black text-lime tracking-tight uppercase italic text-sm mt-1">Prime Active</span>
                        </div>
                        <div className="flex flex-col min-w-max">
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1 leading-none">Open Slots</span>
                            <span className="text-2xl font-black text-mustard tabular-nums">02</span>
                        </div>
                    </div>
                </div>
                <button className="bg-gradient-to-r from-primary to-electric text-white px-8 py-3.5 rounded-2xl text-[11px] font-extrabold uppercase tracking-widest shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all flex items-center gap-3 active:scale-95 group">
                    <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" /> Add Team Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {users.map((member) => {
                    const memberTasks = tasks.filter(t => t.assigneeId === member.id).length;
                    const capacity = Math.min(100, (memberTasks / 5) * 100); 

                    return (
                        <div key={member.id} className="bg-paper-white rounded-[2.5rem] p-8 shadow-soft border border-midnight/5 group hover:border-primary/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                <div className="relative">
                                    <button 
                                        onClick={() => setActiveMenu(activeMenu === member.id ? null : member.id)}
                                        className={`text-slate-300 hover:text-midnight transition-colors p-2 rounded-lg ${activeMenu === member.id ? 'bg-canvas-white text-midnight' : 'hover:bg-canvas-white'}`}
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                    
                                    <AnimatePresence>
                                        {activeMenu === member.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-midnight/5 overflow-hidden z-30"
                                            >
                                                <div className="p-2 space-y-1">
                                                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-canvas-white hover:text-midnight rounded-xl transition-all">
                                                        <Mail className="w-3.5 h-3.5" /> Message
                                                    </button>
                                                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-canvas-white hover:text-midnight rounded-xl transition-all">
                                                        <ExternalLink className="w-3.5 h-3.5" /> Profile
                                                    </button>
                                                    <div className="h-px bg-midnight/[0.03] mx-2 my-1" />
                                                    <button 
                                                        disabled={currentUser?.id === member.id}
                                                        onClick={() => handleDelete(member.id)}
                                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all 
                                                            ${currentUser?.id === member.id 
                                                                ? 'opacity-30 cursor-not-allowed text-slate-400' 
                                                                : 'text-red-500 hover:bg-red-500/10'}`}
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" /> Remove member
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            
                            {/* Card Content */}
                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="w-28 h-28 rounded-full border-[6px] border-canvas-white shadow-xl overflow-hidden group-hover:rotate-6 transition-transform duration-500">
                                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className={`absolute bottom-1 right-1 w-7 h-7 rounded-full border-4 border-paper-white shadow-lg flex items-center justify-center bg-lime`}>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-extrabold text-midnight tracking-tight mb-1 group-hover:text-primary transition-colors italic">{member.name}</h4>
                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-8">{member.title}</p>

                                <div className="w-full space-y-3">
                                    <div className="flex justify-between text-[9px] font-extrabold uppercase tracking-[0.2em]">
                                        <span className="text-slate-400">Current Load</span>
                                        <span className={capacity > 90 ? 'text-mustard' : 'text-primary'}>{Math.round(capacity)}%</span>
                                    </div>
                                    <div className="h-3 bg-foggy-blue rounded-full overflow-hidden p-0.5 border border-midnight/[0.03]">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ease-out 
                                            ${capacity > 90 ? 'bg-mustard' : 'bg-gradient-to-r from-primary to-electric'}`}
                                            style={{ width: `${capacity}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 w-full mt-8 pt-6 border-t border-midnight/[0.03]">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1.5 opacity-60">Tasks</span>
                                        <span className="text-md font-black text-midnight tabular-nums">{memberTasks}</span>
                                    </div>
                                    <div className="flex flex-col items-center border-l border-midnight/[0.03]">
                                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1.5 opacity-60">Velocity</span>
                                        <span className="text-md font-black text-midnight tabular-nums">1.4x</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div 
                    onClick={() => {}}
                    className="bg-canvas-white/30 rounded-[2.5rem] border-2 border-dashed border-midnight/10 flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-paper-white hover:border-primary/30 transition-all group min-h-[360px] active:scale-95 duration-300"
                >
                    <div className="w-16 h-16 rounded-full bg-midnight/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all shadow-sm">
                        <Plus className="w-7 h-7 text-slate-300 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Invite New Talent</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-2 group-hover:opacity-100 opacity-0 transition-opacity">Expand your workspace</p>
                </div>
            </div>
        </div>
    );
};
