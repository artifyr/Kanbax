# 🚀 Project Kanbax: Implementation Roadmap (REVAMPED)

This document outlines the detailed strategy to transition our premium React prototype into a fully functional, production-ready project management ecosystem.

---

## ✅ Phase 1: Global State & Data Architecture (COMPLETED)
**Goal:** Establish a single source of truth for tasks, sprints, and team members.
- [x] **Zustand Store**: Implemented `useTaskStore` with persistence.
- [x] **Strict Typing**: Defined core project interfaces.
- [x] **Initial Wiring**: Dashboard and Backlog now read from the live store.

---

## 🏗️ Phase 2: Fundamental Interaction & Wiring (URGENT)
**Goal:** Make every button and input field in the existing UI functional.

- [x] **Create Task Engine**:
  - [x] Connect `CreateTaskModal.tsx` to the store's `addTask` method.
  - [x] Implement form validation (prevent empty titles).
  - [x] Enable image "mock uploads" (storing the path in state).
- [x] **Global Search**:
  - [x] Wire the Navbar search bar to a global search state.
  - [x] Implement "Command + K" style quick-search/page navigation.
- [x] **Data Filtering**:
  - [x] Connect Backlog search and filter buttons to live logic.
  - [x] Add "Sort by Priority/Date" functionality to the Task Table.
- [x] **Navigation & Settings**:
  - [x] Make the Sidebar "Settings" button jump to the Profile page.
  - [x] Wire the "Download PDF" button to a basic `window.print()` or draft generator.
  - [x] Map the "Reports" KPI cards to actual aggregated task data.

---

## ✨ Phase 3: Interactive Workspace (Dynamics) (COMPLETED)
**Goal:** Add high-end interactive behaviors.

- [x] **Drag-and-Drop Kanban**: Implement `@hello-pangea/dnd` in `ActiveSprints.tsx` (Verified).
- [x] **Inline Editing**: Add "Click to Edit" for task titles/descriptions in the Kanban cards (Integrated into Detail Drawer).
- [x] **Task Detail Side-Panel**: Create a slide-out drawer to view/edit comments and attachments without page navigation.
- [x] **Calendar Integration**: Implemented full calendar logic with `date-fns`.
- [x] **Calendar View Modes**: Added Month, Week, and Day layouts.
- [x] **Calendar Creation**: Tasks can be created directly from the day cell with pre-filled dates.
- [x] **Task Scheduling**: Tasks with `dueDate` now populate automatically in the calendar.
- [x] **Team Management**: Enabled member deletion with task persistence and self-deletion checks.

---

## 📈 Phase 4: Analytics & Intelligence
**Goal:** Transform static charts into dynamic, data-driven reporting tools.

- [ ] **Recharts Implementation**: Replace CSS donut charts with interactive SVG charts.
- [ ] **Dynamic Metrics**: Calculate "Throughput Delta" and "Burndown" accurately based on task timestamps.
- [ ] **Export Engine**: Implement high-quality CSV/PDF exports.

---

## 🔐 Phase 5: Authentication & Real-time
**Goal:** Secure the workspace and enable team collaboration.

- [ ] **Auth Layer**: Integrate Supabase/Firebase Auth.
- [ ] **Role-Based Access**: Restrict "Complete Sprint" to Admins.
- [ ] **Real-time Sync**: Live updates when a teammate moves a task.

---

- [ ] **Scaling & Quality**
- [ ] **PWA Support**: Offline mode for the Calendar and Backlog.
- [x] **Dark Mode Sync**: System-synchronized theme switching (implemented in Profile).
- [ ] **Performance Audit**: React.lazy() and image optimization.

---

> **Next Focus:** implementing **Phase 4: Analytics & Intelligence** (Recharts integration).
