import React, { useEffect, useState } from "react";
import './ProjectCard.styles.css'
import { Button, Pane, Heading, Paragraph, Spinner, toaster, Badge } from 'evergreen-ui'
import { HeartIcon } from 'evergreen-ui'
import { TrashIcon, TickCircleIcon } from 'evergreen-ui'
import { useFetchLikes } from "../../helpers/likesCountHook";
import { useFetchProjectApplication } from "../../helpers/projectApplyHook";
import axios from "axios";

const ProjectCard = (props) => {
  const projectId = props.id
  const userId = props.userLogged.userId
  const [isLiked, setIsLiked] = useState('')
  const [applied, setApplied] = useState('')
  const { fetchLikes, accumualatedLikes: accumLikes, isLoading: isLikeLoading } = useFetchLikes()
  const { isLoading: isApplicationLoading, fetchApplication, userHasApplied } = useFetchProjectApplication()
  // console.log(props)

  useEffect(() => {
    if (userId && props.likesRegistered.some(elem => elem.id === userId)) {
      // console.log("user has liked the project")
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
    if (userId && props.applicationsRegistered.some(elem => elem.id === userId)) {
      // console.log("user has applied to the project")
      setApplied(true)
    } else {
      setApplied(false)
    }
    return
  }, [props.likesRegistered, props.applicationsRegistered, userId])

  const onLikeButtonClick = async () => {
    try {
      if (userId) {
        await fetchLikes(projectId, userId, !isLiked)
        setIsLiked(prevState => !prevState)
      } else {
        return toaster.notify("Please login to save projects!", { id: 'forbidden-action' })
      }
    } catch (error) {
      toaster.warning("An error has occurred when liking/discarding project", { id: 'forbidden-action' })
      return error
    }
  }

  const onProjectApply = async () => {
    try {
      if (userId) {
        const fetchProjects = async () => {
          return await axios.get(`${process.env.REACT_APP_API_URL}api/projects`)
            .then(res => {
              console.log('axios request from ProjectCard', res.data.data[0].applicationsRegistered)
              // setProjects(res.data)
            })
            .catch(err => console.log(err))
        }
        const responseFromFunction = await fetchApplication(projectId, userId, !applied)
        console.log('Response from function',responseFromFunction)
        props.setIsUpdating(prevState => !prevState)
        setApplied(prevState => !prevState)
        fetchProjects()
        props.updateProjects()
        console.log('userHasApplied', userHasApplied)
        // props.requireUpdate(true)
      } else {
        return toaster.notify("Please login to apply!", { id: 'forbidden-action' })
      }
    } catch (error) {
      toaster.warning("An error has occurred when liking/discarding project", { id: 'forbidden-action' })
      return error
    }
  }

  return (
    <Pane margin="0.1em">
      <Pane border="1px solid #FFF" borderRadius="5px" padding="1rem" margin="1rem" elevation={3} float="left" display="flex" flexDirection="column" width="70vw">
        <Pane display="flex" flexDirection="row" justifyContent="space-between">
          <Heading> {props.title} </Heading>
          <Pane display="flex" flexDirection="column" alignContent="center">
            {isLikeLoading ? <Spinner size={18} /> :
              <HeartIcon
                color={isLiked ? "danger" : "disabled"}
                className="heart-icon"
                size={20}
                onClick={onLikeButtonClick} />}
            <Paragraph fontSize={10} textAlign="center" lineHeight="none">{accumLikes !== false ? accumLikes : props.likesRegistered.length}</Paragraph>
          </Pane>
        </Pane>
        <Heading> {props.company} </Heading>
        <Paragraph color="black" maxWidth="80%">{props.body}</Paragraph>
        <Paragraph color="black"><u>Role required:</u> {props.role.map(elem => <span key={elem.id}> <Badge color="blue">{elem.role}</Badge> </span>)}</Paragraph>
        <Paragraph color="black"><u>Skills required:</u> {props.skill.map(elem => {
          return <span key={elem.id}> <Badge>{elem.skill}</Badge> </span>
        })}</Paragraph>
        <Paragraph color="black"><u>Duration:</u> {props.duration}</Paragraph>
        <Pane display="flex" flexDirection="row" justifyContent="space-between">
          <Paragraph color="black" fontSize="x-small"><i>Posting date: {props.createdAt} / Expiration date: {props.expiresBy}</i></Paragraph>
          {isApplicationLoading ? <Spinner marginRight="2rem" size={32} /> : (applied
            ? <Button onClick={onProjectApply} marginLeft="1rem" iconBefore={TrashIcon} intent="danger">Discard</Button>
            : <Button onClick={onProjectApply} marginLeft="1rem" iconAfter={TickCircleIcon} intent="success">Apply here</Button>)
          }
        </Pane>
      </Pane>
    </Pane>
  )
}

export default ProjectCard;