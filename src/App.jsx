import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<ProductsList />} />
    </Routes>
  );
}

export default App;
