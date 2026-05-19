const variants = {
    verified: {
        wrap: 'bg-emerald-50 text-emerald-700 ring-emerald-200/60',
        Icon: CheckIcon,
    },
    pending: {
        wrap: 'bg-amber-50 text-amber-700 ring-amber-200/60',
        Icon: HourglassIcon,
    },
    alerts: {
        wrap: 'bg-red-50 text-red-700 ring-red-200/60',
        Icon: AlertIcon,
    },
};

export default function StatusBadge({ variant, children }) {
    const cfg = variants[variant] ?? variants.pending;
    const Icon = cfg.Icon;
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cfg.wrap}`}
        >
            <Icon className="h-3.5 w-3.5" />
            {children}
        </span>
    );
}

function CheckIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
