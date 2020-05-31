import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddProjectTask extends Component {

    render() {

        const { code } = this.props.match.params;

        return (
            <div class="add-PBI">
                <div class="container">
                    <div class="row">

                        <div class="col-md-8 m-auto">

                            <Link to={`/projectBoard/${code}`} class="btn btn-light">
                                Back to Project Board
                            </Link>

                            <h4 class="display-4 text-center">New Task</h4>
                            <p class="lead text-center">Project Name + Project Code</p>

                            <form>
                                
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" name="summary" placeholder="Project Task summary" />
                                </div>

                                <div class="form-group">
                                    <textarea class="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria"></textarea>
                                </div>

                                <h6>Due Date</h6>
                                <div class="form-group">
                                    <input type="date" class="form-control form-control-lg" name="dueDate" />
                                </div>

                                <div class="form-group">
                                    <select class="form-control form-control-lg" name="priority">
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <select class="form-control form-control-lg" name="status">
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input type="submit" class="btn btn-primary btn-block mt-4" />
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default AddProjectTask;
