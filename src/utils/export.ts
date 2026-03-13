import type { Task } from '../types';

export const exportToCSV = (tasks: Task[], fileName: string = 'kanbax-export.csv') => {
    const headers = ['ID', 'Title', 'Status', 'Priority', 'Assignee ID', 'Created At', 'Tags'];
    const rows = tasks.map(t => [
        t.id,
        t.title,
        t.status,
        t.priority,
        t.assigneeId || 'Unassigned',
        t.createdAt,
        t.tags.join('; ')
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

export const exportToPDF = () => {
    // We use the browser's native print-to-PDF which preserves our premium CSS
    window.print();
};
