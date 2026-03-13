import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info, ArrowRight, Plus } from 'lucide-react';

export const Calendar: React.FC = () => {
    const days = Array.from({ length: 35 }, (_, i) => i - 5); // Simple mock grid starting from last month

    return (
        <div className="space-y-8 animate-soft-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 mb-1 uppercase tracking-[0.2em]">
                        <span>Workspace</span>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                        <span className="text-primary font-bold">Project Scheduler</span>
                    </div>
                    <h2 className="text-4xl text-midnight tracking-tight">September 2024</h2>
                    <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.2em]">48 tasks scheduled this month</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-paper-white p-1 rounded-xl flex gap-1 border border-midnight/[0.03] shadow-sm">
                        <button className="px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest bg-canvas-white text-primary shadow-inner">Month</button>
                        <button className="px-5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-widest text-slate-400 hover:text-midnight transition-all">Week</button>
                        <button className="px-5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-widest text-slate-400 hover:text-midnight transition-all">Day</button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2.5 bg-paper-white hover:bg-canvas-white rounded-xl text-slate-400 hover:text-midnight transition-colors border border-midnight/[0.03] shadow-sm">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="px-6 py-2.5 bg-paper-white hover:bg-canvas-white rounded-xl text-[11px] font-black uppercase tracking-widest text-midnight border border-midnight/[0.03] shadow-sm active:scale-95 transition-all">Today</button>
                        <button className="p-2.5 bg-paper-white hover:bg-canvas-white rounded-xl text-slate-400 hover:text-midnight transition-colors border border-midnight/[0.03] shadow-sm">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-paper-white rounded-[2.5rem] overflow-hidden shadow-soft border border-midnight/5">
                <div className="grid grid-cols-7 border-b border-midnight/[0.03] bg-canvas-white/30 backdrop-blur-sm">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400/80">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 auto-rows-[minmax(140px,auto)] gap-[1px] bg-midnight/[0.03]">
                    {days.map((day, i) => {
                        const isCurrentMonth = day > 0 && day <= 30;
                        const isToday = day === 19;

                        return (
                            <div key={i} className={`p-4 transition-colors relative group 
                ${isCurrentMonth ? 'bg-paper-white hover:bg-canvas-white' : 'bg-canvas-white/40 opacity-40'} 
                ${isToday ? 'ring-2 ring-primary ring-inset z-10' : ''}`}>
                                <span className={`text-xs font-black tracking-tight ${isToday ? 'text-primary' : 'text-midnight/60'}`}>
                                    {day <= 0 ? 31 + day : (day > 30 ? day - 30 : day)}
                                </span>

                                <div className="mt-4 space-y-2">
                                    {day === 2 && (
                                        <div className="bg-primary/10 border-l-4 border-primary px-3 py-2 rounded-r-xl text-[10px] font-black text-primary uppercase tracking-tighter truncate group-hover:scale-105 transition-transform">
                                            Sprint Planning
                                        </div>
                                    )}
                                    {day === 3 && (
                                        <div className="bg-lime/10 border-l-4 border-lime px-3 py-2 rounded-r-xl text-[10px] font-black text-lime uppercase tracking-tighter truncate">
                                            Design Review
                                        </div>
                                    )}
                                    {day === 10 && (
                                        <div className="absolute left-2 right-[-100%] top-12 h-8 bg-primary rounded-full z-10 flex items-center px-4 shadow-xl shadow-primary/20 group-hover:-translate-y-1 transition-transform">
                                            <span className="text-white text-[10px] font-black uppercase tracking-[0.1em]">Product Launch Phase 1</span>
                                        </div>
                                    )}
                                    {day === 19 && (
                                        <div className="bg-primary border-l-4 border-white shadow-lg px-3 py-2 rounded-r-xl text-[10px] font-black text-white uppercase tracking-tighter truncate animate-pulse">
                                            Deployment Day
                                        </div>
                                    )}
                                </div>

                                <button className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white rounded-lg shadow-sm border border-midnight/5">
                                    <Plus className="w-3.5 h-3.5 text-slate-400 hover:text-primary" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Info Bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-paper-white p-8 rounded-[2rem] shadow-soft border border-midnight/5 flex flex-col justify-between group hover:border-primary/20 transition-all">
                    <div>
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 ring-8 ring-primary/5">
                            <CalendarIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-midnight tracking-tight">Upcoming Priority</h3>
                        <p className="text-xs font-bold text-slate-400 mt-3 leading-relaxed">Next high-priority task starts in 2 days: <span className="text-primary font-black uppercase tracking-widest">API Integration</span>.</p>
                    </div>
                    <button className="mt-8 text-[11px] font-black text-primary flex items-center gap-2 uppercase tracking-widest hover:gap-4 transition-all">
                        View Details <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="bg-paper-white p-8 rounded-[2rem] shadow-soft border border-midnight/5 flex flex-col justify-between hover:border-mustard/20 transition-all">
                    <div>
                        <div className="w-12 h-12 bg-mustard/10 text-mustard rounded-2xl flex items-center justify-center mb-6 ring-8 ring-mustard/5">
                            <Info className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-midnight tracking-tight">Resource Conflict</h3>
                        <p className="text-xs font-bold text-slate-400 mt-3 leading-relaxed">Sarah Chen is double-booked on Sept 24th for <span className="text-mustard font-black uppercase tracking-widest">Asset Review</span> and <span className="text-mustard font-black uppercase tracking-widest">Sprint Sync</span>.</p>
                    </div>
                    <div className="flex -space-x-3 mt-8">
                        {[1, 2, 3].map(i => (
                            <img key={i} className="w-9 h-9 rounded-full border-4 border-paper-white shadow-sm ring-1 ring-midnight/5" src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="avatar" />
                        ))}
                        <div className="w-9 h-9 rounded-full bg-canvas-white border-4 border-paper-white flex items-center justify-center text-[10px] font-black text-slate-400">+2</div>
                    </div>
                </div>

                <div className="bg-midnight p-8 rounded-[2rem] shadow-2xl shadow-midnight/30 flex flex-col justify-between text-white relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-xl font-black tracking-tight">Sprint 42 Health</h3>
                        <div className="mt-10 flex items-end gap-3 text-white">
                            <span className="text-5xl font-black tracking-tighter">84%</span>
                            <span className="text-[10px] font-extrabold text-white/50 uppercase tracking-[0.2em] mb-2 leading-none">Completion Target</span>
                        </div>
                        <div className="mt-6 w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5">
                            <div className="bg-primary h-full rounded-full w-[84%] shadow-[0_0_15px_rgba(0,89,186,0.5)] transition-all duration-1000" />
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                </div>
            </div>
        </div>
    );
};
