import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
    const { pathname } = useLocation();
    const variant = pathname.includes('/police') ? 'police' : 'admin';

    return (
        <div className="flex min-h-screen bg-[#F4F7FE]">
            <Sidebar variant={variant} />
            <div className="flex min-w-0 flex-1 flex-col">
                <Header />
                <main className="flex-1 p-6 pt-2">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
