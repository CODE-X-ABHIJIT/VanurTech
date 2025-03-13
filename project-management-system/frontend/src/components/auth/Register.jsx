import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
    const { register } = useContext(AuthContext);
    const history = useHistory();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        register(formData).then(() => {
            history.push('/login');
        }).catch(err => {
            console.error(err);
        });
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={onChange} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={onChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={onChange} required />
                </div>
                <div>
                    <label>Role</label>
                    <select name="role" value={formData.role} onChange={onChange}>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
