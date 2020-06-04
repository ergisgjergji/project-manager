import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProject, createOrUpdateProject } from './../../redux/actions/projectActions';

import classnames from 'classnames';

class UpdateProject extends Component {

    constructor() {
        super();

        this.state = {
            id: "", 
            name: "",
            code: "",
            description: "",
            start_date: "",
            end_date: "",
            created_date: null,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { code } = this.props.match.params;
        this.props.getProject(code, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.errors)
            this.setState({ errors: nextProps.errors });

        const { id, name, code, description, start_date, end_date, created_date } = nextProps.project;
        this.setState({ id, name, code, description, start_date, end_date, created_date });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const { id, name, code, description, start_date, end_date, created_date } = this.state;
        const updatedProject = { id, name, code, description, start_date, end_date, created_date };

        this.props.createOrUpdateProject(updatedProject, this.props.history);
    }

    render() {

        const { project } = this.props;
        const { id, name, code, description, start_date, end_date, errors } = this.state;

        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-10 col-md-8 m-auto">

                            <Link to="/dashboard" className="btn btn-secondary btn-sm shadow"> 
                                {`< Go back`}
                            </Link>

                            <h5 className="display-4 text-center">Edit Project</h5>
                            <hr />

                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">

                                    <input type="hidden" name="id" value={id} />

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
                                            className="form-control form-control-md" disabled
                                            value={code} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="description">Project Description</label>
                                        <textarea name="description" id="description"
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
                                            className="form-control form-control-md shadow"
                                            value={start_date} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="end_date">Estimated End Date</label>
                                        <input type="date" id="end_date" name="end_date" 
                                            className="form-control form-control-md shadow"
                                            value={end_date} onChange={this.onChange} />
                                    </div>

                                    <input type="submit" className="btn btn-primary btn-lg mt-4 mx-auto shadow-lg"/>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

UpdateProject.propTypes = {
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getProject: PropTypes.func.isRequired,
    createOrUpdateProject: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    project: state.projectStore.currentProject,
    errors: state.errorStore
});

export default connect(mapStateToProps, { getProject, createOrUpdateProject })(UpdateProject);