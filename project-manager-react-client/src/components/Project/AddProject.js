import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createOrUpdateProject } from './../../redux/actions/projectActions';

import classnames from 'classnames';

class AddProject extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            code: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {}
        };

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
        const project = { ...this.state };
        this.props.createOrUpdateProject(project, this.props.history);
    }

    render() {

        const { name, code, description, start_date, end_date, errors } = this.state;

        return (
            <div>
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-10 col-md-9 col-lg-7 m-auto">
                            
                                <Link to="/dashboard" className="btn btn-secondary btn-sm shadow"> 
                                    {`< Go back`} 
                                </Link>
                                
                                <h5 className="display-4 text-center">New project</h5>
                                <hr />

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-row">

                                        <div className="form-group col-md-12">
                                            <label htmlFor="name">Project Name</label>
                                            <input type="text" id="name" name="name"
                                                className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.name})}
                                                value={name} onChange={this.onChange} />
                                            { 
                                                errors.name ? 
                                                    (<div className="invalid-feedback"> { errors.name } </div>) : null 
                                            }
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="code">Project Code</label>
                                            <input type="text" id="code" name="code"
                                                className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.code})}
                                                value={code} onChange={this.onChange} />
                                            { 
                                                errors.code ? 
                                                    (<div className="invalid-feedback"> { errors.code } </div>) : null 
                                            }
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="description">Description</label>
                                            <textarea id="description"  name="description"
                                                className={classnames("form-control form-control-md shadow ", {"is-invalid": errors.description})}
                                                value={description} onChange={this.onChange} />
                                            { 
                                                errors.description ? 
                                                    (<div className="invalid-feedback"> { errors.description } </div>) : null 
                                            }
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="start_date">Start Date</label>
                                            <input type="date" id="start_date" name="start_date"
                                                className="form-control form-control-md shadow " 
                                                value={start_date} onChange={this.onChange} />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="end_date">Estimated End Date</label>
                                            <input type="date" id="end_date" name="end_date"
                                                className="form-control form-control-md shadow "
                                                value={end_date} onChange={this.onChange} />
                                        </div>

                                        <input type="submit" className="btn btn-primary btn-lg mt-4 mx-auto shadow-lg"/>

                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddProject.propTypes = {
    errorStore: PropTypes.object.isRequired,
    createOrUpdateProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errorStore: state.errorStore
});

export default connect(mapStateToProps, { createOrUpdateProject })(AddProject);