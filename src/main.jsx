import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate, Link } from 'react-router-dom';
import Home from './routes/home/Home';
import ChatList from './routes/chat-list/ChatList';
import CreateChat from './routes/create-chat/CreateChat';
import Chat from './routes/chat/Chat';
import Register from './routes/register/Register';
import Profile from './routes/profile/Profile';

const router = createBrowserRouter([{
  element: <App/>,
  children: [
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/chat-list",
      element: <ChatList/>
    },
    {
      path: "/chat/:number",
      element: <Chat/>
    },
    {
      path: "/create-chat",
      element: <CreateChat/>
    },
    {
      path: "*",
      element: <Link to={"/home"}>Home</Link>
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/profile",
      element: <Profile/>
    },
  ]  
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App/>
  </RouterProvider>
)
