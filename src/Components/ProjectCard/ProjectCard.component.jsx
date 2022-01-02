import React from "react";
import './ProjectCard.styles.css'

const ProjectCard = (props) => {
  return (
    <div class="projects">
      <div class="project-container">
        <div class="project-header-container">
          <h4 class="project-heading">{props.projectTitle}</h4>
          <div class="interactions">
            <i class="bi bi-share"></i>
            <i class="bi bi-heart"></i>
          </div>
        </div>
        <div class="project-body">
          <h6 class="project-subheading">{props.company}</h6>
          <p class="project-description">{props.projectDescription}</p>
          <p><u>Role required:</u> {props.roles}</p>
          <p><u>Skills required:</u> {props.skills}</p>
          <p><u>Estimated duration:</u> {props.duration}</p>
        </div>
        <div class="project-footer">
          <div class="post-expiration-dates">
            <small>Posting date: {props.postDate} / Expiration date: {props.expirationDate} </small>
          </div>
          <button>Apply here</button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;