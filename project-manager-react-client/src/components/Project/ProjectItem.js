import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from './../../redux/actions/projectActions';

class ProjectItem extends Component {

	onDeleteClick = (code) => {

		confirmAlert({
			title: 'Confirm',
			message: 'Are u sure u want to delete this project?',
			buttons: [
				{
					label: 'Yes',
					className: "confirm-yes",
					onClick: () => this.props.deleteProject(code)
				},
				{
					label: 'No',
					className: "confirm-no"
			  	}
			]
		})
	}

	render() {
		const { project } = this.props;

		return (
			<div className="container rounded">
				<div className="card card-body bg-light mb-3 border border-secondary">
					<div className="row">
						<div className="col-4 col-md-2">
							<span className="mx-auto"> #{project.code} </span>
						</div>

						<div className="col-md-5 col-8">
							<h3>{project.name}</h3>
							<p>{project.description}</p>
						</div>

						<div className="col-md-5 d-lg-block">
							<ul className="list-group shadow-lg">

								<Link to={`/projectBoard/${project.code}`}>
									<li className="list-group-item board">
										<i className="fa fa-flag-checkered pr-1"> Project Board </i>
									</li>
								</Link>

								<Link to={`/updateProject/${project.code}`}>
									<li className="list-group-item update">
										<i className="fa fa-edit pr-1"> Update Project Info</i>
									</li>
								</Link>

								<li className="list-group-item delete" onClick={this.onDeleteClick.bind(this, project.code)}>
									<i className="fa fa-minus-circle pr-1"> Delete Project</i>
								</li>
								
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProjectItem.propTypes = {
    deleteProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default connect(null, { deleteProject })(ProjectItem);