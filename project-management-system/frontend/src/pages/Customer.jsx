import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from '../utils/axios';
import { Pie } from 'react-chartjs-2';

const Customer = () => {
    const { user, logout } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const res = await axios.get('/projects/customer', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProjects(res.data);
    };

    const renderPieChart = (progress) => {
        const data = {
            labels: ['Completed', 'Remaining'],
            datasets: [
                {
                    data: [progress, 100 - progress],
                    backgroundColor: ['#4caf50', '#f44336'],
                    hoverBackgroundColor: ['#66bb6a', '#ef5350'],
                },
            ],
        };
        return <Pie data={data} />;
    };

    return (
        <div>
            <header>
                <h1>Customer Dashboard</h1>
                <button onClick={logout}>Logout</button>
            </header>

            <section>
                <h2>Your Projects</h2>
                {projects.map(project => (
                    <div key={project._id} className="project">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="progress-chart">
                            {renderPieChart(project.progress)}
                        </div>
                        <div className="project-media">
                            <h4>Images</h4>
                            <div className="images">
                                {project.images.map((image, index) => (
                                    <img key={index} src={image} alt={`Project Image ${index + 1}`} />
                                ))}
                            </div>
                            <h4>Videos</h4>
                            <div className="videos">
                                {project.videos.map((video, index) => (
                                    <video key={index} controls>
                                        <source src={video} type="video/mp4" />
                                    </video>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Customer;
