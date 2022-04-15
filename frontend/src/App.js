import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import './global.scss'

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";

const App = () => {

  return (
    <BrowserRouter>
    <Header />
    <div id='page'>
      <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
