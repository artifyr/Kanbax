import React from 'react';
import { NavLink } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const NAV_LINKS = [
    { label: "Dashboard", href: "/", icon: "dashboard" },
    { label: "Backlog", href: "/backlog", icon: "folder" },
    { label: "Active Sprints", href: "/active-sprints", icon: "rocket_launch" },
    { label: "Calendar", href: "/calendar", icon: "calendar_today" },
    { label: "Team", href: "/team", icon: "group" },
    { label: "Reports", href: "/reports", icon: "analytics" },
    { label: "Settings", href: "/profile", icon: "settings" },
];

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-paper-white flex flex-col h-full shrink-0 border-r border-midnight/5 shadow-2xl relative z-50 transition-all duration-300">
            <div className="p-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-electric flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 transition-transform">
                    <Rocket className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="font-display font-black text-midnight text-xl tracking-tighter leading-none">Sprinto</h1>
                    <span className="text-[9px] font-extrabold text-midnight/30 uppercase tracking-[0.2em] mt-1 block">Enterprise</span>
                </div>
            </div>

            <nav className="flex-1 px-4 mt-4 space-y-2">
                {NAV_LINKS.map((link) => (
                    <NavLink
                        key={link.href}
                        to={link.href}
                        className={({ isActive }) => `
              flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group
              ${isActive
                                ? 'bg-primary text-white shadow-xl shadow-primary/20 translate-x-2'
                                : 'text-midnight/40 hover:text-midnight hover:bg-midnight/[0.03]'}
            `}
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>{link.icon}</span>
                                <span className="text-[11px] font-black uppercase tracking-widest leading-none">{link.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 mt-auto">
                <div className="bg-midnight/[0.03] rounded-3xl p-6 border border-midnight/[0.05] relative overflow-hidden group hover:border-primary/30 transition-all">
                    <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                    <p className="text-[9px] font-black text-midnight/30 uppercase tracking-widest mb-4">Workspace Health</p>
                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="4" />
                                <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" className="text-primary" strokeWidth="4" strokeDasharray="138" strokeDashoffset="30" strokeLinecap="round" />
                            </svg>
                            <span className="absolute text-[10px] font-black text-midnight">82%</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-midnight tracking-tight">Prime Status</p>
                            <p className="text-[8px] font-extrabold text-lime uppercase tracking-widest mt-0.5">Optimal</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
