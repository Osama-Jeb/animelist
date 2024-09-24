import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/error-page.tsx';
import AniList from './pages/AniList.tsx';
import SingleAnime from './pages/SingleAnime.tsx';
import Root from './routes/root.tsx';
import InfoProvider from './context/InfoProviders.tsx';
import AuthProvider from './context/AuthContext.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import BookmarkedAnime from './pages/BookmarkedAnimes.tsx';
import Statistics from './pages/Statistics.tsx';
import Profile from './pages/Profile.tsx';
import MangaList from './pages/MangaList.tsx';
import VoiceActors from './pages/VoiceActors.tsx';
import SingleVoiceActor from './pages/SingleVoiceActors.tsx';
import Characters from './pages/Characters.tsx';
import SingleManga from './pages/SingleManga.tsx';
import SingleCharacter from './pages/SingleCharacter.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/anime",
        element: <AniList />,
      },
      {
        path: "/anime/:id",
        element: <SingleAnime />,
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/bookmarkedAnime",
        element: <BookmarkedAnime />
      },
      {
        path: "/statistics",
        element: <Statistics />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/manga",
        element: <MangaList />
      },
      {
        path: "/manga/:id",
        element: <SingleManga />
      },
      {
        path: "/va",
        element: <VoiceActors />
      },
      {
        path: "/va/:id",
        element: <SingleVoiceActor />
      },
      {
        path : "/characters",
        element: <Characters />
      },
      {
        path:"/characters/:id",
        element: <SingleCharacter />
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
