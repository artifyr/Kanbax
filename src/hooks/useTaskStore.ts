import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, Sprint, ActivityLog, User, TaskStatus } from '../types';

interface TaskState {
    tasks: Task[];
    sprints: Sprint[];
    activities: ActivityLog[];
    currentUser: User | null;
    users: User[];
    searchQuery: string;
    isCreateModalOpen: boolean;
    theme: 'light' | 'dark';
    unreadNotifications: number;

    // Actions
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'attachments'>) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    moveTask: (taskId: string, status: TaskStatus) => void;
    setSearchQuery: (query: string) => void;
    setCreateModalOpen: (open: boolean) => void;
    updateCurrentUser: (updates: Partial<User>) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    clearUnread: () => void;

    addActivity: (activity: Omit<ActivityLog, 'id' | 'time'>) => void;

    setCurrentUser: (user: User) => void;
}

// Initial Mock Data
const INITIAL_USERS: User[] = [
    {
        id: 'u1',
        name: 'Sarah Chen',
        email: 'sarah@sprinto.io',
        avatar: 'https://i.pravatar.cc/100?u=sarah',
        role: 'owner',
        title: 'Lead Designer'
    },
    {
        id: 'u2',
        name: 'Mike Ross',
        email: 'mike@sprinto.io',
        avatar: 'https://i.pravatar.cc/100?u=mike',
        role: 'admin',
        title: 'Senior Developer'
    }
];

const INITIAL_TASKS: Task[] = [
    {
        id: 'T-101',
        title: 'Update API Documentation',
        description: 'Endpoints for version 2.0 need full documentation polish.',
        status: 'todo',
        priority: 'medium',
        assigneeId: 'u2',
        reporterId: 'u1',
        tags: ['Documentation', 'API'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: [],
        attachments: []
    },
    {
        id: 'T-102',
        title: 'Refactor UI Components',
        description: 'Migrate old button styles to the new design system.',
        status: 'in-progress',
        priority: 'high',
        assigneeId: 'u1',
        reporterId: 'u2',
        tags: ['Design', 'Refactor'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: [],
        attachments: []
    },
    {
        id: 'T-103',
        title: 'Fix Auth Middleware',
        description: 'JWT validation failing on specific edge cases.',
        status: 'done',
        priority: 'critical',
        assigneeId: 'u2',
        reporterId: 'u1',
        tags: ['Backend', 'Security'],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        comments: [],
        attachments: []
    },
    {
        id: 'T-104',
        title: 'Implement Search Optimization',
        description: 'Index database fields for faster queries.',
        status: 'todo',
        priority: 'low',
        assigneeId: 'u2',
        reporterId: 'u2',
        tags: ['Backend', 'Perf'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: [],
        attachments: []
    },
    {
        id: 'T-105',
        title: 'Landing Page Revamp',
        description: 'New marketing copy and hero section.',
        status: 'done',
        priority: 'medium',
        assigneeId: 'u1',
        reporterId: 'u1',
        tags: ['Marketing', 'Frontend'],
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        comments: [],
        attachments: []
    }
];

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: INITIAL_TASKS,
            sprints: [
                {
                    id: 's1',
                    name: 'Sprint 42',
                    goal: 'Infrastructure Polish & API v2',
                    startDate: '2024-09-01',
                    endDate: '2024-09-14',
                    status: 'active',
                    taskIds: ['T-101', 'T-102']
                }
            ],
            activities: [
                {
                    id: 'a1',
                    userId: 'u1',
                    action: 'completed',
                    target: 'UI Polish',
                    time: new Date(Date.now() - 1000 * 60 * 24).toISOString(),
                    type: 'success'
                },
                {
                    id: 'a2',
                    userId: 'u2',
                    action: 'shared',
                    target: 'Design Guidelines',
                    time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                    type: 'info'
                }
            ],
            currentUser: INITIAL_USERS[0],
            users: INITIAL_USERS,
            searchQuery: '',
            isCreateModalOpen: false,
            theme: 'light',
            unreadNotifications: 2,

            addTask: (taskData) => set((state) => {
                const newTask: Task = {
                    ...taskData,
                    id: `T-${Math.floor(Math.random() * 1000)}`,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    comments: [],
                    attachments: []
                };

                const newActivity: ActivityLog = {
                    id: Math.random().toString(36).substr(2, 9),
                    userId: state.currentUser?.id || 'system',
                    action: 'created task',
                    target: newTask.title,
                    time: new Date().toISOString(),
                    type: 'info'
                };

                return {
                    tasks: [newTask, ...state.tasks],
                    activities: [newActivity, ...state.activities],
                    unreadNotifications: state.unreadNotifications + 1
                };
            }),

            updateTask: (id, updates) => set((state) => {
                const task = state.tasks.find(t => t.id === id);
                if (!task) return state;

                const newActivity: ActivityLog = {
                    id: Math.random().toString(36).substr(2, 9),
                    userId: state.currentUser?.id || 'system',
                    action: 'updated task',
                    target: task.title,
                    time: new Date().toISOString(),
                    type: 'info'
                };

                return {
                    tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t),
                    activities: [newActivity, ...state.activities],
                    unreadNotifications: state.unreadNotifications + 1
                };
            }),

            deleteTask: (id) => set((state) => {
                const deletedTask = state.tasks.find(t => t.id === id);
                if (!deletedTask) return state;

                const newActivity: ActivityLog = {
                    id: Math.random().toString(36).substr(2, 9),
                    userId: state.currentUser?.id || 'system',
                    action: 'deleted task',
                    target: deletedTask.title,
                    time: new Date().toISOString(),
                    type: 'warning'
                };

                return {
                    tasks: state.tasks.filter(t => t.id !== id),
                    activities: [newActivity, ...state.activities],
                    unreadNotifications: state.unreadNotifications + 1
                };
            }),

            moveTask: (taskId, status) => set((state) => {
                const task = state.tasks.find(t => t.id === taskId);
                if (!task) return state;

                const newActivity: ActivityLog = {
                    id: Math.random().toString(36).substr(2, 9),
                    userId: state.currentUser?.id || 'system',
                    action: 'moved task to',
                    target: status,
                    time: new Date().toISOString(),
                    type: 'info'
                };

                return {
                    tasks: state.tasks.map(t => t.id === taskId ? { ...t, status, updatedAt: new Date().toISOString() } : t),
                    activities: [newActivity, ...state.activities],
                    unreadNotifications: state.unreadNotifications + 1
                };
            }),

            addActivity: (activityData) => set((state) => ({
                activities: [
                    {
                        ...activityData,
                        id: Math.random().toString(36).substr(2, 9),
                        time: new Date().toISOString()
                    },
                    ...state.activities
                ],
                unreadNotifications: state.unreadNotifications + 1
            })),

            setCurrentUser: (user) => set({ currentUser: user }),
            setSearchQuery: (searchQuery) => set({ searchQuery }),
            setCreateModalOpen: (isCreateModalOpen) => set({ isCreateModalOpen }),
            updateCurrentUser: (updates) => set((state) => ({
                currentUser: state.currentUser ? { ...state.currentUser, ...updates } : null,
                users: state.users.map(u => u.id === state.currentUser?.id ? { ...u, ...updates } : u)
            })),
            setTheme: (theme) => set({ theme }),
            clearUnread: () => set({ unreadNotifications: 0 })
        }),
        {
            name: 'sprinto-storage'
        }
    )
);
