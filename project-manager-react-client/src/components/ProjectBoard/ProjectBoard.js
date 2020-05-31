import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Backlog from './Backlog';

class ProjectBoard extends Component {

    render() {
        
        const { code } = this.props.match.params;

        return (
            <div className="container">

                <Link to={`/addProjectTask/${code}`} className="btn btn-primary my-2">
                    Create Project Task
                </Link>
                <hr />
                <Backlog/>
                
            </div>
        )
    }
}

export default ProjectBoard;
