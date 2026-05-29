// src/components/AdminLayout.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Logo 1.png";

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  logs: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2",
  infants: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  members: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  org: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  roles: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  chevron: "M6 9l6 6 6-6",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  search: "M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M21 21l-4.35-4.35",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  notification: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
};

// ── Sidebar Nav Items ──────────────────────────────────────────────────────
const navItems = [
  { label: "Dashboard", icon: "dashboard", path: "/admin/dashboard" },
  { label: "Verification Logs", icon: "logs", path: "/admin/verification-logs" },
  {
    label: "Children List", icon: "infants", path: "/admin/children",
    subIcon: "logs",
  },
  {
    label: "Members", icon: "members", path: "/admin/members",
    children: [
      { label: "Add User", path: "/admin/members/add" },
      { label: "User List", path: "/admin/members/list" },
    ],
  },
  {
    label: "Organizations", icon: "org", path: "/admin/organizations",
    children: [
      { label: "Hospital", path: "/admin/organizations/hospital" },
      { label: "Police Departments", path: "/admin/organizations/police" },
    ],
  },
  { label: "Roles & Permissions", icon: "roles", path: "/admin/roles" },
];

// ── Search Modal ───────────────────────────────────────────────────────────
const recentSearches = [
  { name: "Tia Ahmed", id: "ID:304010112", mother: "Eman Samy" },
  { name: "Rahma Saber", id: "ID:404011112", mother: "May Ebrahim" },
];

function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Children", "Reports", "Organizations", "Users"];
  const hasResults = query.trim() === "";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16"
      style={{ background: "rgba(0,0,0,0.18)" }} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}>
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
            className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
            placeholder="Search Across The System..." />
        </div>
        {/* Filters */}
        <div className="flex gap-2 px-4 py-2 border-b border-gray-100">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
              {f}
            </button>
          ))}
        </div>
        {/* Results */}
        <div className="px-4 py-3 min-h-[120px]">
          {query && (
            <p className="text-center text-gray-500 font-semibold py-8">No Results Found</p>
          )}
          {!query && (
            <>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-500">Recent Searches</p>
                <button className="text-xs text-blue-500 hover:underline">Clear History</button>
              </div>
              {recentSearches.map((r, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="mt-0.5 shrink-0">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div className="text-xs text-gray-600">
                    <p className="font-semibold text-gray-700">• {r.name}</p>
                    <p className="text-gray-400">• {r.id}</p>
                    <p className="text-gray-400">• {r.mother}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Notifications Dropdown ─────────────────────────────────────────────────
function NotifDropdown({ onClose }) {
  return (
    <div className="absolute right-0 top-12 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <p className="font-semibold text-gray-700 text-sm">Alerts</p>
        <button onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>
      <div className="px-4 py-3">
        <div className="flex items-start gap-3 p-2 rounded-xl bg-red-50 border border-red-100">
          <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="text-xs font-semibold text-gray-700">Missing Child Alert</p>
              <p className="text-xs text-gray-400">2 min ago</p>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Ahmed Mohamed has been reported missing</p>
            <button className="mt-1.5 text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">Here You Will See Notifications Related To Your Account.</p>
      </div>
      <div className="border-t border-gray-100 px-4 py-2.5 text-center">
        <button className="text-xs text-blue-500 hover:underline font-medium">View All Notifications</button>
      </div>
    </div>
  );
}

// ── Profile Dropdown ───────────────────────────────────────────────────────
function ProfileDropdown({ navigate, onClose, logout }) {
  return (
    <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden py-1">
      {[
        { label: "Profile", icon: "user", path: "/admin/profile" },
        { label: "Notifications", icon: "bell", path: "/admin/notifications" },
        { label: "Settings", icon: "settings", path: "/admin/settings" },
      ].map(item => (
        <button key={item.label} onClick={() => { navigate(item.path); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={icons[item.icon]} />
          </svg>
          {item.label}
        </button>
      ))}
      <div className="border-t border-gray-100 mx-3 my-1" />
      <div className="px-4 py-2">
        <p className="text-xs font-semibold text-gray-700">Mohamed Elsaeed</p>
        <p className="text-xs text-blue-500">Admin</p>
      </div>
      <div className="border-t border-gray-100 mx-3 my-1" />
      <button onClick={async () => { await logout(); navigate('/login'); onClose(); }}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d={icons.logout} />
        </svg>
        Logout
      </button>
    </div>
  );
}

// ── Main Layout ────────────────────────────────────────────────────────────
export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [openMenus, setOpenMenus] = useState({ Members: true, Organizations: false });
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleMenu = (label) => setOpenMenus(p => ({ ...p, [label]: !p[label] }));
  const isActive = (path) => location.pathname === path;
  const isParentActive = (item) =>
    item.children?.some(c => location.pathname === c.path) || location.pathname === item.path;

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-[190px] shrink-0 bg-white border-r border-gray-100 flex flex-col py-6 px-3 shadow-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="NBIS" className="w-20 h-20 object-contain" />
          <p className="text-xs text-gray-400 -mt-1">Newborn Biometric ID</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <div key={item.label}>
              <button
                onClick={() => item.children ? toggleMenu(item.label) : navigate(item.path)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${isParentActive(item) && !item.children
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                    : isParentActive(item) && item.children
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icons[item.icon]} />
                </svg>
                <span className="flex-1 text-left text-xs">{item.label}</span>
                {item.children && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    className={`transition-transform ${openMenus[item.label] ? "rotate-180" : ""}`}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </button>
              {/* Sub items */}
              {item.children && openMenus[item.label] && (
                <div className="ml-7 mt-0.5 space-y-0.5">
                  {item.children.map(child => (
                    <button key={child.label} onClick={() => navigate(child.path)}
                      className={`w-full text-left text-xs px-3 py-2 rounded-lg transition
                        ${isActive(child.path) ? "text-blue-600 font-semibold" : "text-gray-400 hover:text-gray-600"}`}>
                      • {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Settings at bottom */}
        <button onClick={() => navigate("/admin/settings")}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition mt-4
            ${isActive("/admin/settings") ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={icons.settings} />
          </svg>
          <span className="text-xs">Settings</span>
        </button>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 shadow-sm">
          {/* Search */}
          <button onClick={() => setShowSearch(true)}
            className="flex-1 max-w-md flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-400 hover:border-blue-300 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            Search
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <div ref={profileRef} className="relative">
              <button onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
                className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1.5 rounded-xl transition">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Mohamed Elsaeed</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showProfile && <ProfileDropdown navigate={navigate} onClose={() => setShowProfile(false)} logout={logout} />}
            </div>

            <div ref={notifRef} className="relative">
              <button onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
                className="relative w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-blue-300 transition">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
              </button>
              {showNotif && <NotifDropdown onClose={() => setShowNotif(false)} />}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </div>
  );
}