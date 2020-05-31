import React, { Component } from 'react';
import ProjectTask from './ProjectTasks/ProjectTask';

class Backlog extends Component {

    render() {

        const { project_tasks } = this.props;
        const render_tasks = project_tasks.map(task => (
            <ProjectTask key={task.id} project_task={task}/>
        ));

        return (
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-4">
                        <div className="card text-center mb-">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {
                            render_tasks
                        }
                    </div>

                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-warning text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Backlog;