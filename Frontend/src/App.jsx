import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Welcome from "./pages/welcome";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgotpassword";
import AdminDashboard from "./pages/admin/adminDashboard";
import UserList from "./pages/admin/userList";
import AddUser from "./pages/admin/addUser";
import Profile from "./pages/admin/profile";
import Settings from "./pages/admin/settings";
import NurseDashboard from "./pages/nurse/nurseDashboard";
import RegisterNewborn from "./pages/nurse/registerNewborn";
import ChildrenList from "./pages/nurse/childrenList";
import PoliceDashboard from "./pages/police/policeDashboard";
import PoliceVerificationLogs from "./pages/police/policeVerificationLogs";
import ParentDashboard from "./pages/parent/ParentDashboard";
import ParentVerification from "./pages/parent/ParentVerification";
import MyChildren from "./pages/parent/MyChildren";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/members/list" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/members/add" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AddUser />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/profile" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nurse/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['nurse', 'admin']}>
                <NurseDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nurse/children/list" 
            element={
              <ProtectedRoute allowedRoles={['nurse', 'admin']}>
                <ChildrenList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nurse/children/register" 
            element={
              <ProtectedRoute allowedRoles={['nurse', 'admin']}>
                <RegisterNewborn />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/police/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['police', 'admin']}>
                <PoliceDashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/police/verification-logs" 
            element={
              <ProtectedRoute allowedRoles={['police', 'admin']}>
                <PoliceVerificationLogs />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/parent/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <ParentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/verification" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <ParentVerification />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/children" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <MyChildren />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
