import React from 'react';
import { TEAM_THROUGHPUT } from '../data/mockData';
import { TrendingUp, AlertCircle, ArrowRight, CheckCircle2, Clock, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../hooks/useTaskStore';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    const { tasks, activities, users, setCreateModalOpen } = useTaskStore();
    const navigate = useNavigate();

    const criticalTasks = tasks.filter(t => t.priority === 'critical' || t.priority === 'high').length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const totalTasks = tasks.length;
    const healthPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="space-y-12 animate-soft-in">
            {/* Hero Section */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-electric/10 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 py-4 px-2">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 mb-2 uppercase tracking-[0.3em]">
                            <Zap className="w-3 h-3 text-primary animate-pulse" />
                            <span>System Overview</span>
                        </div>
                        <h2 className="text-5xl font-black text-midnight tracking-tighter italic">
                            Workspace <span className="text-primary not-italic tracking-normal">Optimal.</span>
                        </h2>
                        <p className="text-slate-500 font-medium mt-3 text-lg max-w-xl leading-relaxed">
                            Currently managing <span className="text-midnight font-black">{totalTasks} tasks</span> across <span className="text-primary font-black">{users.length} teammates</span>.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setCreateModalOpen(true)}
                            className="bg-primary text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl active:scale-95 hover:brightness-110 transition-all"
                        >
                            Quick Create
                        </button>
                        <button
                            onClick={() => navigate('/backlog')}
                            className="bg-paper-white border border-midnight/10 text-midnight px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-soft active:scale-95 transition-all hover:bg-canvas-white"
                        >
                            Explore Backlog
                        </button>
                    </div>
                </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Weekly Velocity */}
                <div className="lg:col-span-4 bg-paper-white p-8 rounded-[2.5rem] shadow-soft border border-midnight/5 group hover:border-primary/20 transition-all relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 ring-8 ring-primary/5">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weekly Velocity</p>
                        <h3 className="text-4xl font-black text-midnight tracking-tight tabular-nums">42.8</h3>
                        <div className="mt-6 flex items-center gap-2 text-lime font-black text-[10px] uppercase tracking-widest">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>+12% vs last week</span>
                        </div>
                        <div className="mt-8 flex items-end gap-1.5 h-16">
                            {[40, 60, 35, 90, 55, 75, 45].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.1, duration: 1 }}
                                    className={`flex-1 rounded-t-lg ${i === 3 ? 'bg-primary' : 'bg-slate-200'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Throughput */}
                <div className="lg:col-span-8 bg-paper-white p-10 rounded-[3rem] shadow-soft border border-midnight/5">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black text-midnight tracking-tight italic">Resource Allocation</h3>
                        </div>
                        <div className="flex -space-x-4">
                            {users.map((user, i) => (
                                <img key={i} className="w-10 h-10 rounded-2xl border-4 border-paper-white shadow-xl ring-1 ring-midnight/5" src={user.avatar} alt={user.name} />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        {TEAM_THROUGHPUT.map((member, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-[11px] font-black text-midnight uppercase tracking-widest mb-3">
                                    <span>{member.name}</span>
                                    <span>{member.progress}%</span>
                                </div>
                                <div className="w-full bg-canvas-white h-4 rounded-full overflow-hidden p-1 border border-midnight/5 shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${member.progress}%` }}
                                        className="h-full rounded-full bg-primary"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-4 bg-paper-white rounded-[3rem] shadow-soft border border-midnight/5 overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-midnight/[0.03] bg-canvas-white/30">
                        <h3 className="text-xl font-black text-midnight tracking-tight italic">Pulse Feed</h3>
                    </div>
                    <div className="flex-1 p-8 space-y-8 overflow-y-auto no-scrollbar max-h-[400px]">
                        {activities.length > 0 ? activities.map((activity, i) => {
                            const user = users.find(u => u.id === activity.userId);
                            return (
                                <div key={i} className="flex gap-5 group items-start">
                                    <img className="w-10 h-10 rounded-xl object-cover ring-4 ring-transparent" src={user?.avatar || 'https://i.pravatar.cc/100?u=sys'} alt="user" />
                                    <div className="flex-1 pt-0.5">
                                        <p className="text-xs font-bold text-slate-500 leading-snug">
                                            <span className="text-midnight font-black italic">{user?.name || 'System'}</span> {activity.action} <span className="text-primary font-black">{activity.target}</span>
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Clock className="w-3 h-3 text-slate-300" />
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{activity.time}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : (
                            <div className="text-center py-10 opacity-40 italic font-bold">No recent pulses detected.</div>
                        )}
                    </div>
                </div>

                {/* Backlog Health */}
                <div className="lg:col-span-5 bg-ink-navy text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <AlertCircle className="w-6 h-6 text-red-400 mb-8" />
                            <h3 className="text-4xl font-black tracking-tight leading-tight italic">{criticalTasks} High Risk Items</h3>
                        </div>
                        <button
                            onClick={() => navigate('/backlog')}
                            className="mt-12 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] bg-white/10 py-5 px-8 rounded-2xl w-fit active:scale-95 transition-all"
                        >
                            Audit Library <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Sprint Health */}
                <div className="lg:col-span-3 bg-paper-white p-8 rounded-[2.5rem] shadow-soft border border-midnight/5 flex flex-col items-center justify-center text-center">
                    <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" className="text-midnight/5" strokeWidth="12" />
                            <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" className="text-primary" strokeWidth="12" strokeDasharray="440" strokeDashoffset={440 - (440 * healthPercentage / 100)} strokeLinecap="round" />
                        </svg>
                        <div className="absolute flex flex-col">
                            <span className="text-3xl font-black text-midnight tracking-tighter tabular-nums">{healthPercentage}%</span>
                            <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">Health</span>
                        </div>
                    </div>
                    <h4 className="text-lg font-black text-midnight italic tracking-tight">Active Sprint 42</h4>
                    <div className="flex items-center gap-2 text-lime font-black text-[10px] uppercase tracking-widest mt-2">
                        <Target className="w-3 h-3" />
                        <span>{healthPercentage > 50 ? 'On Track' : 'Needs Review'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
