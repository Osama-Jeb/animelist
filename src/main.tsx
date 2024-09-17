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

const router = createBrowserRouter([
  {
    path: "/",
    element: <AniList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "anime/:id",
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
