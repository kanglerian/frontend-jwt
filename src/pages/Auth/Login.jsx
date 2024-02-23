import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginFunc = (e) => {
    e.preventDefault();

    let data = {
      email: email,
      password: password
    }
    fetch(`http://localhost:3031/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    .then((response) => {
      if(!response.ok){
        alert('Network error.')
      }
      return response.json();
    })
    .then(() => {
      navigate("/dashboard")
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <section>
      <form onSubmit={loginFunc}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
    </section>
  )
}

export default Login