import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkTokenExpiration } from '../middlewares/middleware';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [applicant, setApplicant] = useState({});

  const getUser = async () => {
    checkTokenExpiration();
    const token = localStorage.getItem('token');
    await axios.get(`${process.env.BACKEND_SERVER}/api/auth/psikotest/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data)
        setUser(response.data.user);
        setApplicant(response.data.applicant);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          return navigate('/');
        } else {
          console.log(error.response.data.message);
        }
      });
  }

  const logoutFunc = async (e) => {
    e.preventDefault();
    checkTokenExpiration();
    const token = localStorage.getItem('token');
    await axios.get(`${process.env.BACKEND_SERVER}/api/auth/psikotest/logout`, {
      headers: {
        Authorization: `bearer ${token}`
      }
    })
      .then((response) => {
        alert(response.data.message);
        localStorage.removeItem('token');
        navigate('/')
      })
      .catch((error) => {
        if (error.response.status == 401) {
          return navigate('/');
        } else {
          console.log(error.response.data.message);
        }
      });
  }

  useEffect(() => {
    checkTokenExpiration();
    getUser();
  }, []);

  return (
    <div>
      <p>Selamat datang, {user.name} | PMB {applicant.pmb}</p>
      <button onClick={logoutFunc} type='button'>Logout</button>
    </div>
  )
}

export default Dashboard