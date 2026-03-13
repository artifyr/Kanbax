import React, { useState } from 'react';
import { 
    ChevronLeft, 
    ChevronRight, 
    Calendar as CalendarIcon, 
    Info, 
    ArrowRight, 
    Plus, 
    Activity
} from 'lucide-react';
import { 
    format, 
    addMonths, 
    subMonths, 
    startOfMonth, 
    endOfMonth, 
    startOfWeek, 
    endOfWeek, 
    isSameMonth, 
    isSameDay, 
    addDays, 
    eachDayOfInterval,
    parseISO,
    isToday,
    addWeeks,
    subWeeks
} from 'date-fns';
import { useTaskStore } from '../hooks/useTaskStore';

type ViewMode = 'month' | 'week' | 'day';

export const Calendar: React.FC = () => {
    const { tasks, users, setSelectedTaskId, setCreateModalOpen, setInitialDueDate } = useTaskStore();
    const [viewDate, setViewDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<ViewMode>('month');

    const handleNext = () => {
        if (viewMode === 'month') setViewDate(addMonths(viewDate, 1));
        else if (viewMode === 'week') setViewDate(addWeeks(viewDate, 1));
        else setViewDate(addDays(viewDate, 1));
    };

    const handlePrev = () => {
        if (viewMode === 'month') setViewDate(subMonths(viewDate, 1));
        else if (viewMode === 'week') setViewDate(subWeeks(viewDate, 1));
        else setViewDate(addDays(viewDate, -1));
    };

    const getCalendarDays = () => {
        if (viewMode === 'month') {
            const monthStart = startOfMonth(viewDate);
            const monthEnd = endOfMonth(monthStart);
            return eachDayOfInterval({
                start: startOfWeek(monthStart, { weekStartsOn: 1 }),
                end: endOfWeek(monthEnd, { weekStartsOn: 1 }),
            });
        } else if (viewMode === 'week') {
            const weekStart = startOfWeek(viewDate, { weekStartsOn: 1 });
            return eachDayOfInterval({
                start: weekStart,
                end: addDays(weekStart, 6),
            });
        } else {
            return [viewDate];
        }
    };

    const calendarDays = getCalendarDays();

    const getTasksForDay = (day: Date) => {
        return tasks.filter(task => {
            if (!task.dueDate) return false;
            try {
                return isSameDay(parseISO(task.dueDate), day);
            } catch (e) {
                return false;
            }
        });
    };

    const handleAddTask = (day: Date) => {
        setInitialDueDate(format(day, 'yyyy-MM-dd'));
        setCreateModalOpen(true);
    };

    return (
        <div className="space-y-8 animate-soft-in">
            {/* Calendar Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 mb-1 uppercase tracking-[0.2em]">
                        <span>Workspace</span>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                        <span className="text-primary font-bold">Project Scheduler</span>
                    </div>
                    <h2 className="text-4xl text-midnight tracking-tight italic">
                        {viewMode === 'day' ? format(viewDate, 'MMMM d, yyyy') : format(viewDate, 'MMMM yyyy')}
                    </h2>
                    <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.2em]">
                        {viewMode === 'day' 
                            ? `${getTasksForDay(viewDate).length} tasks scheduled today`
                            : `${tasks.filter(t => t.dueDate && isSameMonth(parseISO(t.dueDate), viewDate)).length} tasks scheduled this month`
                        }
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-paper-white p-1 rounded-xl flex gap-1 border border-midnight/[0.03] shadow-sm">
                        {(['month', 'week', 'day'] as ViewMode[]).map(mode => (
                            <button 
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${viewMode === mode ? 'bg-canvas-white text-primary shadow-inner' : 'text-slate-400 hover:text-midnight'}`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handlePrev}
                            className="p-2.5 bg-paper-white hover:bg-canvas-white rounded-xl text-slate-400 hover:text-midnight transition-colors border border-midnight/[0.03] shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setViewDate(new Date())}
                            className="px-6 py-2.5 bg-paper-white hover:bg-canvas-white rounded-xl text-[11px] font-black uppercase tracking-widest text-midnight border border-midnight/[0.03] shadow-sm active:scale-95 transition-all text-center"
                        >
                            Today
                        </button>
                        <button 
                            onClick={handleNext}
                            className="p-2.5 bg-paper-white hover:bg-canvas-white rounded-xl text-slate-400 hover:text-midnight transition-colors border border-midnight/[0.03] shadow-sm"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-paper-white rounded-[2.5rem] overflow-hidden shadow-soft border border-midnight/5">
                <div className={`grid ${viewMode === 'day' ? 'grid-cols-1' : 'grid-cols-7'} border-b border-midnight/[0.03] bg-canvas-white/30 backdrop-blur-sm`}>
                    {viewMode === 'day' ? (
                        <div className="py-4 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400/80">{format(viewDate, 'EEEE')}</div>
                    ) : (
                        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400/80">{day}</div>
                        ))
                    )}
                </div>

                <div className={`grid ${viewMode === 'day' ? 'grid-cols-1' : 'grid-cols-7'} auto-rows-[minmax(140px,auto)] gap-[1px] bg-midnight/[0.03]`}>
                    {calendarDays.map((day, i) => {
                        const dayTasks = getTasksForDay(day);
                        const isCurrentM = viewMode === 'month' ? isSameMonth(day, viewDate) : true;
                        const isTdy = isToday(day);

                        return (
                            <div key={i} className={`p-4 transition-colors relative group 
                                ${isCurrentM ? 'bg-paper-white hover:bg-canvas-white' : 'bg-canvas-white/40 opacity-40'} 
                                ${isTdy ? 'ring-2 ring-primary ring-inset z-10' : ''}`}>
                                
                                <span className={`text-xs font-black tracking-tight ${isTdy ? 'text-primary' : 'text-midnight/60'}`}>
                                    {viewMode === 'day' ? format(day, 'MMMM d') : format(day, 'd')}
                                </span>

                                <div className="mt-4 space-y-2">
                                    {dayTasks.map(task => (
                                        <button
                                            key={task.id}
                                            onClick={() => setSelectedTaskId(task.id)}
                                            className={`w-full text-left px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter truncate border-l-4 transition-all hover:scale-[1.03] active:scale-95 shadow-sm
                                                ${task.priority === 'critical' ? 'bg-red-500/10 border-red-500 text-red-500' :
                                                  task.priority === 'high' ? 'bg-orange-500/10 border-orange-500 text-orange-500' :
                                                  task.priority === 'medium' ? 'bg-mustard/10 border-mustard text-mustard' :
                                                  'bg-lime/10 border-lime text-lime'
                                                }`}
                                        >
                                            {task.title}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => handleAddTask(day)}
                                    className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white rounded-lg shadow-sm border border-midnight/5 active:scale-90"
                                >
                                    <Plus className="w-3.5 h-3.5 text-slate-400 hover:text-primary" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Info Bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-ink-navy p-8 rounded-[2rem] shadow-2xl border border-white/5 flex flex-col justify-between group hover:border-primary/20 transition-all text-white">
                    <div>
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 ring-8 ring-primary/5">
                            <CalendarIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-white tracking-tight italic">Upcoming Priority</h3>
                        {tasks.filter(t => t.priority === 'critical' && t.status !== 'done').length > 0 ? (
                            <p className="text-xs font-bold text-slate-400 mt-3 leading-relaxed">
                                Next critical task: <span className="text-primary font-black uppercase tracking-widest">
                                    {tasks.find(t => t.priority === 'critical' && t.status !== 'done')?.title}
                                </span>.
                            </p>
                        ) : (
                            <p className="text-xs font-bold text-slate-400 mt-3 leading-relaxed">No upcoming critical tasks. Workspace is clear.</p>
                        )}
                    </div>
                    <button className="mt-8 text-[11px] font-black text-primary flex items-center gap-2 uppercase tracking-widest hover:gap-4 transition-all">
                        View Details <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="bg-ink-navy p-8 rounded-[2rem] shadow-2xl border border-white/5 flex flex-col justify-between hover:border-mustard/20 transition-all text-white">
                    <div>
                        <div className="w-12 h-12 bg-mustard/10 text-mustard rounded-2xl flex items-center justify-center mb-6 ring-8 ring-mustard/5">
                            <Info className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-white tracking-tight italic">Resource Insights</h3>
                        <p className="text-xs font-bold text-slate-400 mt-3 leading-relaxed">
                            Team is currently at <span className="text-mustard font-black uppercase tracking-widest">optimum capacity</span>. No overlapping conflicts detected in current sprint.
                        </p>
                    </div>
                    <div className="flex -space-x-3 mt-8">
                        {users.slice(0, 4).map(u => (
                            <img key={u.id} className="w-9 h-9 rounded-full border-4 border-paper-white shadow-sm ring-1 ring-midnight/5" src={u.avatar} alt="avatar" />
                        ))}
                        {users.length > 4 && (
                            <div className="w-9 h-9 rounded-full bg-canvas-white border-4 border-paper-white flex items-center justify-center text-[10px] font-black text-slate-400">+{users.length - 4}</div>
                        )}
                    </div>
                </div>

                <div className="bg-ink-navy p-8 rounded-[2rem] shadow-2xl border border-white/5 flex flex-col justify-between group hover:border-primary/20 transition-all text-white">
                    <div>
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 ring-8 ring-primary/5">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-white tracking-tight italic">Sprint 42 Health</h3>
                        <div className="mt-10 flex items-end gap-3 text-white">
                            <span className="text-5xl font-black tracking-tighter italic tabular-nums">
                                {Math.round((tasks.filter(t => t.status === 'done').length / (tasks.length || 1)) * 100)}%
                            </span>
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2 leading-none">Completion Target</span>
                        </div>
                        <div className="mt-6 w-full bg-midnight/[0.03] h-2.5 rounded-full overflow-hidden p-0.5">
                            <div 
                                className="bg-primary h-full rounded-full shadow-[0_0_15px_rgba(0,89,186,0.1)] transition-all duration-1000" 
                                style={{ width: `${(tasks.filter(t => t.status === 'done').length / (tasks.length || 1)) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex items-center gap-2">
                         <div className="w-2 h-2 bg-lime rounded-full animate-pulse" />
                         <span className="text-[10px] font-black text-lime uppercase tracking-widest">On Track</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
