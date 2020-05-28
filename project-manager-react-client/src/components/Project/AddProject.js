import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from './../../redux/actions/projectActions';

class AddProject extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            code: "",
            description: "",
            start_date: "",
            end_date: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const project = { ...this.state };
        this.props.createProject(project, this.props.history);
    }

    render() {
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
                                            className="form-control form-control-md "
                                            name="name" id="name"
                                            value={this.state.name}
                                            onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label for="code">Project Code</label>
                                            <input
                                            type="text"
                                            className="form-control form-control-md"
                                            name="code" id="code"
                                            value={this.state.code}
                                            onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label for="description">Description</label>
                                            <textarea
                                            className="form-control form-control-md"
                                            name="description" id="description"
                                            value={this.state.description}
                                            onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label for="end_date">Start Date</label>
                                            <input
                                            type="date"
                                            className="form-control form-control-md"
                                            name="start_date" id="start_date"
                                            value={this.state.start_date}
                                            onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label for="end_date">Estimated End Date</label>
                                            <input
                                            type="date"
                                            className="form-control form-control-md"
                                            name="end_date" id="end_date"
                                            value={this.state.end_date}
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
    createProject: PropTypes.func.isRequired
}

export default connect(null, { createProject })(AddProject);
