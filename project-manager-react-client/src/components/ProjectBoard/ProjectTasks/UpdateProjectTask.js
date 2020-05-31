import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjectTask, updateProjectTask } from './../../../redux/actions/backlogActions';

import classnames from 'classnames';

class UpdateProjectTask extends Component {
    
    constructor(){
        super();

        this.state = {
            id: "",
            code: "",
            sequence: "",
            summary: "",
            acceptance_criteria: "",
            status: "",
            priority: 0,
            created_date: null,
            due_date: null,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { code, sequence } = this.props.match.params;
        this.props.getProjectTask(code, sequence, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors)
            this.setState({ errors: nextProps.errors })

        const { id, code, sequence, summary, acceptance_criteria, status, priority, created_date, due_date } = nextProps.project_task;
        this.setState({ id, code, sequence, summary, acceptance_criteria, status, priority, created_date, due_date });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
            e.preventDefault();

            const { id, code, sequence, summary, acceptance_criteria, status, priority, created_date, due_date } = this.state;
            const updatedTask = { id, code, sequence, summary, acceptance_criteria, status, priority, created_date, due_date };

            this.props.updateProjectTask(code, sequence, updatedTask, this.props.history);
    }
    
    render() {

        const { code, sequence, summary, acceptance_criteria, status, priority, due_date, errors } = this.state;

        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-10 col-md-8 m-auto">

                            <h4 className="display-4 text-center">Edit Task</h4>
                            <p className="lead text-center">Project: <strong>{code}</strong> | Task: <strong>{sequence}</strong></p>

                            <form onSubmit={this.onSubmit}>
                                <div className="form-row">
                                    
                                    <div className="form-group col-md-12">
                                        <label htmlFor="summary">Task Summary</label>
                                        <input type="text" id="summary" name="summary"
                                            className={classnames("form-control form-control-lg ", {"is-invalid": errors.summary})}
                                            value={summary} onChange={this.onChange} />
                                        { 
                                            errors.summary ? 
                                                (<div className="invalid-feedback"> { errors.summary } </div>) : null 
                                        }
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="acceptance_criteria">Acceptance Criteria</label>
                                        <textarea id="acceptance_criteria" name="acceptance_criteria"
                                            className="form-control form-control-lg"
                                            value={acceptance_criteria} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="due_date">Due Date</label>
                                        <input type="date" id="due_date" name="due_date"
                                            className="form-control form-control-md"
                                            value={due_date} onChange={this.onChange} />
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="priority">Priority</label>
                                        <select name="priority" className="form-control form-control-md" value={priority} onChange={this.onChange}>
                                            <option value={0}>Select Priority</option>
                                            <option value={1}>High</option>
                                            <option value={2}>Medium</option>
                                            <option value={3}>Low</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label htmlFor="status">Status</label>
                                        <select name="status" className="form-control form-control-md" value={status} onChange={this.onChange}>
                                            <option value="">Select Status</option>
                                            <option value="TO_DO">TO DO</option>
                                            <option value="IN_PROGRESS">IN PROGRESS</option>
                                            <option value="DONE">DONE</option>
                                        </select>
                                    </div>

                                    <Link to={`/projectBoard/${code}`} className="btn btn-md btn-secondary mt-2 mr-2">
                                        Go back
                                    </Link>

                                    <input type="submit" className="btn btn-md btn-success mt-2"/>             
                                
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

UpdateProjectTask.propTypes = {
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    updateProjectTask: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    project_task: state.backlogStore.project_task,
    errors: state.errorStore
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(UpdateProjectTask);
