export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: 'owner' | 'admin' | 'contributor';
    title: string;
}

export interface Comment {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: Priority;
    assigneeId?: string;
    reporterId: string;
    storyPoints?: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    dueDate?: string;
    comments: Comment[];
    attachments: string[];
}

export interface Sprint {
    id: string;
    name: string;
    goal: string;
    startDate: string;
    endDate: string;
    status: 'planned' | 'active' | 'completed';
    taskIds: string[];
}

export interface ActivityLog {
    id: string;
    userId: string;
    action: string;
    target: string;
    time: string;
    type: 'success' | 'info' | 'warning' | 'error';
}

export interface DashboardStat {
    label: string;
    value: string;
    unit: string;
    trend: string;
    type: 'velocity' | 'critical' | 'health';
}
