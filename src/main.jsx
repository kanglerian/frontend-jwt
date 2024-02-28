import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import axios from 'axios'
axios.defaults.withCredentials = true;

import store from './app/store';
import { Provider } from 'react-redux';

import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/users",
    element: <Users/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
