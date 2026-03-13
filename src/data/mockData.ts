export const DASHBOARD_STATS = [
    { label: "Weekly Velocity", value: "42", unit: "pts", trend: "+12% vs last week", type: "velocity" },
    { label: "Critical Backlog", value: "14", unit: "", trend: "+3 items since 9 AM", type: "critical" },
    { label: "Sprint Health", value: "92%", unit: "", trend: "On Track", type: "health" },
];

export const TEAM_THROUGHPUT = [
    { name: "Dev Alpha", progress: 92 },
    { name: "Dev Bravo", progress: 78 },
    { name: "Dev Charlie", progress: 45 },
    { name: "Design Lead", progress: 88 },
];

export const RECENT_ACTIVITY = [
    {
        id: 1,
        title: "Frontend Dashboard Polish",
        user: { name: "Sarah Jenkins", avatar: "https://i.pravatar.cc/100?u=sarah" },
        time: "24 mins ago",
        action: "completed",
        target: "UI Polish"
    },
    {
        id: 2,
        title: "API Documentation Review",
        user: { name: "Mike Ross", avatar: "https://i.pravatar.cc/100?u=mike" },
        time: "1 hour ago",
        action: "reviewed",
        target: "API Docs"
    },
    {
        id: 3,
        title: "Deployment Polish",
        user: { name: "System", avatar: "https://i.pravatar.cc/100?u=sys" },
        time: "3 hours ago",
        action: "triggered",
        target: "Production"
    }
];

export const UPCOMING_DEADLINES = [
    { title: "Mobile App Beta Release", time: "Due at 5:00 PM", day: "Today", highlight: true },
    { title: "Cloud Infrastructure Audit", time: "Due at 10:00 AM", day: "Tomorrow", highlight: false },
    { title: "Client Presentation", time: "Due at 2:30 PM", day: "Wed, Oct 25", highlight: false },
];

export const NAV_LINKS = [
    { label: "Dashboard", href: "/", icon: "dashboard" },
    { label: "Backlog", href: "/backlog", icon: "folder" },
    { label: "Sprints", href: "/active-sprints", icon: "rocket_launch" },
    { label: "Team", href: "/team", icon: "group" },
    { label: "Reports", href: "/reports", icon: "analytics" },
];
