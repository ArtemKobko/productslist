import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <Routes>
      <Route path="/productslist" element={<ProductsList />} />
    </Routes>
  );
}

export default App;
