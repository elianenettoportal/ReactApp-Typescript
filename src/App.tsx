import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import UserReporitories from './components/UserRepositoryList';

function App() {
    return (
      <>
          <Routes>
            <Route path="/users" element={<UserList/>} />
            <Route path="/users/:username/details" element={<UserDetails/>} />
            <Route path="/users/:username/repos" element={<UserReporitories/>} />
         </Routes>
      </>
    );
}

export default App;
