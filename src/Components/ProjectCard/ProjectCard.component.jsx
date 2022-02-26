import React from "react";
import './ProjectCard.styles.css'


const ProjectCard = (props) => {

  return (
    <div className="projects">
      <div className="project-container">
        <div className="project-header-container">
          <h4 className="project-heading">{props.title}</h4>
          <div className="interactions">
            <i className="bi bi-share"></i>
            <i className="bi bi-heart"></i>
          </div>
        </div>
        <div className="project-body">
          <h6 className="project-subheading">{props.company}</h6>
          <p className="project-description">{props.body}</p>
          <p><u>Role required:</u> {props.role.map(elem => elem.role)}</p>
          <p><u>Skills required:</u> {props.skill.map(elem => elem.skill)}</p>
          <p><u>Estimated duration:</u> {props.duration}</p>
        </div>
        <div className="project-footer">
          <div className="post-expiration-dates">
            <small>Posting date: {props.createdAt} / Expiration date: {props.expiresBy} </small>
          </div>
          <button>Apply here</button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;