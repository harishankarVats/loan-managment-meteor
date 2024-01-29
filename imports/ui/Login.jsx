import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.error(error.reason);
      } else {
        // Login successful, redirect or handle success as needed
        console.log('Login successful');
      }
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
