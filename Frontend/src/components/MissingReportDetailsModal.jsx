import { useState, useEffect } from "react";
import { adminService } from "../api/admin";

export default function MissingReportDetailsModal({ reportId, onClose }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        setLoading(true);
        const response = await adminService.getMissingReportDetails(reportId);
        setReport(response.data);
      } catch (err) {
        setError('Failed to load report details');
        console.error('Error fetching report details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchReportDetails();
    }
  }, [reportId]);

  if (!reportId) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Missing Child Report Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-400">Loading...</div>
          ) : error ? (
            <div className="flex items-center justify-center py-12 text-red-500">{error}</div>
          ) : report ? (
            <div className="space-y-6">
              {/* Child Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Child Information</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm font-medium text-gray-800">{report.child?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Mother's Name</p>
                      <p className="text-sm font-medium text-gray-800">{report.child?.mother_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Father's Name</p>
                      <p className="text-sm font-medium text-gray-800">{report.child?.father_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Father's Phone</p>
                      <p className="text-sm font-medium text-gray-800">{report.child?.father_phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="text-sm font-medium text-gray-800 capitalize">{report.child?.gender || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Birth Date</p>
                      <p className="text-sm font-medium text-gray-800">{report.child?.birth_date || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        report.child?.status === 'missing' ? 'bg-red-100 text-red-500' :
                        report.child?.status === 'verified' ? 'bg-green-100 text-green-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {report.child?.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reporter Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Reported By</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm font-medium text-gray-800">{report.reporter?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-800">{report.reporter?.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-800">{report.reporter?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Report Details</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Report Type</p>
                      <p className="text-sm font-medium text-gray-800 capitalize">{report.report_type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        report.status === 'active' ? 'bg-red-100 text-red-500' :
                        report.status === 'resolved' ? 'bg-green-100 text-green-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Seen Location</p>
                      <p className="text-sm font-medium text-gray-800">{report.last_seen_location || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Seen Date</p>
                      <p className="text-sm font-medium text-gray-800">{report.last_seen_date || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Report Date</p>
                      <p className="text-sm font-medium text-gray-800">{report.created_at}</p>
                    </div>
                  </div>
                  {report.description && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Description</p>
                      <p className="text-sm font-medium text-gray-800 mt-1">{report.description}</p>
                    </div>
                  )}
                  {report.notes && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Notes</p>
                      <p className="text-sm font-medium text-gray-800 mt-1">{report.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {report.status === 'active' && (
                <div className="flex gap-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition">
                    Mark as Resolved
                  </button>
                  <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition">
                    Close Report
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
