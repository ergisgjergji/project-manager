import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from './../../redux/actions/authActions';
import { clearErrors } from './../../redux/actions/errorActions';
import classnames from 'classnames';

class Login extends Component {

    constructor(){
        super();

        this.state = {
            username: "",
            password: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if(this.state.errors != nextProps.errorStore)
            this.setState({ errors: nextProps.errorStore });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        // Reset the errors (in component state && in redux state)
        this.setState({ errors: {} });
        this.props.clearErrors();

        const { username, password } = this.state;
        const loginRequest = { username, password };
        this.props.login(loginRequest);
    }

    render() {

        const { username, password, errors } = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">

                        <div className="col-10 col-md-6 m-auto">

                            <h1 className="display-4 text-center">Login</h1>
                            <br/>

                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">

                                    <div className="form-group col-md-12">
                                        <label htmlFor="username">Username/Email</label>
                                        <input type="email" id="username" name="username"
                                            className={classnames("form-control form-control-md shadow", {"is-invalid": errors.username})}
                                            value={username} onChange={this.onChange} />
                                        { 
                                            errors.username ? 
                                                (<div className="invalid-feedback"> { errors.username } </div>) : null 
                                        }
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" name="password"
                                            className={classnames("form-control form-control-md shadow", {"is-invalid": errors.password})}
                                            value={password} onChange={this.onChange} />
                                        { 
                                            errors.password ? 
                                                (<div className="invalid-feedback"> { errors.password } </div>) : null 
                                        }
                                    </div>
                                    
                                    <input type="submit" value="Login" className="btn btn-outline-primary btn-lg mt-4 mx-auto shadow-lg"/>

                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
};

Login.propTypes = {
    errorStore: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { clearErrors, login })(Login);
