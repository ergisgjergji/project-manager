import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBacklog } from '../../redux/actions/backlogActions';

import Backlog from './Backlog';

class ProjectBoard extends Component {

    constructor() {
        super();

        this.state = {
            errors: {}
        };
    }

    componentDidMount() {
        const { code } = this.props.match.params;
        this.props.getBacklog(code);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors)
            this.setState({ errors: nextProps.errors });
    }

    render() {
        const { code } = this.props.match.params;
        const { project_tasks } = this.props.backlogStore;
        const { errors } = this.state;
        let BoardContent;
        
        const boardAlgorithm = (errors, project_tasks) => {

            if(project_tasks.length < 1) {
                if(errors.code) {

                    return (
                        <div>
                            <Link to={`/dashboard`} className="btn btn-sm btn-secondary my-2"> {`< Back to dashboard`} </Link>
                            <hr />
                            <div className="alert alert-danger text-center" role="alert">
                            {errors.code}
                        </div>
                        </div>
                    );
                }          
                else {

                    return (
                        <div>
                            <Link to={`/addProjectTask/${code}`} className="btn btn-primary my-2"> Create Project Task </Link>
                            <hr />
                            <div className="alert alert-info text-center" role="alert">
                                No tasks on this board
                            </div>
                        </div>
                    );
                }
            }
            else {
                return (
                    <div>
                        <Link to={`/addProjectTask/${code}`} className="btn btn-primary my-2 shadow"> Create Project Task </Link>
                        <hr/>
                        <Backlog project_tasks={project_tasks}/>
                    </div>
                );
            }
        }
        
        BoardContent = boardAlgorithm(errors, project_tasks);

        return (
            <div className="container">
                {
                    BoardContent
                }
            </div>
        )
    }
}

ProjectBoard.propTypes = {
    backlogStore: PropTypes.object.isRequired,
    errorStore: PropTypes.object,
    getBacklog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    backlogStore: state.backlogStore,
    errors: state.errorStore
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
