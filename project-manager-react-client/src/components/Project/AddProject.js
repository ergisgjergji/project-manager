import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from './../../redux/actions/projectActions';

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
    }
    
    componentWillReceiveProps (nextProps) {
        if( this.state.errors != nextProps.errors)
            this.setState({ errors: nextProps.errors });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const project = { ...this.state };
        this.props.createProject(project, this.props.history);
    }

    render() {

        const { name, code, description, start_date, end_date, errors } = this.state;

        return (
            <div>
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-10 col-md-8 m-auto">

                                <h5 className="display-4 text-center">New project</h5>
                                <hr />

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-row">

                                        <div className="form-group col-md-12">
                                            <label for="name">Project Name</label>
                                            <input
                                            type="text"
                                            className={classnames("form-control form-control-md ", {"is-invalid": errors.name})}
                                            name="name" id="name"
                                            value={name}
                                            onChange={this.onChange}
                                            />
                                            { errors.name ? 
                                                    (<div className="invalid-feedback"> { errors.name } </div>) : null }
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label for="code">Project Code</label>
                                            <input
                                            type="text"
                                            className={classnames("form-control form-control-md ", {"is-invalid": errors.code})}
                                            name="code" id="code"
                                            value={code}
                                            onChange={this.onChange}
                                            />
                                            { errors.code ? 
                                                    (<div className="invalid-feedback"> { errors.code } </div>) : null }
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label for="description">Description</label>
                                            <textarea
                                            className={classnames("form-control form-control-md ", {"is-invalid": errors.description})}
                                            name="description" id="description"
                                            value={description}
                                            onChange={this.onChange}
                                            />
                                            { errors.description ? 
                                                    (<div className="invalid-feedback"> { errors.description } </div>) : null }
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label for="end_date">Start Date</label>
                                            <input
                                            type="date"
                                            className="form-control form-control-md"
                                            name="start_date" id="start_date"
                                            value={start_date}
                                            onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label for="end_date">Estimated End Date</label>
                                            <input
                                            type="date"
                                            className="form-control form-control-md"
                                            name="end_date" id="end_date"
                                            value={end_date}
                                            onChange={this.onChange}
                                            />
                                        </div>

                                        <input 
                                        type="submit" 
                                        className="btn btn-primary btn-block mt-4"
                                        />

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
    errors: PropTypes.object.isRequired,
    createProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { createProject })(AddProject);