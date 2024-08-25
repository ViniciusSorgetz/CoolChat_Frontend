import { Outlet } from 'react-router-dom';
import UserProvider from './contexts/user';
import { useContext } from 'react';
import './App.css'

import Navbar from './components/navbar/Navbar';
import LittleBalls from './assets/LittleBalls.svg';

const App = () => {
  return (
    <UserProvider>
      <div className="main">
        <Navbar/>
        <div className="container">
          <div className="container-header">
            <img src={LittleBalls} style={{scale: "0.7"}}/>
          </div>
          <Outlet/>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
