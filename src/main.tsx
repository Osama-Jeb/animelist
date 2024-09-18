import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/error-page.tsx';
import AniList from './pages/AniList.tsx';
import SingleAnime from './pages/SingleAnime.tsx';
import Singers from './pages/Singers.tsx';
import AniMovies from './pages/AniMovies.tsx';
import Root from './routes/root.tsx';
import InfoProvider from './context/InfoProviders.tsx';
import AuthProvider from './context/AuthContext.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/animes",
        element: <AniList />,
      },
      {
        path: "animes/:id",
        element: <SingleAnime />,
      },
      {
        path: "/singers",
        element: <Singers />,
      },
      {
        path: "/animeMovies",
        element: <AniMovies />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <InfoProvider>
        <RouterProvider router={router} />
      </InfoProvider>
    </AuthProvider>
  </React.StrictMode>,
)
