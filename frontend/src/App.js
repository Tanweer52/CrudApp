
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddressList from './Components/AddressList';
import AddAddress from './Components/AddAddress';

function App() {
  return (
    <Router>
      <div className='container container-fluid min-vh-100 d-flex flex-column'>
        <Routes>
          <Route exact path="/" element={<AddressList />} />
          <Route exact path="/add" element={<AddAddress />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
