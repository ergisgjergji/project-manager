import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';

function App() {
  return (
    <div>
      <Header/>
      <Dashboard/>
    </div>
  );
}

export default App;