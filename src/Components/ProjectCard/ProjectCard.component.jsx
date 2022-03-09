import React, { useEffect, useState } from "react";
import './ProjectCard.styles.css'
import { Button, Pane, Heading, Paragraph, Text } from 'evergreen-ui'
import { HeartIcon } from 'evergreen-ui'


const ProjectCard = (props) => {

  //TODO
  //Global likes for this project
  //Grey icon for unliked 
  //Red icon for liked
  //hit API to check accumulated likes
  const [isLiked, setIsLiked] = useState(false)
  const [isLikePressedLoading, setisLikePressedLoading] = useState(true)
  const [accumualatedLikes, setAccumulatedLikes] = useState(95)

  useEffect(() => {
    console.log(isLiked)
    //logic here to hit API to change isLike status
  }, [isLiked])


  return (
    <Pane margin="3%" >
      <Pane border="1px solida #FFF" borderRadius="5px" padding="1rem" margin="1rem" elevation={3} float="left" display="flex" flexDirection="column">
        <Pane display="flex" flexDirection="row" justifyContent="space-between">
          <Heading> {props.title} </Heading>
          <Pane display="flex" flexDirection="column" alignContent="center">
            <HeartIcon
              color={isLiked ? "danger" : "disabled"}
              size={20}
              onClick={() => {
                setIsLiked(!isLiked)
                !isLiked
                  ? setAccumulatedLikes(accumualatedLikes + 1)
                  : setAccumulatedLikes(accumualatedLikes - 1)
              }} />
            <Paragraph fontSize={10} textAlign="center">{accumualatedLikes}</Paragraph>
          </Pane>
        </Pane>
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