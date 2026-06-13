// src/pages/parent/ParentDashboard.jsx
import { useState, useEffect } from "react";
import ParentLayout from "../../components/parentLayout";
import { parentService } from "../../api/parent";

const statusStyle = {
  verified: "bg-green-100 text-green-600",
  pending: "bg-yellow-100 text-yellow-600",
  missing: "bg-red-100 text-red-600",
};

export default function ParentDashboard() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Calculate stats from real data
  const stats = [
    { 
      label: "My Children Count", 
      value: children.length, 
      color: "bg-blue-500", 
      textColor: "text-white", 
      icon: "👶" 
    },
    { 
      label: "Verified Children", 
      value: children.filter(c => c.status === 'verified').length, 
      color: "bg-green-100", 
      textColor: "text-green-600", 
      icon: "✅" 
    },
    { 
      label: "Pending Verifications", 
      value: children.filter(c => c.status === 'pending').length, 
      color: "bg-yellow-100", 
      textColor: "text-yellow-600", 
      icon: "⏳" 
    },
  ];

  return (
    <ParentLayout>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className={`${s.color} rounded-2xl p-4 flex items-center justify-between shadow-sm`}>
            <div>
              <p className={`text-xs font-medium ${s.textColor} opacity-80`}>{s.label}</p>
              <p className={`text-3xl font-bold ${s.textColor} mt-1`}>{s.value}</p>
            </div>
            <span className="text-3xl opacity-80">{s.icon}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">My Children's</h2>
        </div>
        {loading ? (
          <div className="px-6 py-12 text-center text-gray-400">Loading children...</div>
        ) : error ? (
          <div className="px-6 py-12 text-center text-red-500">{error}</div>
        ) : children.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400">No children registered yet</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Child Name", "Mother", "Status", "Date Registered"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {children.map((child) => (
                <tr key={child.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {child.name?.charAt(0) || 'B'}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{child.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">{child.mother_name || child.mother || '-'}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[child.status] || 'bg-gray-100 text-gray-600'}`}>
                      ● {child.status ? child.status.charAt(0).toUpperCase() + child.status.slice(1) : 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-400">
                    {child.created_at ? new Date(child.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ParentLayout>
  );
}