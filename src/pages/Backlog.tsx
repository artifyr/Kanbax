import React from 'react';
import { Filter, MoreVertical, ChevronRight, LayoutGrid, List, Search, Plus, Tag, Trash2 } from 'lucide-react';
import { useTaskStore } from '../hooks/useTaskStore';

export const Backlog: React.FC = () => {
    const { tasks, users, searchQuery, setSearchQuery, setCreateModalOpen, deleteTask } = useTaskStore();
    const [sortBy, setSortBy] = React.useState<'id' | 'title' | 'priority' | 'status'>('id');
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

    const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };

    const filteredTasks = tasks
        .filter(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'priority') {
                comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
            } else {
                comparison = String(a[sortBy]).localeCompare(String(b[sortBy]));
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

    const handleSort = (field: typeof sortBy) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const stats = [
        { label: 'Total Tasks', value: tasks.length },
        { label: 'High Priority', value: tasks.filter(t => t.priority === 'high' || t.priority === 'critical').length },
        { label: 'Estimated Pts', value: tasks.reduce((acc, t) => acc + (t.storyPoints || 0), 0) },
    ];

    return (
        <div className="space-y-10 animate-soft-in">
            {/* Header & Stats */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 mb-1 uppercase tracking-[0.2em]">
                        <span>Planning</span>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                        <span className="text-primary font-bold">Product Backlog</span>
                    </div>
                    <h2 className="text-4xl text-midnight tracking-tight italic">Resource Library</h2>
                </div>

                <div className="flex gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col border-l-2 border-midnight/5 pl-4 first:border-0">
                            <span className="text-2xl font-black text-midnight tabular-nums leading-none tracking-tight">{stat.value}</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-paper-white p-4 rounded-[1.5rem] border border-midnight/5 shadow-soft flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-canvas-white border-none rounded-xl pl-12 pr-4 py-3 text-xs font-bold text-midnight placeholder:text-slate-300 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                            placeholder="Search backlog..."
                            type="text"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-canvas-white rounded-xl border border-midnight/5 text-[10px] font-black uppercase tracking-widest text-midnight hover:bg-white transition-all shadow-sm">
                        <Filter className="w-3.5 h-3.5" /> Filter
                    </button>
                </div>
                <div className="flex items-center gap-2 bg-canvas-white p-1 rounded-xl shadow-inner border border-midnight/5">
                    <button className="p-2.5 bg-white rounded-lg text-primary shadow-sm"><List className="w-4 h-4" /></button>
                    <button className="p-2.5 text-slate-300 hover:text-midnight transition-colors"><LayoutGrid className="w-4 h-4" /></button>
                </div>
            </div>

            {/* Task Table */}
            <div className="bg-paper-white rounded-[2rem] border border-midnight/5 shadow-soft overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-canvas-white/50 border-b border-midnight/5">
                            <th 
                                onClick={() => handleSort('id')}
                                className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-midnight transition-colors"
                            >
                                Task ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th 
                                onClick={() => handleSort('title')}
                                className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-midnight transition-colors"
                            >
                                Work Item {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Assignee</th>
                            <th 
                                onClick={() => handleSort('status')}
                                className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-midnight transition-colors"
                            >
                                Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="px-8 py-6 text-right"><MoreVertical className="w-4 h-4 ml-auto" /></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-midnight/[0.03]">
                        {filteredTasks.length > 0 ? filteredTasks.map((task) => {
                            const assignee = users.find(u => u.id === task.assigneeId);
                            return (
                                <tr key={task.id} className="hover:bg-canvas-white transition-colors group cursor-pointer">
                                    <td className="px-8 py-6">
                                        <span className="text-[10px] font-black tabular-nums text-slate-400 tracking-widest uppercase">{task.id}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-midnight italic tracking-tight group-hover:text-primary transition-colors">{task.title}</span>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                {task.tags.map(tag => (
                                                    <span key={tag} className="text-[8px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
                                                        <Tag className="w-2 h-2" /> {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <img className="w-8 h-8 rounded-lg object-cover" src={assignee?.avatar || 'https://i.pravatar.cc/100?u=un'} alt="avatar" />
                                            <span className="text-[10px] font-black text-midnight/60">{assignee?.name || 'Unassigned'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${task.status === 'done' ? 'bg-lime' :
                                                    task.status === 'in-progress' ? 'bg-primary' : 'bg-slate-300'
                                                }`} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-midnight/40">{task.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (confirm('Delete this task?')) deleteTask(task.id);
                                                }}
                                                className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2.5 text-slate-300 hover:text-midnight hover:bg-white rounded-xl transition-all shadow-sm">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center">
                                    <p className="text-slate-400 font-bold italic">No items found matching your search.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination/Footer */}
                <div className="px-8 py-6 bg-canvas-white/30 border-t border-midnight/5 flex items-center justify-between">
                    <button
                        onClick={() => setCreateModalOpen(true)}
                        className="px-10 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl active:scale-95 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Create Item
                    </button>
                </div>
            </div>
        </div>
    );
};
