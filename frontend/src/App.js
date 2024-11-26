
import './App.css';
import {BrowserRouter as Router,Route,Routes, BrowserRouter} from 'react-router-dom'
import { useState,useEffect } from 'react';
import Register from './pages/register';
import User from "./pages/user"
import Login from "./pages/login"; 
import UserProfile from './pages/userProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={< User/>}/>
        <Route path="/login" element={< Login/>}/>
        <Route path="/profileUpdate" element={< UserProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
