import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './../../redux/actions/authActions';

class Header extends Component {

    constructor(){
        super();

        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    logout = () => {
        this.props.logout();
        window.location.href = "/";
    }

    render() {

        const { user, isAuthenticated } = this.props.authStore;

        const logged_in_menu = (
            <>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link to="/dashboard" className="nav-link">
                            Dashboard
                        </Link>
                    </NavItem>
                </Nav>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/dashboard" className="nav-link">
                            <i className="fa fa-user-circle mr-1"> Welcome, {user.full_name}</i>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logout" className="nav-link" onClick={this.logout.bind(this)}> Logout </Link>
                    </NavItem>
                </Nav>
            </>
        );
        const logged_out_menu = (
            <>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/register" className="nav-link"> Sign Up </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/login" className="nav-link"> Login </Link>
                    </NavItem>
                </Nav>
            </>
        );

        return (
            <Navbar color="primary" dark expand="sm" className="mb-4">
                <Container>
                    <Link to="/" className="navbar-brand"> Project Management Tool </Link>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {
                            isAuthenticated ? logged_in_menu : logged_out_menu
                        }
                    </Collapse>
                </Container>
            </Navbar>
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
