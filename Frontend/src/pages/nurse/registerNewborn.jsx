// src/pages/nurse/RegisterNewborn.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NurseLayout from "../../components/nurseLayout";
import { childService } from "../../api/child";

export default function RegisterNewborn() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    childName: "", estimatedAge: "", gender: "", foundLocation: "", dateFound: "", notes: "",
  });
  const [errors, setErrors] = useState({});

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.childName.trim()) e.childName = "Required";
    if (!form.estimatedAge.trim()) e.estimatedAge = "Required";
    if (!form.gender) e.gender = "Required";
    if (!form.foundLocation.trim()) e.foundLocation = "Required";
    if (!form.dateFound) e.dateFound = "Required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('name', form.childName);
        formData.append('estimated_age', form.estimatedAge);
        formData.append('gender', form.gender);
        formData.append('found_location', form.foundLocation);
        formData.append('date_found', form.dateFound);
        formData.append('notes', form.notes);
        if (photo) formData.append('photo', photo);

        await childService.registerChild(formData);
        setSuccess(true);
      } catch (err) {
        setErrors({ general: err.response?.data?.message || 'Failed to register child' });
      } finally {
        setLoading(false);
      }
    }
  };

  if (success) {
    return (
      <NurseLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-100">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Thank You</h2>
            <p className="text-gray-400 text-sm">Child Registered Successfully</p>
            <button onClick={() => navigate("/nurse/children/list")}
              className="mt-2 bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition">
              View Children List
            </button>
          </div>
        </div>
      </NurseLayout>
    );
  }

  const inputClass = k =>
    `w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition text-gray-700 placeholder-gray-300
    ${errors[k] ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-400"}`;

  return (
    <NurseLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm">+</span>
          Register Newborn
        </h1>
        <p className="text-gray-400 text-sm mt-0.5">Add A New Child Record To The System</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left — Photo */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Child Photo</h2>
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center gap-4 bg-gray-50">
            {photoPreview ? (
              <img src={photoPreview} alt="Child" className="w-40 h-40 object-cover rounded-xl" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#93C5FD" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
            <p className="text-sm font-medium text-gray-600">Upload Child Photo</p>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            <button onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition w-full justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              Upload Photo
            </button>
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-gray-200" /><span className="text-xs text-gray-400">Or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition w-full justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Scan Fingerprint
            </button>
          </div>
        </div>

        {/* Right — Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Child Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Child Name*</label>
              <input value={form.childName} onChange={set("childName")} className={inputClass("childName")} placeholder="" />
              {errors.childName && <p className="text-red-500 text-xs mt-1">⚠ {errors.childName}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Estimated Age*</label>
              <input value={form.estimatedAge} onChange={set("estimatedAge")} className={inputClass("estimatedAge")} placeholder="" />
              {errors.estimatedAge && <p className="text-red-500 text-xs mt-1">⚠ {errors.estimatedAge}</p>}
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Gender*</label>
              <div className="relative">
                <select value={form.gender} onChange={set("gender")}
                  className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none appearance-none bg-white
                    ${errors.gender ? "border-red-400 bg-red-50 text-gray-400" : "border-gray-200 focus:border-blue-400 text-gray-700"}`}>
                  <option value="">Male/Female</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Found Location*</label>
              <input value={form.foundLocation} onChange={set("foundLocation")} className={inputClass("foundLocation")} placeholder="" />
              {errors.foundLocation && <p className="text-red-500 text-xs mt-1">⚠ {errors.foundLocation}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Date Found*</label>
              <div className="relative">
                <input type="date" value={form.dateFound} onChange={set("dateFound")}
                  className={inputClass("dateFound") + " pr-10"} />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Notes</label>
              <textarea value={form.notes} onChange={set("notes")} rows={4}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none transition text-gray-700 placeholder-gray-300 focus:border-blue-400 resize-none"
                placeholder="Additional Details (Optional)" />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => navigate("/nurse/dashboard")}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold px-5 py-2.5 rounded-xl transition">
              <span className="w-5 h-5 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">✕</span>
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-md shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">+</span>
              {loading ? 'Registering...' : 'Register Child'}
            </button>
          </div>
          {errors.general && (
            <p className="text-red-500 text-xs mt-2 text-center">⚠ {errors.general}</p>
          )}
        </div>
      </div>
    </NurseLayout>
  );
}