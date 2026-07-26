import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import FAQ from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";

// User Pages
import UserDashboard from "./pages/UserDashboard";
import ReportForm from "./pages/ReportForm";

import ReportDetail from "./pages/ReportDetail";

// Admin Pages
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReports from "./pages/admin/AllReports";
import HeatMap from "./pages/admin/HeatMap";
import ClusteringPage from "./pages/admin/ClusteringPage";
import UsersManagement from "./pages/admin/UsersManagement";
import Analytics from "./pages/admin/Analytics";
import ContactsList from "./pages/admin/ContactsList"

// Routes Protection
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#041626] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        
    
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin/reports/:id" element={<ReportDetail />} />
        </Route>

    
        <Route element={<AdminRoute />}>
          <Route path="/admin-dashboard" element={<AdminLayout />}>
         
            <Route index element={<AdminDashboard />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="map" element={<HeatMap />} />
            <Route path="clustering" element={<ClusteringPage />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="reports/:id" element={<ReportDetail />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="contacts" element={<ContactsList />} />
          </Route>
        </Route>


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;