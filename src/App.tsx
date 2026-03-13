import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Backlog } from './pages/Backlog';
import { ActiveSprints } from './pages/ActiveSprints';
import { Team } from './pages/Team';
import { Reports } from './pages/Reports';
import { Profile } from './pages/Profile';
import { Calendar } from './pages/Calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="backlog" element={<Backlog />} />
          <Route path="active-sprints" element={<ActiveSprints />} />
          <Route path="team" element={<Team />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
