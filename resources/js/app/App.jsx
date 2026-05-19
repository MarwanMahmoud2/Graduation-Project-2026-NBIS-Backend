import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard';
import PoliceDashboard from './pages/PoliceDashboard';

export default function App() {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route index element={<Navigate to="admin" replace />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="police" element={<PoliceDashboard />} />
            </Route>
            <Route path="*" element={<Navigate to="admin" replace />} />
        </Routes>
    );
}
