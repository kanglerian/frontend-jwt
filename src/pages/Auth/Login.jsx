import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { increment } from '../../functions/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const loginFunc = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.BACKEND_SERVER}/auth/login`, {
      email: email,
      password: password
    })
      .then((response) => {
        dispatch(increment(response.data.data.token))
        navigate('/dashboard')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if(token){
      navigate('/dashboard');
    }
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