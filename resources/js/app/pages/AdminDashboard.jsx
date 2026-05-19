import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';

const infantRows = [
    { name: 'Tia Ahmed', mother: 'Eman Samy', status: 'verified', last: '5 Minutes Ago', seed: 'a1' },
    { name: 'Rahma Saber', mother: 'Mona Khaled', status: 'pending', last: '12 Minutes Ago', seed: 'a2' },
    { name: 'Salma Mohamed', mother: 'Nour Hassan', status: 'alerts', last: '1 Hour Ago', seed: 'a3' },
    { name: 'Omar Ali', mother: 'Sara Ibrahim', status: 'verified', last: '2 Hours Ago', seed: 'a4' },
    { name: 'Layla Mahmoud', mother: 'Dina Farouk', status: 'pending', last: 'Yesterday', seed: 'a5' },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard
                    label="Total Infants Today"
                    value="15"
                    className="bg-[#1E88E5] text-white ring-0"
                    iconWrapClass="bg-white/20 text-white"
                    icon={<BabyIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="Registered Users"
                    value="4"
                    className="bg-violet-50 text-violet-900"
                    iconWrapClass="bg-violet-100 text-violet-600"
                    icon={<UsersIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="Total Organizations"
                    value="9"
                    className="bg-sky-50 text-sky-900"
                    iconWrapClass="bg-sky-100 text-sky-600"
                    icon={<BuildingIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="Verified Infants"
                    value="9"
                    className="bg-teal-50 text-teal-900"
                    iconWrapClass="bg-teal-100 text-teal-600"
                    icon={<CheckCircleIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="Pending Verification"
                    value="4"
                    className="bg-amber-50 text-amber-900"
                    iconWrapClass="bg-amber-100 text-amber-600"
                    icon={<HourglassIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="System Alerts"
                    value="1"
                    className="bg-rose-50 text-rose-900"
                    iconWrapClass="bg-rose-100 text-rose-600"
                    icon={<AlertIcon className="h-5 w-5" />}
                />
            </div>

            <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80">
                <div className="border-b border-slate-100 px-6 py-4">
                    <h3 className="text-base font-semibold text-slate-800">Infants Overview</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-left text-sm">
                        <thead>
                            <tr className="bg-slate-50/90 text-slate-600">
                                <th className="px-6 py-3 font-semibold">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1 hover:text-slate-900"
                                    >
                                        Baby Name
                                        <SortIcon className="h-4 w-4 text-slate-400" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 font-semibold">Mother</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Last Check</th>
                                <th className="px-6 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {infantRows.map((row) => (
                                <tr key={row.name} className="text-slate-700 transition hover:bg-slate-50/80">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={`https://picsum.photos/seed/${row.seed}/40/40`}
                                                alt=""
                                                className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                                            />
                                            <span className="font-medium text-slate-900">{row.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{row.mother}</td>
                                    <td className="px-6 py-4">
                                        {row.status === 'verified' && <StatusBadge variant="verified">Verified</StatusBadge>}
                                        {row.status === 'pending' && <StatusBadge variant="pending">Pending</StatusBadge>}
                                        {row.status === 'alerts' && <StatusBadge variant="alerts">Alerts</StatusBadge>}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{row.last}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            className="rounded-lg bg-[#1E88E5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1976D2]"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

function SortIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

function BabyIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function UsersIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}

function BuildingIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
        </svg>
    );
}

function CheckCircleIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function HourglassIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
}

function AlertIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
        </svg>
    );
}
