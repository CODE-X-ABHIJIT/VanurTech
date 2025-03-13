import React, { createContext, useReducer } from 'react';
import axios from '../utils/axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user
            };
        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const register = async (formData) => {
        try {
            const res = await axios.post('/auth/register', formData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR', payload: err.response.data.msg });
        }
    };

    const login = async (formData) => {
        try {
            const res = await axios.post('/auth/login', formData);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR', payload: err.response.data.msg });
        }
    };

    const logout = () => dispatch({ type: 'LOGOUT' });

    return (
        <AuthContext.Provider value={{
            ...state,
            register,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
