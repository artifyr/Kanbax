import React from 'react';
import { Download, TrendingUp, Gauge, ChevronRight, BarChart3 } from 'lucide-react';
import { useTaskStore } from '../hooks/useTaskStore';

export const Reports: React.FC = () => {
    const { tasks, users, sprints } = useTaskStore();

    // Calculations
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const progress = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : '0';

    const highPriorityTasks = tasks.filter(t => t.priority === 'critical' || t.priority === 'high');
    const slaCompliance = totalTasks > 0 ? (100 - (highPriorityTasks.filter(t => t.status !== 'done').length / totalTasks) * 5).toFixed(1) : '100';

    const avgLoad = users.length > 0 ? Math.round((tasks.length / users.length) * 10) : 0;
    const qualityMetric = (90 + Math.random() * 5).toFixed(1);

    const handleExport = () => {
        window.print();
    };

    const kpis = [
        { label: 'Overall Progress', value: `${progress}%`, trend: '+4.2%', icon: TrendingUp, color: 'primary' },
        { label: 'SLA Compliance', value: `${slaCompliance}%`, trend: '+0.1%', icon: Gauge, color: 'lime' },
        { label: 'Mean Resource Load', value: `${avgLoad}%`, trend: '-2.5%', icon: BarChart3, color: 'mustard' },
        { label: 'Quality Assurance', value: `${qualityMetric}%`, trend: '+1.8%', icon: TrendingUp, color: 'primary' },
    ];

    return (
        <div className="space-y-12 animate-soft-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 mb-1 uppercase tracking-[0.2em]">
                        <span>Systems</span>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                        <span className="text-primary font-bold">Analytics Engine</span>
                    </div>
                    <h2 className="text-4xl text-midnight tracking-tight italic">Performance Reports</h2>
                    <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.2em] italic">Updated Just Now • {sprints.find(s => s.status === 'active')?.name || 'Global'} Focus</p>
                </div>
                <button 
                    onClick={handleExport}
                    className="flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95 group leading-none"
                >
                    <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    Export All Data
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {kpis.map((kpi, i) => (
                    <div key={i} className="bg-paper-white p-8 rounded-[2rem] shadow-soft border border-midnight/5 group hover:border-primary/20 transition-all">
                        <div className={`w-12 h-12 flex items-center justify-center mb-6 ring-8 ring-primary/5 rounded-2xl ${
                            kpi.color === 'primary' ? 'bg-primary/10 text-primary' :
                            kpi.color === 'lime' ? 'bg-lime/10 text-lime' : 'bg-mustard/10 text-mustard'
                        }`}>
                            <kpi.icon className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                        <div className="flex items-end gap-3">
                            <h3 className="text-3xl font-black text-midnight tracking-tight tabular-nums italic">{kpi.value}</h3>
                            <span className={`text-[10px] font-black italic mb-1.5 ${kpi.trend.startsWith('+') ? 'text-lime' : 'text-red-400'}`}>{kpi.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-8 bg-paper-white p-10 rounded-[3rem] shadow-soft border border-midnight/5 flex flex-col min-h-[500px]">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h3 className="text-xl font-black text-midnight tracking-tight">Burndown Velocity</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Ideal vs Actual task completion</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary/20 border-2 border-primary" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Ideal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Actual</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-end gap-3 h-full relative group">
                        {Array.from({ length: 14 }).map((_, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end gap-2 group/col h-full relative">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/col:opacity-100 transition-opacity rounded-xl" />
                                <div
                                    className="w-full bg-primary/10 rounded-t-lg transition-all duration-1000 origin-bottom"
                                    style={{ height: `${100 - (i * 7)}%` }}
                                />
                                <div
                                    className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-1000 origin-bottom shadow-lg shadow-primary/20 z-10"
                                    style={{ height: `${Math.max(10, 100 - (i * 7) + (Math.sin(i) * 15))}%` }}
                                />
                            </div>
                        ))}
                        <div className="absolute bottom-0 left-0 text-[9px] font-black text-slate-400 uppercase tracking-widest py-4 border-t border-midnight/5 w-full flex justify-between">
                            <span>Day 0</span>
                            <span>Day 7</span>
                            <span>Day 14</span>
                        </div>
                    </div>
                </div>

                {/* Secondary Charts */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="bg-ink-navy text-white p-10 rounded-[3rem] shadow-2xl shadow-midnight/30 flex-1 relative overflow-hidden group">
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                        <div className="relative z-10">
                            <h3 className="text-xl font-black tracking-tight italic">Task Distribution</h3>
                            <div className="mt-12 flex items-center justify-center relative scale-125">
                                {/* Custom CSS Donut */}
                                <div className="w-40 h-40 rounded-full border-[1.5rem] border-white/5 relative flex items-center justify-center">
                                    <div className="absolute w-[calc(100%+3rem)] h-[calc(100%+3rem)] border-[1.5rem] border-primary rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)' }} />
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl font-black">68%</span>
                                        <span className="text-[10px] font-extrabold text-white/40 uppercase tracking-widest mt-1">Design</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-16 space-y-4">
                                {[
                                    { label: 'Engineering', value: '24%', color: 'white/40' },
                                    { label: 'Management', value: '8%', color: 'white/10' }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full bg-${item.color}`} />
                                            <span className="text-white/60">{item.label}</span>
                                        </div>
                                        <span>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-paper-white p-10 rounded-[3rem] shadow-soft border border-midnight/5 lg:h-[300px]">
                        <h3 className="text-xl font-black text-midnight tracking-tight leading-none italic">Throughput Delta</h3>
                        <div className="mt-12 h-24 flex items-end gap-2">
                            {[30, 70, 45, 90, 60, 35, 80].map((h, i) => (
                                <div key={i} className="flex-1 bg-primary/10 rounded-t-xl group/bar relative h-full flex flex-col justify-end">
                                    <div className="bg-primary rounded-t-xl h-0 group-hover:h-full transition-all duration-700" style={{ height: `${h}%` }} />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity">7.2</div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                            Aggregated output has increased by <span className="text-primary">+12.4%</span> across all workcells this quarter.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
