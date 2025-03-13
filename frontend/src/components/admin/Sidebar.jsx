import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaProjectDiagram, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'bg-indigo-800' : '';
  };

  return (
    <div className="h-screen bg-indigo-900 text-white w-64 flex-shrink-0">
      <div className="p-4 font-bold text-xl border-b border-indigo-800">
        Admin Dashboard
      </div>
      <nav className="mt-5">
        <ul>
          <li className={`p-4 hover:bg-indigo-800 ${isActive('/admin')}`}>
            <Link to="/admin" className="flex items-center">
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li className={`p-4 hover:bg-indigo-800 ${isActive('/admin/customers')}`}>
            <Link to="/admin/customers" className="flex items-center">
              <FaUsers className="mr-3" />
              Customers
            </Link>
          </li>
          <li className={`p-4 hover:bg-indigo-800 ${isActive('/admin/projects')}`}>
            <Link to="/admin/projects" className="flex items-center">
              <FaProjectDiagram className="mr-3" />
              Projects
            </Link>
          </li>
          <li className="p-4 hover:bg-indigo-800 mt-auto">
            <button onClick={logout} className="flex items-center w-full text-left">
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
