// src/pages/police/PoliceDashboard.jsx
import { useState, useEffect } from "react";
import PoliceLayout from "../../components/policeLayout";
import client from "../../api/client";

const stats = [
  { label: "Total Active Cases", value: 15, color: "bg-blue-500", textColor: "text-white", icon: "📁" },
  { label: "Verified Matches", value: 9, color: "bg-green-100", textColor: "text-green-600", icon: "✅" },
  { label: "Pending Investigations", value: 4, color: "bg-yellow-100", textColor: "text-yellow-600", icon: "⏳" },
  { label: "Alerts", value: 1, color: "bg-red-400", textColor: "text-white", icon: "⚠️" },
];

export default function PoliceDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await client.get('/active-missing-reports');
        setReports(response.data.data || []);
      } catch (err) {
        setError('Failed to load reports');
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <PoliceLayout>
      <div className="grid grid-cols-4 gap-4 mb-6">
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Active Police Reports</h2>
        </div>
        {loading ? (
          <div className="px-6 py-12 text-center text-gray-400">Loading reports...</div>
        ) : error ? (
          <div className="px-6 py-12 text-center text-red-500">{error}</div>
        ) : reports.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400">No active reports</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Child Name", "Report Type", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {r.child_name?.charAt(0) || 'B'}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">{r.child_name}</span>
                        <p className="text-xs text-gray-400">{r.mother_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">{r.report_type || 'Missing Child'}</td>
                  <td className="px-6 py-3 text-sm text-gray-500">{r.status}</td>
                  <td className="px-6 py-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg transition">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PoliceLayout>
  );
}