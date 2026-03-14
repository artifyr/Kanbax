import React from 'react';
import { TrendingUp, Gauge, ChevronRight, BarChart3, FileJson, Printer } from 'lucide-react';
import { useTaskStore } from '../hooks/useTaskStore';
import { AnalyticsDashboard } from '../components/analytics/AnalyticsDashboard';
import { exportToCSV, exportToPDF } from '../utils/export';

export const Reports: React.FC = () => {
    const { tasks, users, sprints } = useTaskStore();

    // Calculations for KPIs
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const progress = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : '0';

    const highPriorityTasks = tasks.filter(t => t.priority === 'critical' || t.priority === 'high');
    const slaCompliance = totalTasks > 0 ? (100 - (highPriorityTasks.filter(t => t.status !== 'done').length / totalTasks) * 5).toFixed(1) : '100';

    const avgLoad = users.length > 0 ? Math.round((tasks.length / users.length) * 10) : 0;

    const handleCSVExport = () => {
        exportToCSV(tasks, `kanbax-report-${new Date().toISOString().split('T')[0]}.csv`);
    };

    const kpis = [
        { label: 'Overall Progress', value: `${progress}%`, trend: '+4.2%', icon: TrendingUp, color: 'primary' },
        { label: 'SLA Compliance', value: `${slaCompliance}%`, trend: '+0.1%', icon: Gauge, color: 'lime' },
        { label: 'Mean Resource Load', value: `${avgLoad}%`, trend: '-2.5%', icon: BarChart3, color: 'mustard' },
        { label: 'Active Tasks', value: tasks.filter(t => t.status !== 'done').length, trend: 'stable', icon: BarChart3, color: 'primary' },
    ];

    return (
        <div className="space-y-12 animate-soft-in select-none">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 mb-1 uppercase tracking-[0.2em]">
                        <span>Systems</span>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                        <span className="text-primary font-bold">Analytics Engine</span>
                    </div>
                    <h2 className="text-4xl text-midnight tracking-tight italic">Performance Reports</h2>
                    <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.2em] italic">Real-time Data • {sprints.find(s => s.status === 'active')?.name || 'Global'} Focus</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={handleCSVExport}
                        className="flex items-center gap-3 bg-canvas-white text-midnight border border-midnight/10 px-8 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-soft hover:-translate-y-1 transition-all active:scale-95 group leading-none"
                    >
                        <FileJson className="w-4 h-4 text-primary" />
                        CSV
                    </button>
                    <button 
                        onClick={exportToPDF}
                        className="flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95 group leading-none"
                    >
                        <Printer className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Print Report
                    </button>
                </div>
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
                            <span className={`text-[10px] font-black italic mb-1.5 ${kpi.trend.startsWith('+') ? 'text-lime' : kpi.trend === 'stable' ? 'text-slate-400' : 'text-red-400'}`}>{kpi.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Analytics Section */}
            <div className="pt-8">
                <div className="mb-10 text-center">
                    <h3 className="text-2xl font-black text-midnight italic tracking-tight uppercase">Detailed Insights</h3>
                    <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full opacity-20" />
                </div>
                <AnalyticsDashboard />
            </div>
        </div>
    );
};
