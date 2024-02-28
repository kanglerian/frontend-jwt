import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { increment, decrement } from '../functions/auth';
import { useNavigate, Link } from 'react-router-dom';
import { refreshToken } from '../middlewares/refreshToken'
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const count = useSelector(state => state.counter.value);

  const logoutFunc = async () => {
    await axios.get(`${process.env.BACKEND_SERVER}/auth/token`)
      .then(async (response) => {
        await axios.delete(`${process.env.BACKEND_SERVER}/auth/logout`, {
          headers: {
            Authorization: response.data.data.token,
          },
          withCredentials: true
        })
          .then(() => {
            decrement()
            localStorage.removeItem('token');
            navigate('/')
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        localStorage.removeItem('token');
        console.log(error);
      });
  }

  useEffect(() => {
    if (!count) {
      return navigate('/');
    }
    refreshToken(dispatch, increment, navigate);
  }, []);

  return (
    <div>
      <div style={{ width: 10 }}>
        {count}
      </div>
      <Link to={`/users`}>users</Link>
      <h2>Dashboard</h2>
      <button type='button' onClick={logoutFunc}>Logout</button>
    </div>
  )
}

export default Dashboard