import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkTokenExpiration, forbiddenAccess } from '../../middlewares/middleware';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginFunc = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.BACKEND_SERVER}/api/auth/psikotest/login`, {
      email: email,
      password: password
    })
      .then((response) => {
        localStorage.setItem('token', response.data.access_token)
        alert(response.data.message)
        navigate('/dashboard')
      })
      .catch((error) => {
        if(error.response.status == 401){
          return alert(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  }

  useEffect(() => {
    checkTokenExpiration();
    forbiddenAccess();
  }, []);

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