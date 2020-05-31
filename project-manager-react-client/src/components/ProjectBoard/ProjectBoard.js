import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBacklog } from '../../redux/actions/backlogActions';

import Backlog from './Backlog';

class ProjectBoard extends Component {

    // constructor to handle errors

    componentDidMount() {
        const { code } = this.props.match.params;
        this.props.getBacklog(code);
    }

    render() {
        const { code } = this.props.match.params;
        const { project_tasks } = this.props.backlogStore;

        return (
            <div className="container">

                <Link to={`/addProjectTask/${code}`} className="btn btn-primary my-2">
                    Create Project Task
                </Link>
                <hr />
                <Backlog project_tasks={project_tasks}/>
                
            </div>
        )
    }
}

ProjectBoard.propTypes = {
    backlogStore: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    backlogStore: state.backlogStore
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
