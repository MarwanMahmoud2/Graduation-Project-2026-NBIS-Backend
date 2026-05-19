import StatCard from '../components/StatCard';
import PriorityBadge from '../components/PriorityBadge';

const reportRows = [
    {
        name: 'Tia Ahmed',
        type: 'Biometric Mismatch',
        priority: 'high',
        status: 'Under Investigation',
        seed: 'p1',
    },
    {
        name: 'Rahma Saber',
        type: 'Unauthorized Movement',
        priority: 'medium',
        status: 'The Process Pending Review',
        seed: 'p2',
    },
    {
        name: 'Salma Mohamed',
        type: 'Biometric Mismatch',
        priority: 'high',
        status: 'Under Investigation',
        seed: 'p3',
    },
];

export default function PoliceDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total Active Cases"
                    value="15"
                    className="bg-[#1E88E5] text-white ring-0"
                    iconWrapClass="bg-white/20 text-white"
                    icon={<FolderIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="Verified Matches"
                    value="9"
                    className="bg-emerald-50 text-emerald-900"
                    iconWrapClass="bg-emerald-100 text-emerald-600"
                    icon={<CheckCircleIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="Pending Investigations"
                    value="4"
                    className="bg-amber-50 text-amber-900"
                    iconWrapClass="bg-amber-100 text-amber-600"
                    icon={<HourglassIcon className="h-5 w-5" />}
                />
                <StatCard
                    label="High Priority Alerts"
                    value="1"
                    className="bg-rose-50 text-rose-900"
                    iconWrapClass="bg-rose-100 text-rose-600"
                    icon={<AlertIcon className="h-5 w-5" />}
                />
            </div>

            <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80">
                <div className="border-b border-slate-100 px-6 py-4">
                    <h3 className="text-base font-semibold text-slate-800">Active Police Reports</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead>
                            <tr className="bg-sky-50/90 text-slate-700">
                                <th className="px-6 py-3 font-semibold">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1 hover:text-slate-900"
                                    >
                                        Infant Name
                                        <SortIcon className="h-4 w-4 text-slate-400" />
                                    </button>
                                </th>
                                <th className="px-6 py-3 font-semibold">Report Type</th>
                                <th className="px-6 py-3 font-semibold">Priority</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {reportRows.map((row) => (
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
                                    <td className="px-6 py-4 text-slate-600">{row.type}</td>
                                    <td className="px-6 py-4">
                                        <PriorityBadge level={row.priority} />
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{row.status}</td>
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

function FolderIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
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
