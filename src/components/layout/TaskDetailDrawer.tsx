import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Tag, User, MessageSquare, Paperclip, Trash2, Send } from 'lucide-react';
import { useTaskStore } from '../../hooks/useTaskStore';
import { formatRelativeTime } from '../../utils/time';

export const TaskDetailDrawer: React.FC = () => {
    const { tasks, users, selectedTaskId, setSelectedTaskId, updateTask, deleteTask } = useTaskStore();
    const task = tasks.find(t => t.id === selectedTaskId);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    if (!selectedTaskId) return null;

    const handleUpdate = (updates: any) => {
        if (task) updateTask(task.id, updates);
    };

    const assignee = users.find(u => u.id === task?.assigneeId);

    return (
        <AnimatePresence>
            {selectedTaskId && task && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedTaskId(null)}
                        className="fixed inset-0 bg-midnight/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-full max-w-2xl bg-paper-white shadow-2xl z-[101] flex flex-col overflow-hidden border-l border-midnight/5"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-midnight/5 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">{task.id}</span>
                                <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-midnight/[0.03] shadow-inner 
                                    ${task.priority === 'critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                        task.priority === 'high' ? 'bg-mustard/10 text-mustard border-mustard/20' :
                                            'bg-slate-50 text-slate-400'}`}>
                                    {task.priority}
                                </div>
                                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-midnight/[0.03] shadow-inner 
                                    ${task.status === 'done' ? 'bg-lime/10 text-lime border-lime/20' :
                                      task.status === 'in-progress' ? 'bg-primary/10 text-primary border-primary/20' :
                                      'bg-slate-50 text-slate-400'}`}>
                                    <Clock className="w-2.5 h-2.5" />
                                    {task.status.replace('-', ' ')}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (confirm('Delete this task?')) {
                                            deleteTask(task.id);
                                            setSelectedTaskId(null);
                                        }
                                    }}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setSelectedTaskId(null)}
                                    className="p-2 text-slate-300 hover:text-midnight hover:bg-canvas-white rounded-xl transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-12 bg-canvas-white/20">
                            {/* Title Section */}
                            <div className="space-y-2">
                                {isEditingTitle ? (
                                    <div className="space-y-4">
                                        <input
                                            autoFocus
                                            className="text-4xl font-black text-midnight tracking-tight italic bg-white w-full border-none focus:ring-0 p-0"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            onBlur={() => {
                                                setIsEditingTitle(false);
                                                handleUpdate({ title });
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    setIsEditingTitle(false);
                                                    handleUpdate({ title });
                                                }
                                            }}
                                        />
                                        <p className="text-[9px] font-black text-primary uppercase tracking-widest italic animate-pulse">Saving changes...</p>
                                    </div>
                                ) : (
                                    <h2 
                                        onClick={() => setIsEditingTitle(true)}
                                        className="text-4xl font-black text-midnight tracking-tight italic cursor-pointer hover:text-primary transition-colors leading-tight"
                                    >
                                        {task.title}
                                    </h2>
                                )}
                            </div>

                            {/* Meta Grid */}
                            <div className="grid grid-cols-2 gap-8 py-8 border-y border-midnight/5">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <User className="w-3 h-3" /> Assignee
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <img src={assignee?.avatar} alt="avatar" className="w-10 h-10 rounded-2xl shadow-xl border border-midnight/5" />
                                        <div>
                                            <p className="text-xs font-black text-midnight italic">{assignee?.name}</p>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{assignee?.title}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Clock className="w-3 h-3" /> Timestamps
                                    </label>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-midnight italic">Created {formatRelativeTime(task.createdAt)}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modified {formatRelativeTime(task.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Tag className="w-3 h-3" /> Description
                                </label>
                                {isEditingDesc ? (
                                    <textarea
                                        autoFocus
                                        className="w-full min-h-[150px] bg-white rounded-2xl border-none focus:ring-0 p-5 text-sm font-medium text-slate-600 leading-relaxed shadow-inner"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        onBlur={() => {
                                            setIsEditingDesc(false);
                                            handleUpdate({ description });
                                        }}
                                    />
                                ) : (
                                    <div 
                                        onClick={() => setIsEditingDesc(true)}
                                        className="text-sm font-medium text-slate-500 leading-relaxed hover:bg-white hover:shadow-soft p-5 rounded-2xl transition-all cursor-pointer"
                                    >
                                        {task.description || 'No description provided.'}
                                    </div>
                                )}
                            </div>

                            {/* Attachments */}
                            {task.attachments && task.attachments.length > 0 && (
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Paperclip className="w-3 h-3" /> Attachments ({task.attachments.length})
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {task.attachments.map((url, i) => (
                                            <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-midnight/5 group shadow-soft">
                                                <img src={url} alt="attachment" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                <div className="absolute inset-0 bg-midnight/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button className="bg-white text-midnight text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-lg shadow-xl">View Large</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Activity/Comments */}
                            <div className="space-y-6 pt-8 border-t border-midnight/5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare className="w-3 h-3" /> Workspace Pulse
                                </label>
                                
                                <div className="space-y-6">
                                    {task.comments.length > 0 ? task.comments.map(c => (
                                        <div key={c.id} className="flex gap-4">
                                            <img src={users.find(u => u.id === c.userId)?.avatar} className="w-8 h-8 rounded-xl ring-2 ring-white" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-black text-midnight italic">{users.find(u => u.id === c.userId)?.name}</span>
                                                    <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{formatRelativeTime(c.createdAt)}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 leading-snug">{c.content}</p>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-8 opacity-40">
                                            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                            <p className="text-[10px] font-black uppercase tracking-widest">No pulses yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Comment Input */}
                        <div className="p-6 bg-white border-t border-midnight/5">
                            <div className="relative group">
                                <input
                                    placeholder="Add to the pulse..."
                                    className="w-full bg-canvas-white border border-midnight/5 rounded-2xl px-6 py-4 pr-16 text-[11px] font-bold text-midnight placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all outline-none"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && comment.trim()) {
                                            const newComment = {
                                                id: Math.random().toString(36).substr(2, 9),
                                                userId: users[0].id,
                                                content: comment,
                                                createdAt: new Date().toISOString()
                                            };
                                            handleUpdate({ comments: [...task.comments, newComment] });
                                            setComment('');
                                        }
                                    }}
                                />
                                <button 
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${comment.trim() ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 text-slate-300'}`}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
