import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './redux/store.js';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import App from './App.jsx'
import Home from './pages/Home.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import LoginCheck from './pages/Auth/LoginCheck.jsx';
import Profile from './pages/User/Profile.jsx';

import AdminRoute from './pages/Admin/Adminroute.jsx';
import CreateMovie from './pages/Admin/CreateMovie.jsx';
import MoviesList from './pages/Admin/MoviesList.jsx';
import UpdateMovie from './pages/Admin/UpdateMovie.jsx';
import MovieDetails from "./pages/Movies/MovieDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index={true} path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/movies" element={<MoviesList />} />
      <Route path="" element={<LoginCheck />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="" element={<AdminRoute />} >
        <Route path="/admin/movies/create" element={<CreateMovie />} />
        <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);