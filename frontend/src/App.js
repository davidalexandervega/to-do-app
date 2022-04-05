import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import './styles.scss'

import X from './X.js'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<X />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
