import React from 'react';
import { Calendar, ChevronRight, MoreHorizontal, Clock, Tag, Trash2 } from 'lucide-react';
import { useTaskStore } from '../hooks/useTaskStore';
import type { TaskStatus } from '../types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

const COLUMNS: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'todo', label: 'Todo', color: 'bg-slate-300' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-primary' },
    { id: 'review', label: 'In Review', color: 'bg-mustard' },
    { id: 'done', label: 'Done', color: 'bg-lime' },
];

export const ActiveSprints: React.FC = () => {
    const { tasks, users, moveTask, searchQuery, deleteTask } = useTaskStore();

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        moveTask(draggableId, destination.droppableId as TaskStatus);
    };

    return (
        <div className="space-y-12 animate-soft-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 mb-1 uppercase tracking-[0.2em]">
                        <span>Execution</span>
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                        <span className="text-primary font-bold">Active Sprint</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-4xl text-midnight tracking-tight italic">Sprint 42</h2>
                        <div className="px-5 py-1.5 rounded-full bg-lime/10 text-lime text-[9px] font-black uppercase tracking-widest border border-lime/20 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-lime rounded-full animate-pulse" /> Active
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1 leading-none">Estimate Release</span>
                        <div className="flex items-center gap-2 text-midnight font-black text-sm">
                            <Calendar className="w-3.5 h-3.5 text-primary" /> Sep 14, 2024
                        </div>
                    </div>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {COLUMNS.map((column) => (
                        <div key={column.id} className="flex flex-col h-full min-h-[500px]">
                            <div className="flex items-center justify-between mb-8 px-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3.5 h-3.5 rounded-lg ${column.color} shadow-lg shadow-midnight/5 ring-4 ring-paper-white transition-all`} />
                                    <h3 className="text-xs font-black text-midnight uppercase tracking-[0.2em]">{column.label}</h3>
                                    <span className="text-[10px] font-black tabular-nums bg-paper-white border border-midnight/[0.03] px-2.5 py-0.5 rounded-lg text-slate-400 shadow-sm">
                                        {filteredTasks.filter(t => t.status === column.id).length}
                                    </span>
                                </div>
                                <button className="text-slate-300 hover:text-midnight transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                            </div>

                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`flex-1 space-y-6 rounded-[2.5rem] p-2 transition-all duration-300 ${snapshot.isDraggingOver ? 'bg-primary/5 ring-2 ring-primary/10' : ''}`}
                                    >
                                        {filteredTasks
                                            .filter((task) => task.status === column.id)
                                            .map((task, index) => {
                                                const assignee = users.find(u => u.id === task.assigneeId);
                                                return (
                                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`bg-paper-white p-7 rounded-[2rem] shadow-soft border border-midnight/5 group hover:border-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden active:scale-95 active:rotate-2 ${snapshot.isDragging ? 'rotate-3 scale-105 shadow-2xl z-50 ring-2 ring-primary/20' : ''}`}
                                                            >
                                                                <div className="flex justify-between items-start mb-5">
                                                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest tabular-nums">{task.id}</span>
                                                                    <div className="flex gap-1">
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                if (confirm('Delete this task?')) deleteTask(task.id);
                                                                            }}
                                                                            className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                                                                        >
                                                                            <Trash2 className="w-3.5 h-3.5" />
                                                                        </button>
                                                                        <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-midnight/[0.03] shadow-inner 
                                                                            ${task.priority === 'critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                                                task.priority === 'high' ? 'bg-mustard/10 text-mustard border-mustard/20' :
                                                                                    'bg-slate-50 text-slate-400'}`}>
                                                                            {task.priority}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <h4 className="text-sm font-black text-midnight tracking-tight italic group-hover:text-primary transition-colors mb-4 pr-4 leading-snug">
                                                                    {task.title}
                                                                </h4>

                                                                <div className="flex flex-wrap gap-2 mb-6">
                                                                    {task.tags.map(tag => (
                                                                        <span key={tag} className="text-[8px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5 px-2.5 py-1 bg-canvas-white rounded-lg border border-midnight/[0.03]">
                                                                            <Tag className="w-2.5 h-2.5" /> {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>

                                                                <div className="flex items-center justify-between pt-5 border-t border-midnight/5">
                                                                    <div className="flex items-center gap-2 group/user cursor-pointer">
                                                                        <img className="w-8 h-8 rounded-xl object-cover ring-4 ring-paper-white shadow-xl group-hover/user:scale-110 transition-transform" src={assignee?.avatar} alt="assignee" />
                                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-0 group-hover/user:opacity-100 transition-opacity">
                                                                            {assignee?.name.split(' ')[0]}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5 text-slate-300">
                                                                        <Clock className="w-3 h-3" />
                                                                        <span className="text-[9px] font-black tabular-nums tracking-widest">3D</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};
