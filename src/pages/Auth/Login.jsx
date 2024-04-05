import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkTokenExpiration, forbiddenAccess } from '../../middlewares/middleware';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameReg, setNameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [schoolReg, setSchoolReg] = useState('');
  const [phoneReg, setPhoneReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [passwordConfReg, setPasswordConfReg] = useState('');

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
        if (error.response.status == 401) {
          return alert(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  }

  const registerFunc = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.BACKEND_SERVER}/api/auth/psikotest/register`, {
      name: nameReg,
      school: schoolReg,
      email: emailReg,
      phone: phoneReg,
      password: passwordReg,
      password_confirmation: passwordConfReg
    })
      .then((response) => {
        alert(response.data.message)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    checkTokenExpiration();
    forbiddenAccess();
  }, []);

  return (
    <section>
      <h2>Login Disini</h2>
      <form onSubmit={loginFunc}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
      <hr />
      <h2>Daftar Disini</h2>
      <form onSubmit={registerFunc}>
        <input type="text" value={nameReg} onChange={(e) => setNameReg(e.target.value)} placeholder='Name' />
        <input type="text" value={schoolReg} onChange={(e) => setSchoolReg(e.target.value)} placeholder='school' />
        <input type="email" value={emailReg} onChange={(e) => setEmailReg(e.target.value)} placeholder='email' />
        <input type="number" value={phoneReg} onChange={(e) => setPhoneReg(e.target.value)} placeholder='phone' />
        <input type="password" value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)} placeholder='Password' />
        <input type="password" value={passwordConfReg} onChange={(e) => setPasswordConfReg(e.target.value)} placeholder='Konfirmasi Password' />
        <button type='submit'>Daftar</button>
      </form>
    </section>
  )
}

export default Login