export default function StatCard({ label, value, icon, className = '', iconWrapClass = '' }) {
    return (
        <div
            className={`flex flex-col justify-between rounded-2xl p-5 shadow-sm ring-1 ring-black/5 ${className}`}
        >
            <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-medium leading-snug opacity-90">{label}</span>
                <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconWrapClass}`}
                >
                    {icon}
                </span>
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight">{value}</p>
        </div>
    );
}
