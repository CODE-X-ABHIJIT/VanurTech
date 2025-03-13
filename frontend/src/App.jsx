import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Customer from './pages/Customer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { AuthProvider } from './context/AuthState';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/admin" component={Admin} />
                        <Route path="/customer" component={Customer} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
