import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../functions/auth';
import { useNavigate, Link } from 'react-router-dom';
import { refreshToken } from '../middlewares/refreshToken'
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const count = useSelector(state => state.counter.value);

  const getUser = async () => {
    await axios.get(`${process.env.BACKEND_SERVER}/users`, {
      headers: {
        Authorization: count
      },
      withCredentials: true
    })
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (!count) {
      return navigate('/');
    }
    getUser();
    refreshToken(dispatch, increment, navigate);
  }, []);

  return (
    <div>
    <div style={{ width: 50 }}>
      {count}
    </div>
      <Link to={`/dashboard`}>dashboard</Link>
      <h2>Users</h2>
      <ul>
        {
          users.map((user) =>
            <li key={user.id}>{user.name}</li>
          )
        }
      </ul>
    </div>
  )
}

export default Users