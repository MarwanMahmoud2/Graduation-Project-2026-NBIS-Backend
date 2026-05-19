export default function Header() {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200/80 bg-[#F4F7FE]/95 px-6 py-4 backdrop-blur-sm">
            <div className="relative max-w-xl flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <SearchIcon className="h-5 w-5" />
                </span>
                <input
                    type="search"
                    placeholder="Search"
                    className="w-full rounded-xl border-0 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 shadow-sm ring-1 ring-slate-200/80 placeholder:text-slate-400 focus:ring-2 focus:ring-[#1E88E5]"
                />
            </div>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="relative rounded-lg p-2 text-slate-600 transition hover:bg-white hover:text-slate-900"
                    aria-label="Notifications"
                >
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute right-1 top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                        3
                    </span>
                </button>
                <button
                    type="button"
                    className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-slate-300"
                >
                    <img
                        src="https://i.pravatar.cc/40?img=12"
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                    />
                    <span className="hidden text-sm font-medium text-slate-800 sm:inline">Mohamed Elsaeed</span>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>
            </div>
        </header>
    );
}

function SearchIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );
}

function BellIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
        </svg>
    );
}

function ChevronDown({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}
