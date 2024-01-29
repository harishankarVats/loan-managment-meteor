import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
//import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('borrower'); // Default role
  //const navigate = useNavigate();

  const handleRegister = () => {
    const user = { email, password, profile: { role } };

    Accounts.createUser(user, (error) => {
      if (error) {
        console.error(error.reason);
      } else {
        // Registration successful, redirect or handle success as needed
        console.log('Registration successful');
        //navigate('/Login');
      }
    });
  };

  return (
    <div>
      <h2>Register</h2>
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
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="borrower">Borrower</option>
            <option value="lender">Lender</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

//export default Register;

