import axios from "axios";

const refreshToken = async (dispatch, increment, navigate) => {
  await axios.get(`${process.env.BACKEND_SERVER}/auth/token`)
    .then((response) => {
      dispatch(increment(response.data.data.token));
    })
    .catch((error) => {
      localStorage.removeItem('token');
      navigate('/');
    })
}

export { refreshToken };