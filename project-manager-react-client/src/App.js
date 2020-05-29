import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './css/react-confirm-alert.css';

import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/addProject" component={AddProject}/>
        <Route exact path="/updateProject/:code" component={UpdateProject}/>
      </Router>
    </Provider>
  );
}

export default App;
