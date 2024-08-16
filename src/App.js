import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Leads from './Pages/Leads/Leads';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/user-details" element={<Leads />} />
      </Routes>
    </Router>
  );
}

export default App;
