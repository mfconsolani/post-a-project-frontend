import React, { useEffect, useState } from "react";
import './ProjectCard.styles.css'
import { Button, Pane, Heading, Paragraph, Spinner, toaster, Badge } from 'evergreen-ui'
import { HeartIcon } from 'evergreen-ui'
import axios from "axios";
import { useIsMount } from '../../helpers/isMountHook'
import { TrashIcon, TickCircleIcon } from 'evergreen-ui'

//TODO
//

const ProjectCard = (props) => {
  const projectId = props.id
  const userId = props.userLogged.userId
  const isMount = useIsMount()
  const [isLiked, setIsLiked] = useState(false)
  const [isLikePressedLoading, setIsLikePressedLoading] = useState(false)
  const [accumualatedLikes, setAccumulatedLikes] = useState(0)
  const [applied, setApplied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  //TODO
  //This is not efficient as it will hit API on every render. Multiply this for every project and it 
  //will be the slowest API in the world. Maybe lifting up one level this function and passing
  //props down to children?
  //Another option is to store the data retrieved in first render in LocalStorage
  useEffect(() => {
    const updateLikesInDB = async () => {
      axios.get(`http://localhost:8080/api/projects/like/${projectId}/`)
        .then(res => {
          setAccumulatedLikes(res.data?.payload._count.likesRegistered)
          const userAlreadyLikedProject = res.data?.payload.likesRegistered.filter(elem => {
            return elem.id === userId
          })
          userAlreadyLikedProject.length > 0 && setIsLiked(true)
        })
        .catch(err => console.log(err))
    }
    updateLikesInDB()
  }, [projectId, userId])

    //TODO
  //This is not efficient as it will hit API on every render. Multiply this for every project and it 
  //will be the slowest API in the world. Maybe lifting up one level this function and passing
  //props down to children?
  //Another option is to store the data retrieved in first render in LocalStorage
  useEffect(() => {
    const updateApplicationsInDB = async () => {
      axios.get(`http://localhost:8080/api/projects/apply/${projectId}/`)
        .then(res => {
          // setAccumulatedLikes(res.data?.payload._count.likesRegistered)
          const userAlreadyAppliedToProject = res.data?.payload.applicationsRegistered.filter(elem => {
            return elem.id === userId
          })
          userAlreadyAppliedToProject.length > 0 && setApplied(true)
        })
        .catch(err => console.log(err))
    }
    updateApplicationsInDB()
  }, [projectId, userId])

  const onLikeButtonClick = () => {
    if (userId) {
      setIsLikePressedLoading(true)
      setIsLiked(prevState => !prevState)
      setIsLikePressedLoading(false)
    } else {
      return toaster.notify("Please login to save projects!", { id: 'forbidden-action' })
    }
  }

  //TODO
  //This is not efficient as it will hit API on every render. Multiply this for every project and it 
  //will be the slowest API in the world. Maybe lifting up one level this function and passing
  //props down to children?
  //Another option is to store the data retrieved in first render in LocalStorage

  useEffect(() => {
    if (isMount) {
      // console.log("first render")
      return
    } else if (!isMount && userId) {
      // console.log("this is not the first render")
      const updateLikesInDB = async () => {
        axios.post(`http://localhost:8080/api/projects/like/${projectId}/?like=${isLiked}`, { userId: userId })
          .then(res => {
            if (res.data?.success) {
              setAccumulatedLikes(res.data?.payload._count.likesRegistered)
              return
            } else {
              toaster.warning(res.data.message)
              return
            }
          })
          .catch(err => {
            toaster.danger(err?.response.status === 404 && "Like/unlike project action failed")
            return
          })
      }
      // console.log()
      updateLikesInDB()
      return
    }
  }, [isLiked, projectId, userId, isMount])

  const onProjectApply = () => {
    if (userId) {
      setIsLoading(true)    
      setApplied(prevState => !prevState)
      setIsLoading(false)
    } else {
      return toaster.notify("Please login to apply!", { id: 'forbidden-action' })
    }
  }

  useEffect(() => {
    if (isMount) {
      // console.log("first render")
      return
    } else if (!isMount && userId) {
      // console.log("this is not the first render")

      const updateApplicationInDB = async () => {
        axios.post(`http://localhost:8080/api/projects/apply/${projectId}/?apply=${applied}`, { userId: userId })
        .then(res => {
          if (res.data?.success) {
            console.log(res.data)
            applied 
            ? toaster.success(`You've successfully applied to ${res.data.payload.title} project` )
            : toaster.notify(`You've removed your application from ${res.data.payload.title} project` )
            return
          } else {
            toaster.warning(res.data.message)
            return
          }
              
            })
            .catch(err => {
              toaster.danger(err?.response.status === 404 && "Apply/discard project action failed")
              return
            })
          }
      updateApplicationInDB()
      return
    }
  }, [applied, projectId, userId, isMount])


  return (
    <Pane margin="0.1em" >
      <Pane border="1px solida #FFF" borderRadius="5px" padding="1rem" margin="1rem" elevation={3} float="left" display="flex" flexDirection="column" width="70vw">
        <Pane display="flex" flexDirection="row" justifyContent="space-between">
          <Heading> {props.title} </Heading>
          <Pane display="flex" flexDirection="column" alignContent="center">
            {isLikePressedLoading ? <Spinner size={18} /> :
              <HeartIcon
                color={isLiked ? "danger" : "disabled"}
                className="heart-icon"
                size={20}
                onClick={onLikeButtonClick} />}
            <Paragraph fontSize={10} textAlign="center" lineHeight="none">{accumualatedLikes}</Paragraph>
          </Pane>
        </Pane>
        <Heading> {props.company} </Heading>
        <Paragraph color="black" maxWidth="80%">{props.body}</Paragraph>
        <Paragraph color="black"><u>Role required:</u> {props.role.map(elem => elem.role)}</Paragraph>
        <Paragraph color="black"><u>Skills required:</u> {props.skill.map(elem => {
          return <span key={elem.id}  > <Badge>{elem.skill}</Badge> </span>
        })}</Paragraph>
        <Paragraph color="black"><u>Duration:</u> {props.duration}</Paragraph>
        <Pane display="flex" flexDirection="row" justifyContent="space-between">
          <Paragraph color="black" fontSize="x-small"><i>Posting date: {props.createdAt} / Expiration date: {props.expiresBy}</i></Paragraph>
          { !applied 
          ? <Button onClick={onProjectApply} marginLeft="1rem" iconAfter={TickCircleIcon} intent="success">Apply here</Button>
          : <Button onClick={onProjectApply} marginLeft="1rem" iconBefore={TrashIcon} intent="danger">Discard</Button>
          }
        </Pane>
      </Pane>
    </Pane>
  )
}

export default ProjectCard;