import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import CustomerList from './pages/admin/CustomerList';
import CustomerCreate from './pages/admin/CustomerCreate';
import CustomerEdit from './pages/admin/CustomerEdit';
import ProjectList from './pages/admin/ProjectList';
import ProjectCreate from './pages/admin/ProjectCreate';
import ProjectEdit from './pages/admin/ProjectEdit';
import ProjectDetails from './pages/admin/ProjectDetails';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import CustomerProjectDetails from './pages/customer/ProjectDetails';

// Components
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';
import CustomerRoute from './components/common/CustomerRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/customers" element={<AdminRoute><CustomerList /></AdminRoute>} />
          <Route path="/admin/customers/create" element={<AdminRoute><CustomerCreate /></AdminRoute>} />
          <Route path="/admin/customers/:id/edit" element={<AdminRoute><CustomerEdit /></AdminRoute>} />
          <Route path="/admin/projects" element={<AdminRoute><ProjectList /></AdminRoute>} />
          <Route path="/admin/projects/create" element={<AdminRoute><ProjectCreate /></AdminRoute>} />
          <Route path="/admin/projects/:id/edit" element={<AdminRoute><ProjectEdit /></AdminRoute>} />
          <Route path="/admin/projects/:id" element={<AdminRoute><ProjectDetails /></AdminRoute>} />
          
          {/* Customer Routes */}
          <Route path="/dashboard" element={<CustomerRoute><CustomerDashboard /></CustomerRoute>} />
          <Route path="/projects/:id" element={<CustomerRoute><CustomerProjectDetails /></CustomerRoute>} />
          
          {/* Default Routes */}
          <Route path="/" element={<PrivateRoute><CustomerDashboard /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
