import React from "react";
import './ProjectCard.styles.css'

const ProjectCard = (props) => {
  return (
    <div className="projects">
      <div className="project-container">
        <div className="project-header-container">
          <h4 className="project-heading">{props.projectTitle}</h4>
          <div className="interactions">
            <i className="bi bi-share"></i>
            <i className="bi bi-heart"></i>
          </div>
        </div>
        <div className="project-body">
          <h6 className="project-subheading">{props.company}</h6>
          <p className="project-description">{props.projectDescription}</p>
          <p><u>Role required:</u> {props.roles}</p>
          <p><u>Skills required:</u> {props.skills}</p>
          <p><u>Estimated duration:</u> {props.duration}</p>
        </div>
        <div className="project-footer">
          <div className="post-expiration-dates">
            <small>Posting date: {props.postDate} / Expiration date: {props.expirationDate} </small>
          </div>
          <button>Apply here</button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;