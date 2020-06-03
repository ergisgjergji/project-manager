import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './css/react-confirm-alert.css';

import Header from './components/Layout/Header';
import LandingPage from './components/Layout/LandingPage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';

import jwt_decode from 'jwt-decode';
import headersConfig from './redux/securityUtils/headersConfig';
import { SET_USER } from './redux/actions/types.js';
import { logout } from './redux/actions/authActions';

const checkStorage = () => {

  const token = localStorage.getItem('token');
  const currentTime = Date.now()/1000;
  console.log("app");
  

  if(token) {
    const decoded = jwt_decode(token);
    if(decoded.exp < currentTime) {
      // handle logout
      store.dispatch(logout());
      window.location.href = "/";
    }
    else {
      headersConfig(token);
      store.dispatch({
          type: SET_USER,
          payload: decoded
      });
    }
  }
}

checkStorage();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        {
          // PUBLIC Routes
        }
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        {
          // PRIVATE Routes
        }
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/addProject" component={AddProject}/>
        <Route exact path="/updateProject/:code" component={UpdateProject}/>
        <Route exact path="/projectBoard/:code" component={ProjectBoard}/>
        <Route exact path="/addProjectTask/:code" component={AddProjectTask}/>
        <Route exact path="/updateProjectTask/:code/:sequence" component={UpdateProjectTask}/>
      </Router>
    </Provider>
  );
}

export default App;
