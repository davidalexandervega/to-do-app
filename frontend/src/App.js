import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import './global.scss'

import Header from "./components/Header";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";

const App = () => {

  return (
    <BrowserRouter>
    <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
