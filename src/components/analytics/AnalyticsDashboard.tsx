import React, { useMemo } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend,
    BarChart, Bar, LineChart, Line
} from 'recharts';
import { useTaskStore } from '../../hooks/useTaskStore';
import { format, subDays, startOfDay, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { TrendingUp, Target, Activity, Users } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
    const { tasks, users } = useTaskStore();

    // 1. Weekly Velocity Data (Area Chart)
    const velocityData = useMemo(() => {
        const last7Days = eachDayOfInterval({
            start: subDays(new Date(), 6),
            end: new Date()
        });

        return last7Days.map(date => {
            const completedOnDay = tasks.filter(t => 
                t.status === 'done' && 
                t.updatedAt && 
                isSameDay(parseISO(t.updatedAt), date)
            ).length;

            return {
                name: format(date, 'MMM dd'),
                completed: completedOnDay,
                total: tasks.filter(t => isSameDay(parseISO(t.createdAt), date)).length
            };
        });
    }, [tasks]);

    // 2. Priority Distribution (Pie Chart)
    const priorityData = useMemo(() => {
        const counts = {
            critical: tasks.filter(t => t.priority === 'critical').length,
            high: tasks.filter(t => t.priority === 'high').length,
            medium: tasks.filter(t => t.priority === 'medium').length,
            low: tasks.filter(t => t.priority === 'low').length,
        };

        return [
            { name: 'Critical', value: counts.critical, color: '#ef4444' },
            { name: 'High', value: counts.high, color: '#f97316' },
            { name: 'Medium', value: counts.medium, color: '#eab308' },
            { name: 'Low', value: counts.low, color: '#84cc16' },
        ].filter(d => d.value > 0);
    }, [tasks]);

    // 3. Team Performance (Bar Chart)
    const teamData = useMemo(() => {
        return users.map(user => {
            const userTasks = tasks.filter(t => t.assigneeId === user.id);
            const completed = userTasks.filter(t => t.status === 'done').length;
            return {
                name: user.name.split(' ')[0],
                completed,
                total: userTasks.length
            };
        });
    }, [tasks, users]);

    const totalCompleted = tasks.filter(t => t.status === 'done').length;
    const completionRate = tasks.length > 0 ? Math.round((totalCompleted / tasks.length) * 100) : 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-soft-in">
            {/* KPI Row */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Completion Rate', value: `${completionRate}%`, icon: Target, color: 'text-primary' },
                    { label: 'Total Tasks', value: tasks.length, icon: Activity, color: 'text-midnight' },
                    { label: 'Team Members', value: users.length, icon: Users, color: 'text-slate-400' },
                    { label: 'Avg Velocity', value: (velocityData.reduce((a, b) => a + b.completed, 0) / 7).toFixed(1), icon: TrendingUp, color: 'text-lime' }
                ].map((kpi, i) => (
                    <div key={i} className="bg-paper-white p-6 rounded-3xl border border-midnight/5 shadow-soft flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl bg-canvas-white flex items-center justify-center ${kpi.color}`}>
                            <kpi.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{kpi.label}</p>
                            <h4 className="text-2xl font-black text-midnight tabular-nums tracking-tighter">{kpi.value}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Velocity Trend */}
            <div className="lg:col-span-8 bg-paper-white p-8 rounded-[2.5rem] shadow-soft border border-midnight/5">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-midnight tracking-tight italic">Velocity Trend</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary/20" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ongoing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</span>
                        </div>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={velocityData}>
                            <defs>
                                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0059ba" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#0059ba" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0000000a" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    borderRadius: '16px', 
                                    border: 'none', 
                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                    fontSize: '12px',
                                    fontWeight: '900'
                                }} 
                            />
                            <Area 
                                type="monotone" 
                                dataKey="completed" 
                                stroke="#0059ba" 
                                strokeWidth={4}
                                fillOpacity={1} 
                                fill="url(#colorCompleted)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Priority Distribution */}
            <div className="lg:col-span-4 bg-ink-navy p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white">
                <h3 className="text-xl font-black tracking-tight italic mb-8">Priority Mix</h3>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={priorityData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {priorityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ 
                                    borderRadius: '16px', 
                                    border: 'none', 
                                    color: '#000',
                                    fontSize: '10px',
                                    fontWeight: '900'
                                }} 
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {priorityData.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{d.name}</span>
                            <span className="text-[10px] font-black ml-auto">{d.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Team Load */}
            <div className="lg:col-span-12 bg-paper-white p-10 rounded-[3rem] shadow-soft border border-midnight/5">
                <h3 className="text-xl font-black text-midnight tracking-tight italic mb-10">Resource Throughput</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={teamData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#0000000a" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
                            />
                            <Tooltip 
                                cursor={{ fill: '#0059ba05' }}
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar 
                                dataKey="completed" 
                                fill="#0059ba" 
                                radius={[6, 6, 0, 0]} 
                                barSize={40} 
                            />
                            <Bar 
                                dataKey="total" 
                                fill="#0059ba20" 
                                radius={[6, 6, 0, 0]} 
                                barSize={40} 
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
