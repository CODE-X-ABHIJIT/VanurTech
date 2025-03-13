import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const history = useHistory();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(formData).then(() => {
            history.push('/customer');
        }).catch(err => {
            console.error(err);
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={onChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={onChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
