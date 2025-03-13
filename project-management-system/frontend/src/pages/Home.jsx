import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <header>
                <h1>Project Management System</h1>
            </header>
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
            <section>
                <h2>Welcome to the Project Management System</h2>
                <p>
                    This system allows the admin to manage customers and update project progress. Customers can log in to track the status of their projects.
                </p>
                <div className="home-buttons">
                    <Link to="/login" className="button">Admin Login</Link>
                    <Link to="/customer" className="button">Customer Dashboard</Link>
                </div>
            </section>
            <footer>
                <p>&copy; 2025 Project Management System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
