import React from 'react';
import Register from './components/register';
import Login from './components/Login';
import {  Route, Link } from 'react-router-dom';
import './app.css';


export default function App() {
  return (
    <div className="App"> 
      <Navigation />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" render={() => <Login  />} />
    </div>
  );
}


const Navigation = () => {
  return (
    <div className="Navigation" style={{ display: 'flex', gap: '16px' }}>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};