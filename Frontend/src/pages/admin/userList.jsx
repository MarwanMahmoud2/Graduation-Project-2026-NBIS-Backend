// src/pages/admin/UserList.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";

const initialUsers = [
  { id: 1, name: "Ahmed Ali", email: "Ahmed@Gmail.Com", role: "Admin", status: "Active", lastLogin: "2 Hours Ago", avatar: "A" },
  { id: 2, name: "Sara Ahmed", email: "Sara@Gmail.Com", role: "Nurse", status: "In Active", lastLogin: "1 Day Ago", avatar: "S" },
  { id: 3, name: "Hala Ahmed", email: "Hala@Gmail.Com", role: "Police", status: "In Active", lastLogin: "2 Day Ago", avatar: "H" },
  { id: 4, name: "Hana Ahmed", email: "Hana@Gmail.Com", role: "Parent", status: "In Active", lastLogin: "3 Day Ago", avatar: "H" },
  { id: 5, name: "Magdy Ali", email: "Magdy@Gmail.Com", role: "Nurse", status: "Active", lastLogin: "4 Day Ago", avatar: "M" },
  { id: 6, name: "Mohamed Ali", email: "Mohamed@Gmail.Com", role: "Police", status: "Active", lastLogin: "5 Day Ago", avatar: "M" },
];

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setUsers(u => u.filter(x => x.id !== id));
    setDeleteModal(null);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-72">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            placeholder="Search Users..." />
        </div>
        <button onClick={() => navigate("/admin/members/add")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-100">
          <span className="text-lg leading-none">+</span> Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {["Name", "Email", "Role", "Status", "Last Login", "Actions"].map(h => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {user.avatar}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{user.role}</td>
                <td className="px-6 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                    ${user.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-gray-400">{user.lastLogin}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <button className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                    <button onClick={() => setDeleteModal(user)}
                      className="text-xs text-red-400 hover:underline flex items-center gap-1">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.18)" }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-center">
            <h3 className="font-bold text-gray-800 text-lg mb-1">Delete User ?</h3>
            <p className="text-gray-400 text-sm mb-5">Do You Want To Permanently Delete This User?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => handleDelete(deleteModal.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-6 py-2 rounded-xl transition">
                Delete
              </button>
              <button onClick={() => setDeleteModal(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold px-6 py-2 rounded-xl transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}