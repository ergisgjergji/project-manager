import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './css/react-confirm-alert.css';

import { ToastContainer } from 'react-toastify';

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

import { loadUser } from './redux/actions/authActions';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <>
        <Header/>
        {
          // PUBLIC Routes
        }
        <PublicRoute exact path="/" component={LandingPage}/>
        <PublicRoute exact path="/register" component={Register}/>
        <PublicRoute exact path="/login" component={Login}/>

        {
          // PRIVATE Routes
        }
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/addProject" component={AddProject}/>
          <PrivateRoute exact path="/updateProject/:code" component={UpdateProject}/>
          <PrivateRoute exact path="/projectBoard/:code" component={ProjectBoard}/>
          <PrivateRoute exact path="/addProjectTask/:code" component={AddProjectTask}/>
          <PrivateRoute exact path="/updateProjectTask/:code/:sequence" component={UpdateProjectTask}/>
        </Switch>

        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      </>
    );
  }
}

export default App;
