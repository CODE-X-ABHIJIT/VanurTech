import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from '../utils/axios';

const Admin = () => {
    const { user, logout } = useContext(AuthContext);
    const [customers, setCustomers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        squareFeet: '',
        contactNumber: '',
        email: '',
        siteLocation: '',
        buildingType: 'Commercial'
    });
    const [projectData, setProjectData] = useState({
        customerId: '',
        title: '',
        description: '',
        status: 'Not Started',
        progress: 0,
        startDate: '',
        endDate: '',
        images: [],
        videos: []
    });

    useEffect(() => {
        fetchCustomers();
        fetchProjects();
    }, []);

    const fetchCustomers = async () => {
        const res = await axios.get('/customers');
        setCustomers(res.data);
    };

    const fetchProjects = async () => {
        const res = await axios.get('/projects');
        setProjects(res.data);
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onProjectChange = e => setProjectData({ ...projectData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('/customers/add', formData);
        setCustomers([...customers, res.data]);
    };

    const onProjectSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('/projects/add', projectData);
        setProjects([...projects, res.data]);
    };

    const onFileChange = e => {
        const files = Array.from(e.target.files);
        setProjectData({ ...projectData, [e.target.name]: files });
    };

    const updateProjectStatus = async (projectId, status, progress) => {
        const res = await axios.put('/projects/update', { projectId, status, progress });
        const updatedProjects = projects.map(project => project._id === projectId ? res.data : project);
        setProjects(updatedProjects);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={logout}>Logout</button>

            <h2>Add New Customer</h2>
            <form onSubmit={onSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={onChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={onChange} required />
                <input type="number" name="squareFeet" placeholder="Square Feet" value={formData.squareFeet} onChange={onChange} required />
                <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={onChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={onChange} required />
                <input type="text" name="siteLocation" placeholder="Site Location" value={formData.siteLocation} onChange={onChange} required />
                <select name="buildingType" value={formData.buildingType} onChange={onChange}>
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                </select>
                <button type="submit">Add Customer</button>
            </form>

            <h2>Create New Project</h2>
            <form onSubmit={onProjectSubmit}>
                <select name="customerId" value={projectData.customerId} onChange={onProjectChange} required>
                    <option value="">Select Customer</option>
                    {customers.map(customer => (
                        <option key={customer._id} value={customer._id}>{customer.name}</option>
                    ))}
                </select>
                <input type="text" name="title" placeholder="Project Title" value={projectData.title} onChange={onProjectChange} required />
                <textarea name="description" placeholder="Project Description" value={projectData.description} onChange={onProjectChange} required></textarea>
                <select name="status" value={projectData.status} onChange={onProjectChange}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input type="number" name="progress" placeholder="Progress (%)" value={projectData.progress} onChange={onProjectChange} required />
                <input type="date" name="startDate" value={projectData.startDate} onChange={onProjectChange} required />
                <input type="date" name="endDate" value={projectData.endDate} onChange={onProjectChange} required />
                <input type="file" name="images" onChange={onFileChange} multiple />
                <input type="file" name="videos" onChange={onFileChange} multiple />
                <button type="submit">Create Project</button>
            </form>

            <h2>Update Project Status</h2>
            {projects.map(project => (
                <div key={project._id}>
                    <h3>{project.title}</h3>
                    <p>Status: {project.status}</p>
                    <p>Progress: {project.progress}%</p>
                    <select onChange={e => updateProjectStatus(project._id, e.target.value, project.progress)}>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <input type="number" value={project.progress} onChange={e => updateProjectStatus(project._id, project.status, e.target.value)} />
                </div>
            ))}

            <h2>Customer Dashboard</h2>
            {customers.map(customer => (
                <div key={customer._id}>
                    <h3>{customer.name}</h3>
                    <p>Address: {customer.address}</p>
                    <p>Square Feet: {customer.squareFeet}</p>
                    <p>Contact Number: {customer.contactNumber}</p>
                    <p>Email: {customer.email}</p>
                    <p>Site Location: {customer.siteLocation}</p>
                    <p>Building Type: {customer.buildingType}</p>
                    <h4>Projects:</h4>
                    <ul>
                        {customer.projects.map(projectId => {
                            const project = projects.find(p => p._id === projectId);
                            return <li key={project._id}>{project.title}</li>
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Admin;
