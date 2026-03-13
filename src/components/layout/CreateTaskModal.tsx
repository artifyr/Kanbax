import React, { useState, useEffect } from 'react';
import { X, Upload, ChevronDown, Type, AlignLeft, Users, Flag, Tag, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../../hooks/useTaskStore';
import type { Priority } from '../../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateTaskModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const { addTask, users, currentUser } = useTaskStore();

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');
    const [assigneeId, setAssigneeId] = useState<string>('');
    const [tags, setTags] = useState<string[]>(['Design']);

    // UI State for custom dropdowns
    const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Reset form when opened
            setTitle('');
            setDescription('');
            setPriority('medium');
            setAssigneeId(users[0]?.id || '');
            setTags(['Design']);
        }
    }, [isOpen, users]);

    const handleCreate = () => {
        if (!title.trim()) return;

        addTask({
            title,
            description,
            priority,
            assigneeId: assigneeId || undefined,
            reporterId: currentUser?.id || 'system',
            status: 'todo',
            tags,
            storyPoints: 5, // Default for now
        });

        onClose();
    };

    const priorities: Priority[] = ['low', 'medium', 'high', 'critical'];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-midnight/40 backdrop-blur-md z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-paper-white rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden border border-white/20"
                    >
                        <div className="px-10 py-8 border-b border-midnight/[0.03] flex items-center justify-between bg-canvas-white/30">
                            <div>
                                <h2 className="text-3xl font-black text-midnight tracking-tight italic">Create Task</h2>
                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mt-1">Add a new item to your active workspace</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-white text-slate-300 hover:text-midnight transition-colors border border-transparent hover:border-midnight/5 shadow-sm active:scale-90"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-10 max-h-[65vh] overflow-y-auto no-scrollbar space-y-10">
                            {/* Title */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <Type className="w-3 h-3" /> Task Title
                                </label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-foggy-blue/40 border-none rounded-2xl px-6 py-5 text-xl font-bold text-midnight focus:bg-white focus:ring-8 focus:ring-primary/5 transition-all outline-none border-2 border-transparent focus:border-primary/20 shadow-sm"
                                    placeholder="e.g. Design System Phase 2"
                                    type="text"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                {/* Assignee */}
                                <div className="space-y-4 relative">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        <Users className="w-3 h-3" /> Assignee
                                    </label>
                                    <div
                                        onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                                        className="flex items-center gap-3 bg-paper-white p-4 rounded-2xl border border-midnight/[0.03] hover:bg-canvas-white cursor-pointer transition-colors shadow-sm group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 overflow-hidden ring-4 ring-primary/5">
                                            <img src={users.find(u => u.id === assigneeId)?.avatar || 'https://i.pravatar.cc/100?u=un'} alt="avatar" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-black text-midnight italic">{users.find(u => u.id === assigneeId)?.name || 'Unassigned'}</p>
                                            <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">{users.find(u => u.id === assigneeId)?.title || 'Team Member'}</p>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-slate-300 group-hover:text-primary transition-all ${showAssigneeDropdown ? 'rotate-180' : ''}`} />
                                    </div>

                                    <AnimatePresence>
                                        {showAssigneeDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full mt-2 left-0 w-full bg-white rounded-2xl shadow-2xl border border-midnight/5 z-[80] overflow-hidden"
                                            >
                                                {users.map(user => (
                                                    <div
                                                        key={user.id}
                                                        onClick={() => {
                                                            setAssigneeId(user.id);
                                                            setShowAssigneeDropdown(false);
                                                        }}
                                                        className="flex items-center gap-3 p-4 hover:bg-canvas-white transition-colors cursor-pointer border-b border-midnight/[0.02] last:border-0"
                                                    >
                                                        <img src={user.avatar} className="w-8 h-8 rounded-lg" alt={user.name} />
                                                        <span className="text-xs font-bold text-midnight">{user.name}</span>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Priority */}
                                <div className="space-y-4 relative">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        <Flag className="w-3 h-3" /> Priority Level
                                    </label>
                                    <div
                                        onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                                        className="flex items-center gap-4 bg-paper-white p-4 rounded-2xl border border-midnight/[0.03] hover:bg-canvas-white cursor-pointer transition-colors shadow-sm group"
                                    >
                                        <div className={`w-3 h-3 rounded-full shadow-lg ${priority === 'critical' ? 'bg-red-500 shadow-red-500/20' :
                                            priority === 'high' ? 'bg-orange-500 shadow-orange-500/20' :
                                                priority === 'medium' ? 'bg-mustard shadow-mustard/20' : 'bg-lime shadow-lime/20'
                                            }`} />
                                        <span className="flex-1 text-xs font-black text-midnight italic uppercase tracking-tighter">{priority} Priority</span>
                                        <ChevronDown className={`w-4 h-4 text-slate-300 group-hover:text-primary transition-all ${showPriorityDropdown ? 'rotate-180' : ''}`} />
                                    </div>

                                    <AnimatePresence>
                                        {showPriorityDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full mt-2 left-0 w-full bg-white rounded-2xl shadow-2xl border border-midnight/5 z-[80] overflow-hidden"
                                            >
                                                {priorities.map(p => (
                                                    <div
                                                        key={p}
                                                        onClick={() => {
                                                            setPriority(p);
                                                            setShowPriorityDropdown(false);
                                                        }}
                                                        className="flex items-center gap-3 p-4 hover:bg-canvas-white transition-colors cursor-pointer border-b border-midnight/[0.02] last:border-0"
                                                    >
                                                        <div className={`w-2 h-2 rounded-full ${p === 'critical' ? 'bg-red-500' :
                                                            p === 'high' ? 'bg-orange-500' :
                                                                p === 'medium' ? 'bg-mustard' : 'bg-lime'
                                                            }`} />
                                                        <span className="text-xs font-bold text-midnight uppercase tracking-widest">{p}</span>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <Tag className="w-3 h-3" /> Task Labels
                                </label>
                                <div className="flex items-center gap-2 flex-wrap min-h-[56px] p-2 bg-foggy-blue/20 rounded-2xl border border-dashed border-midnight/10">
                                    {tags.map(tag => (
                                        <span key={tag} className="bg-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2 border border-primary/10 shadow-sm">
                                            {tag} <X onClick={() => setTags(tags.filter(t => t !== tag))} className="w-2.5 h-2.5 cursor-pointer hover:text-red-500" />
                                        </span>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newTag = prompt('New Tag?');
                                            if (newTag) setTags([...tags, newTag]);
                                        }}
                                        className="w-10 h-10 rounded-xl bg-white border border-midnight/5 flex items-center justify-center text-slate-300 hover:text-primary transition-all shadow-sm active:scale-90"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <AlignLeft className="w-3 h-3" /> Requirements & Description
                                </label>
                                <div className="bg-foggy-blue/40 rounded-3xl overflow-hidden border border-midnight/[0.03] transition-all focus-within:bg-white focus-within:ring-8 focus-within:ring-primary/5 group focus-within:border-primary/20">
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full bg-transparent border-none focus:ring-0 p-6 text-sm font-bold text-midnight placeholder:text-slate-300 resize-none min-h-[140px] italic"
                                        placeholder="Enter detailed documentation for this task..."
                                    />
                                </div>
                            </div>

                            {/* Attachments Placeholder */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                    <Upload className="w-3 h-3" /> Attachments
                                </label>
                                <div className="w-full py-10 flex flex-col items-center justify-center border-2 border-dashed border-midnight/10 rounded-[2rem] bg-canvas-white/50 hover:bg-white hover:border-primary/30 transition-all duration-300 shadow-inner group-hover:shadow-2xl">
                                    <Upload className="w-6 h-6 text-slate-300 mb-2" />
                                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Maximum file size: 24MB</p>
                                </div>
                            </div>
                        </div>

                        <div className="px-10 py-8 bg-canvas-white/50 border-t border-midnight/[0.03] flex items-center justify-end gap-6">
                            <button
                                onClick={onClose}
                                className="px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-midnight transition-colors active:scale-95"
                            >
                                Discard Draft
                            </button>
                            <button
                                onClick={handleCreate}
                                disabled={!title.trim()}
                                className={`bg-primary text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:-translate-y-1 hover:brightness-110 transition-all active:scale-95 ${!title.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Create Task
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
