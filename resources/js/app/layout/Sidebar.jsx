import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const nbisBlue = '#1E88E5';

export default function Sidebar({ variant }) {
    const [membersOpen, setMembersOpen] = useState(false);
    const [orgsOpen, setOrgsOpen] = useState(false);
    const isAdmin = variant === 'admin';

    const navCls = ({ isActive }) =>
        [
            'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
            isActive ? 'text-white shadow-md' : 'text-slate-600 hover:bg-slate-100',
        ].join(' ');

    const navStyle = ({ isActive }) =>
        isActive ? { backgroundColor: nbisBlue } : undefined;

    const inactiveItem =
        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100';

    return (
        <aside className="flex w-64 shrink-0 flex-col border-r border-slate-100 bg-white shadow-[4px_0_24px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col items-center border-b border-slate-100 px-4 py-6">
                <img
                    src="/the-baby.png"
                    alt="NBIS"
                    className="h-20 w-20 rounded-2xl object-contain ring-2 ring-[#1E88E5]/20"
                />
                <h1 className="mt-3 text-xl font-bold tracking-tight" style={{ color: nbisBlue }}>
                    NBIS
                </h1>
                <p className="mt-0.5 text-center text-xs font-medium leading-tight" style={{ color: nbisBlue }}>
                    Newborn Biometric ID
                </p>
            </div>

            <nav className="flex flex-1 flex-col gap-0.5 p-3">
                {isAdmin ? (
                    <>
                        <NavLink to="/admin" end className={navCls} style={navStyle}>
                            <HomeIcon className="h-5 w-5 shrink-0" />
                            Dashboard
                        </NavLink>
                        <button type="button" className={inactiveItem}>
                            <DocCheckIcon className="h-5 w-5 shrink-0 text-slate-500" />
                            verification logs
                        </button>
                        <button type="button" className={inactiveItem}>
                            <InfantListIcon className="h-5 w-5 shrink-0 text-slate-500" />
                            infants list
                        </button>
                        <button
                            type="button"
                            className={inactiveItem}
                            onClick={() => setMembersOpen((o) => !o)}
                        >
                            <UsersIcon className="h-5 w-5 shrink-0 text-slate-500" />
                            <span className="flex-1">Members</span>
                            <Chevron className={membersOpen ? 'rotate-180' : ''} />
                        </button>
                        {membersOpen && (
                            <div className="ml-4 flex flex-col gap-0.5 border-l border-slate-200 pl-3">
                                <span className="cursor-default py-1 text-xs text-slate-400">All members</span>
                                <span className="cursor-default py-1 text-xs text-slate-400">Invitations</span>
                            </div>
                        )}
                        <button
                            type="button"
                            className={inactiveItem}
                            onClick={() => setOrgsOpen((o) => !o)}
                        >
                            <BuildingIcon className="h-5 w-5 shrink-0 text-slate-500" />
                            <span className="flex-1">Organizations</span>
                            <Chevron className={orgsOpen ? 'rotate-180' : ''} />
                        </button>
                        {orgsOpen && (
                            <div className="ml-4 flex flex-col gap-0.5 border-l border-slate-200 pl-3">
                                <span className="cursor-default py-1 text-xs text-slate-400">Directory</span>
                                <span className="cursor-default py-1 text-xs text-slate-400">Units</span>
                            </div>
                        )}
                        <button type="button" className={inactiveItem}>
                            <ShieldCheckIcon className="h-5 w-5 shrink-0 text-slate-500" />
                            Roles & Permissions
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/police" end className={navCls} style={navStyle}>
                            <HomeIcon className="h-5 w-5 shrink-0" />
                            Dashboard
                        </NavLink>
                        <button type="button" className={inactiveItem}>
                            <DocCheckIcon className="h-5 w-5 shrink-0 text-slate-500" />
                            Verification Logs
                        </button>
                    </>
                )}
            </nav>

            <div className="border-t border-slate-100 px-3 py-2">
                <NavLink
                    to={isAdmin ? '/police' : '/admin'}
                    className="block rounded-lg px-2 py-2 text-center text-xs font-semibold text-[#1E88E5] transition hover:bg-slate-50"
                >
                    {isAdmin ? 'Open Police dashboard →' : '← Open Admin dashboard'}
                </NavLink>
            </div>

            {isAdmin && (
                <div className="border-t border-slate-100 p-3">
                    <button type="button" className={inactiveItem}>
                        <CogIcon className="h-5 w-5 shrink-0 text-slate-500" />
                        Settings
                    </button>
                </div>
            )}
        </aside>
    );
}

function Chevron({ className = '' }) {
    return (
        <svg className={`h-4 w-4 shrink-0 text-slate-400 transition ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

function HomeIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
        </svg>
    );
}

function DocCheckIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
    );
}

function InfantListIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5" />
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

function ShieldCheckIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    );
}

function CogIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}
