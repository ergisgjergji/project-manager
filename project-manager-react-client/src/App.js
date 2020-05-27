import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import AddProject from './components/Project/AddProject';

function App() {
  return (
    <Router>
      <Header/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/addProject" component={AddProject}/>
    </Router>
  );
}

export default App;
