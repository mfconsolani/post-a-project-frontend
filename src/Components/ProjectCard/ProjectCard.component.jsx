import React from "react";
import './ProjectCard.styles.css'
import { Button, Pane, Heading, Paragraph } from 'evergreen-ui'


const ProjectCard = (props) => {

  return (
    <Pane margin="3%" >
      <Pane border="1px solida #FFF" borderRadius="5px" padding="1rem" margin="1rem" elevation={3} float="left" display="flex" flexDirection="column">
        <Heading> {props.title} </Heading>
        <Heading> {props.company} </Heading>
        <Paragraph color="black" >{props.body}</Paragraph>
        <Paragraph color="black"><u>Role required:</u> {props.role.map(elem => elem.role)}</Paragraph>
        <Paragraph color="black"><u>Skills required:</u> {props.skill.map(elem => elem.skill)}</Paragraph>
        <Paragraph color="black"><u>Duration:</u> {props.duration}</Paragraph>  
        <Pane display="flex" flexDirection="row" justifyContent="space-between">
        <Paragraph color="black" fontSize="x-small"><i>Posting date: {props.createdAt} / Expiration date: {props.expiresBy}</i></Paragraph>
        <Button marginLeft="1rem">Apply here</Button>
        </Pane>
      </Pane>
    </Pane>
  )
}

export default ProjectCard;