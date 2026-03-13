import React, { useState } from 'react';
import { Camera, ChevronRight, Shield, Bell, LayoutPanelLeft, User, Moon, Sun } from 'lucide-react';
import { useTaskStore } from '../hooks/useTaskStore';

export const Profile: React.FC = () => {
    const { currentUser, updateCurrentUser, theme, setTheme } = useTaskStore();
    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [role, setRole] = useState(currentUser?.title || '');
    const [company, setCompany] = useState('Sprinto Solutions'); // Mock company

    const handleSave = () => {
        updateCurrentUser({
            name,
            email,
            title: role,
        });
        alert('Profile updated successfully!');
    };

    return (
        <div className="space-y-12 animate-soft-in">
            <div>
                <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 mb-1 uppercase tracking-[0.2em]">
                    <span>Workspace</span>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                    <span className="text-primary font-bold">User Profile</span>
                </div>
                <h2 className="text-4xl text-midnight tracking-tight italic">Profile Settings</h2>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Left Nav */}
                <aside className="col-span-12 lg:col-span-3 space-y-4">
                    <button className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] bg-paper-white text-primary border border-primary/20 shadow-soft font-extrabold text-[11px] uppercase tracking-widest transition-all">
                        <User className="w-4 h-4" /> Account
                    </button>
                    {[
                        { icon: Bell, label: "Notifications" },
                        { icon: Shield, label: "Security" },
                        { icon: LayoutPanelLeft, label: "Theme" }
                    ].map((item, i) => (
                        <button key={i} className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] bg-paper-white/50 text-slate-400 border border-midnight/[0.03] hover:bg-paper-white hover:text-midnight transition-all font-extrabold text-[11px] uppercase tracking-widest active:scale-95 group">
                            <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" /> {item.label}
                        </button>
                    ))}
                </aside>

                {/* Main Content */}
                <div className="col-span-12 lg:col-span-9 bg-paper-white rounded-[3rem] p-12 shadow-soft border border-midnight/5 transition-all">
                    <div className="flex items-center gap-10 mb-14">
                        <div className="relative group cursor-pointer">
                            <div className="w-36 h-36 rounded-full border-[6px] border-canvas-white shadow-2xl overflow-hidden ring-1 ring-midnight/5 transition-transform duration-500 group-hover:scale-105">
                                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={currentUser?.avatar} alt="Profile" />
                            </div>
                            <div className="absolute bottom-1 right-1 w-11 h-11 rounded-full bg-primary text-white border-4 border-paper-white shadow-lg flex items-center justify-center group-hover:scale-125 transition-all active:scale-90">
                                <Camera className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-4xl font-black text-midnight tracking-tighter italic">{currentUser?.name}</h3>
                            <p className="text-[12px] font-extrabold text-slate-400 uppercase tracking-[0.25em] opacity-80">{currentUser?.title} • {currentUser?.role}</p>
                            <div className="flex gap-4 mt-6">
                                <button className="px-6 py-2.5 rounded-xl bg-primary/5 text-primary text-[10px] font-extrabold uppercase tracking-widest border border-primary/10 hover:bg-primary hover:text-white transition-all shadow-sm">Upload New</button>
                                <button className="px-6 py-2.5 rounded-xl bg-slate-50 text-slate-400 text-[10px] font-extrabold uppercase tracking-widest border border-midnight/[0.03] hover:text-red-500 hover:bg-red-50 transition-all active:scale-95">Remove</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-1 opacity-70">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-foggy-blue/40 border-none rounded-2xl px-6 py-4.5 text-sm font-extrabold text-midnight focus:bg-white focus:ring-8 focus:ring-primary/5 transition-all outline-none border-2 border-transparent focus:border-primary/20 shadow-sm"
                            />
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-1 opacity-70">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-foggy-blue/40 border-none rounded-2xl px-6 py-4.5 text-sm font-extrabold text-midnight focus:bg-white focus:ring-8 focus:ring-primary/5 transition-all outline-none border-2 border-transparent focus:border-primary/20 shadow-sm"
                            />
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-1 opacity-70">Work Role</label>
                            <input
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-foggy-blue/40 border-none rounded-2xl px-6 py-4.5 text-sm font-extrabold text-midnight focus:bg-white focus:ring-8 focus:ring-primary/5 transition-all outline-none border-2 border-transparent focus:border-primary/20 shadow-sm"
                            />
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] ml-1 opacity-70">Company</label>
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full bg-foggy-blue/40 border-none rounded-2xl px-6 py-4.5 text-sm font-extrabold text-midnight focus:bg-white focus:ring-8 focus:ring-primary/5 transition-all outline-none border-2 border-transparent focus:border-primary/20 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-14 pt-10 border-t border-midnight/[0.03]">
                        <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.3em] mb-8 opacity-60">Visual Theme</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <button
                                onClick={() => setTheme('light')}
                                className={`p-5 rounded-3xl transition-all hover:scale-[1.02] flex flex-col items-center gap-4 ${theme === 'light' ? 'bg-paper-white border-[3px] border-primary/40 ring-8 ring-primary/5' : 'bg-paper-white/30 border border-midnight/[0.05]'}`}
                            >
                                <div className="w-full aspect-video bg-canvas-white rounded-2xl border border-midnight/5 shadow-inner flex items-center justify-center">
                                    <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-primary' : 'text-slate-300'}`} />
                                </div>
                                <span className={`text-[11px] font-black uppercase tracking-[0.15em] ${theme === 'light' ? 'text-primary' : 'text-slate-400'}`}>Light Canvas</span>
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`p-5 rounded-3xl transition-all hover:scale-[1.02] flex flex-col items-center gap-4 ${theme === 'dark' ? 'bg-paper-white border-[3px] border-primary/40 ring-8 ring-primary/5' : 'bg-paper-white/30 border border-midnight/[0.05]'}`}
                            >
                                <div className="w-full aspect-video bg-midnight/90 rounded-2xl border border-midnight/10 shadow-xl flex items-center justify-center">
                                    <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-primary' : 'text-slate-300'}`} />
                                </div>
                                <span className={`text-[11px] font-black uppercase tracking-[0.15em] ${theme === 'dark' ? 'text-primary' : 'text-slate-400'}`}>Dark Ink</span>
                            </button>
                            <div className="p-5 rounded-3xl bg-canvas-white/20 border-2 border-dashed border-midnight/5 flex flex-col items-center justify-center gap-4 opacity-40 grayscale cursor-not-allowed">
                                <div className="w-full h-24 rounded-2xl border border-midnight/5 pointer-events-none" />
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-300">Premium Themes</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-14 flex justify-end">
                        <button
                            onClick={handleSave}
                            className="px-12 py-5 bg-gradient-to-r from-primary to-electric text-white text-[12px] font-black uppercase tracking-[0.25em] rounded-2xl shadow-2xl shadow-primary/30 hover:-translate-y-1 hover:brightness-110 active:scale-95 transition-all"
                        >
                            Save All Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
