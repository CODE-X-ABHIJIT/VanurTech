import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/customer/Layout';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // First get the customer ID for this user
        const customerRes = await api.get('/customers');
        const customer = customerRes.data.find(c => c.user === user._id);
        
        if (customer) {
          // Then get projects for this customer
          const projectsRes = await api.get(`/projects/customer/${customer._id}`);
          setProjects(projectsRes.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchProjects();
    }
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>
      
      {projects.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500">No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">{project.name}</h2>
              <div className="mt-2">
                <span className={
                  project.status === 'Completed' 
                    ? 'bg-green-100 text-green-800 px-2 py-1 rounded text-sm' 
                    : project.status === 'In Progress' 
                      ? 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm'
                      : 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm'
                }>
                  {project.status}
                </span>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${project.currentProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{project.currentProgress}% Complete</p>
              </div>
              <Link 
                to={`/projects/${project._id}`}
                className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
