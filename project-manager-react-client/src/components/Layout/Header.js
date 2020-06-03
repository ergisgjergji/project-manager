import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './../../redux/actions/authActions';

class Header extends Component {

    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }

    logout = () => {
        this.props.logout();
        window.location.href = "/";
    }

    render() {

        const { user, isAuthenticated } = this.props.authStore;

        const logged_in_menu = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">
                            Dashboard
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">
                            <i className="fa fa-user-circle mr-1"> Welcome, {user.full_name}</i>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/logout" className="nav-link" onClick={this.logout.bind(this)}> Logout </Link>
                    </li>
                </ul>
            </div>
        );
        const logged_out_menu = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/register" className="nav-link"> Sign Up </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link"> Login </Link>
                    </li>
                </ul>
            </div>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand"> Project Management Tool </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>

                    {
                        isAuthenticated ? logged_in_menu : logged_out_menu
                    }

                </div>
            </nav>
        )
    }
};

Header.propTypes = {
    authStore: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    authStore: state.authStore
});

export default connect(mapStateToProps, { logout })(Header);
