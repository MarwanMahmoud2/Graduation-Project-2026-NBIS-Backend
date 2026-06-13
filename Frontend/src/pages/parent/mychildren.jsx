// src/pages/parent/MyChildren.jsx
import { useState, useEffect } from "react";
import ParentLayout from "../../components/parentLayout";
import { parentService } from "../../api/parent";

// ── CHILD DETAIL MODAL ─────────────────────────────────────────────────────
function ChildDetailModal({ child, onClose }) {
  if (!child) return null;

  const childPhotoUrl = child.child_photo_path 
    ? `http://localhost:8000/storage/${child.child_photo_path}`
    : null;
  const footprintUrl = child.footprint_path
    ? `http://localhost:8000/storage/${child.footprint_path}`
    : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Child Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Child Photo */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Child Photo</h3>
              {childPhotoUrl ? (
                <img src={childPhotoUrl} alt="Child photo" className="w-full h-40 object-cover rounded-xl border border-gray-200" />
              ) : (
                <div className="w-full h-40 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  No photo available
                </div>
              )}
            </div>

            {/* Footprint */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Footprint</h3>
              {footprintUrl ? (
                <img src={footprintUrl} alt="Footprint" className="w-full h-40 object-cover rounded-xl border border-gray-200" />
              ) : (
                <div className="w-full h-40 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  No footprint available
                </div>
              )}
            </div>

            {/* Child Information */}
            <div className="col-span-2">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Child Information</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium text-gray-800">{child.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Gender</p>
                    <p className="text-sm font-medium text-gray-800 capitalize">{child.gender || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Birth Date</p>
                    <p className="text-sm font-medium text-gray-800">{child.birth_date || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Estimated Age</p>
                    <p className="text-sm font-medium text-gray-800">{child.estimated_age || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      child.status === 'verified' ? 'bg-green-100 text-green-600' :
                      child.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      child.status === 'missing' ? 'bg-red-100 text-red-500' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {child.status ? child.status.charAt(0).toUpperCase() + child.status.slice(1) : 'Unknown'}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">NFC Tag ID</p>
                    <p className="text-sm font-medium text-gray-800">{child.nfc_tag_id || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mother's Name</p>
                    <p className="text-sm font-medium text-gray-800">{child.mother_name || child.mother || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Father's Name</p>
                    <p className="text-sm font-medium text-gray-800">{child.father_name || child.father || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Father's Phone</p>
                    <p className="text-sm font-medium text-gray-800">{child.father_phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Father's National ID</p>
                    <p className="text-sm font-medium text-gray-800">{child.father_national_id || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Parent Email</p>
                    <p className="text-sm font-medium text-gray-800">{child.parent_email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Is Linked</p>
                    <p className="text-sm font-medium text-gray-800">{child.is_linked ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Found Location</p>
                    <p className="text-sm font-medium text-gray-800">{child.found_location || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date Found</p>
                    <p className="text-sm font-medium text-gray-800">{child.date_found || 'N/A'}</p>
                  </div>
                </div>
                {child.notes && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Notes</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">{child.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const statusStyle = {
  verified: "bg-green-100 text-green-600",
  pending: "bg-yellow-100 text-yellow-600",
  missing: "bg-red-100 text-red-600",
};

export default function MyChildren() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setLoading(true);
        const data = await parentService.getMyChildren();
        setChildren(data);
      } catch (err) {
        setError('Failed to load children');
        console.error('Error fetching children:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  const filtered = children.filter(c => {
    const matchSearch = c.name?.toLowerCase().includes(search.toLowerCase()) || String(c.id)?.includes(search);
    const matchStatus = statusFilter === "All Status" || c.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <ParentLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          My Children
        </h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage Your Registered Children</p>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 max-w-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent flex-1"
            placeholder="Search By Child Name Or ID..." />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none text-gray-600 appearance-none bg-white pr-8 focus:border-blue-400">
            <option>All Status</option>
            <option>Verified</option>
            <option>Pending</option>
            <option>Missing</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="px-6 py-12 text-center text-gray-400">Loading children...</div>
        ) : error ? (
          <div className="px-6 py-12 text-center text-red-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400">No children found</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Child Name", "Mother", "Status", "Last Check", "Actions"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((child, i) => (
                <tr key={child.id || i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {child.name?.charAt(0) || 'B'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{child.name}</p>
                        <p className="text-xs text-gray-400">{child.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">{child.mother_name || child.mother}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[child.status] || 'bg-gray-100 text-gray-600'}`}>
                      ● {child.status ? child.status.charAt(0).toUpperCase() + child.status.slice(1) : 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-400">{child.last_check || child.lastCheck || 'N/A'}</td>
                  <td className="px-6 py-3">
                    <button onClick={() => setSelectedChild(child)} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg transition">
                      View Details
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="px-6 py-3 flex items-center gap-2 border-t border-gray-100">
          <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <span className="text-xs text-gray-400">1–{filtered.length}</span>
        </div>
      </div>

      {/* Child Detail Modal */}
      <ChildDetailModal child={selectedChild} onClose={() => setSelectedChild(null)} />
    </ParentLayout>
  );
}