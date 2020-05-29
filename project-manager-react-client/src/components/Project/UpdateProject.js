import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProject } from './../../redux/actions/projectActions';

import classnames from 'classnames';

class UpdateProject extends Component {

    componentDidMount() {
        const { code } = this.props.match.params;
        this.props.getProject(code, this.props.history);
    }

    render() {

        const project = this.props.projectReducer.currentProject;

        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-10 col-md-8 m-auto">

                            <h5 className="display-4 text-center">Edit Project</h5>
                            <hr />

                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label for="name">Project Name</label>
                                        <input type="text" id="name" name="name" className="form-control form-control-md "/>
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label for="code">Project Code</label>
                                        <input type="text" id="code" name="code" className="form-control form-control-md" disabled/>
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label for="description">Project Description</label>
                                        <textarea className="form-control form-control-md"></textarea>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label for="start_date">Start Date</label>
                                        <input type="date" id="start_date" name="start_date" className="form-control form-control-md"/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label for="end_date">Estimated End Date</label>
                                        <input type="date" id="end_date" name="end_date" className="form-control form-control-md"/>
                                    </div>

                                    <input type="submit" className="btn btn-primary btn-block mt-4" />
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
    projectReducer: PropTypes.object.isRequired,
    getProject: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    projectReducer: state.projectReducer
});

export default connect(mapStateToProps, { getProject })(UpdateProject);