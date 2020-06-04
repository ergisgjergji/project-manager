import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from './../../redux/actions/authActions';
import { clearErrors } from './../../redux/actions/errorActions';
import classnames from 'classnames';

class Register extends Component {

    constructor(){
        super();

        this.state = {
            full_name: "",
            username: "",
            password: "",
            confirm_password: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.isAuthenticated)
            this.props.history.push("/dashboard");
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
        this.setState({ errors: {} });
        this.props.clearErrors();

        const { full_name, username, password, confirm_password } = this.state;
        const newUser = { full_name, username, password, confirm_password };
        this.props.register(newUser, this.props.history);
    }

    render() {

        const { full_name, username, password, confirm_password, errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">

                        <div className="col-10 col-md-8 col-lg-6 m-auto">

                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>

                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">

                                    <div className="form-group col-md-12">
                                        <label htmlFor="full_name">Full Name</label>
                                        <input required type="text" name="full_name" id="full_name"
                                            className={classnames("form-control form-control-md shadow", {"is-invalid": errors.full_name})}
                                            value={full_name} onChange={this.onChange} />
                                        { 
                                            errors.full_name ? 
                                                (<div className="invalid-feedback"> { errors.full_name } </div>) : null 
                                        }
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="username">Email Address</label>
                                        <input required type="email" id="username" name="username"
                                            className={classnames("form-control form-control-md shadow", {"is-invalid": errors.username})}
                                            value={username} onChange={this.onChange} />
                                        { 
                                            errors.username ? 
                                                (<div className="invalid-feedback"> { errors.username } </div>) : null 
                                        }
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="password">Password</label>
                                        <input required type="password" id="password" name="password"
                                            className={classnames("form-control form-control-md shadow", {"is-invalid": errors.password})}
                                            value={password} onChange={this.onChange} />
                                        { 
                                            errors.password ? 
                                                (<div className="invalid-feedback"> { errors.password } </div>) : null 
                                        }
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="confirm_password">Confirm Password</label>
                                        <input required type="password" id="confirm_password" name="confirm_password"
                                            className={classnames("form-control form-control-md shadow", {"is-invalid": errors.confirm_password})}
                                            value={confirm_password} onChange={this.onChange} />
                                        { 
                                            errors.confirm_password ? 
                                                (<div className="invalid-feedback"> { errors.confirm_password } </div>) : null 
                                        }
                                    </div>

                                    <input type="submit" className="btn btn-outline-success btn-lg mt-3 mx-auto shadow-lg"/>

                                </div>
                            </form>
                            
                        </div>

                    </div>
                </div>
            </div>
        )
    }
};

Register.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    errorStore: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.authStore.isAuthenticated,
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
