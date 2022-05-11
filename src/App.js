import React, { useEffect, useState } from 'react';
import './App.css';
import { ProjectCard, SignUp, SignIn, ProjectForm, ProfileForm, ProfileCard } from './Components'
import {
  Pane,
  Button, Alert, Avatar,
  Menu, Popover, Position,
  PeopleIcon, LogOutIcon, EditIcon,
  HeartIcon
} from 'evergreen-ui'
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios'

//TODO
//Profile form

const ProjectCardHolder = (props) => {

  return (
    <Pane marginTop="3em" >
      {props.projects && props.projects?.data.map(element => {
        return (
          <ProjectCard userLogged={props.isLoggedIn} {...element} key={element.id} />
        )
      })}
    </Pane>
  )
}

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState({ status: false, userEmail: '', userId: '', profileType: '' })
  const [projects, setProjects] = useState('')
  const [profileInfo, setProfileInfo] = useState({ profileExists: false })

  useEffect(() => {
    console.log(isLoggedIn)
    console.log(profileInfo)
    // console.log()
  }, [isLoggedIn, profileInfo])

  useEffect(() => {
    const projectsPublished = async () => {
      return await axios.get('http://localhost:8080/api/projects')
        .then(res => {
          // console.log(res.data)
          setProjects(res.data)
        })
        .catch(err => console.log(err))
    }
    projectsPublished()
    return
  }, [])

  return (
    <div className="App">
      <Pane display="flex" flexDirection="row" justifyContent="flex-end" width="100vw" zIndex="2"
        marginBottom={16} position="fixed" top="0" left="0" right="0" backgroundColor="white" paddingBottom="1em" >
        {isLoggedIn.status &&
          <Link to="/postproject" style={{ textDecoration: 'none', marginRight: "16px", marginTop: "8px" }}>
            <Button appearance="minimal" >Post project</Button>
          </Link>}
        <Link to="/projects" style={{ textDecoration: 'none', marginRight: "16px", marginTop: "8px" }}>
          <Button appearance="minimal" >Projects</Button>
        </Link>
        <Link to="/candidates" style={{ textDecoration: 'none', marginRight: "16px", marginTop: "8px" }}>
          <Button appearance="minimal" >Candidates</Button>
        </Link>
        {isLoggedIn.status ?
          <Popover
            position={Position.BOTTOM_LEFT}
            content={
              <Menu>
                <Menu.Group>
                  <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <Menu.Item icon={PeopleIcon}>My Profile</Menu.Item>
                  </Link>

                  <Menu.Item icon={HeartIcon}>Favs</Menu.Item>
                  <Menu.Item icon={EditIcon} secondaryText="⌘R">
                    Rename...
                  </Menu.Item>
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group>
                  <Menu.Item icon={LogOutIcon} intent="danger">
                    Logout
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            }
          >
            <Avatar cursor="pointer" name={isLoggedIn.userEmail} size={40} marginRight={16} marginTop={8} />
          </Popover>
          : <React.Fragment>
            <Link to="/signin" style={{ textDecoration: 'none', marginRight: "16px", marginTop: "8px" }}>
              <Button color="#3366FF" border="1px solid #3366FF" >Sign In</Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none', marginRight: "16px", marginTop: "8px" }}>
              <Button appearance="primary" >Sign Up</Button>
            </Link>
          </React.Fragment>
        }
      </Pane>
      <Pane display="flex" flexDirection="column" alignItems="center">
        <Routes>
          <Route path="/" element='' />
          <Route path="/signin" element={<SignIn
            status={isLoggedIn}
            setStatus={setIsLoggedIn}
            setProfile={setProfileInfo} />} />
          <Route path="/signup" element={<SignUp
            setStatus={setIsLoggedIn}
            // setProfile={setProfileInfo}
          />} />
          <Route path="/candidates" element={<ProfileCard />} />
          <Route path="/postproject" element={isLoggedIn.profileType
            ? <ProjectForm user={isLoggedIn} />
            : <Alert intent="danger" title="Unauthorized route" margin={16}>
              Sorry! This option is only available for certain type of users 😔
            </Alert>} />
          <Route path="/projects" element={<ProjectCardHolder
            projects={projects}
            isLoggedIn={isLoggedIn}
          />} />
          <Route path="/profile" element={<ProfileForm user={isLoggedIn} profile={profileInfo} />} />
        </Routes>


      </Pane>

      { }


    </div>
  );
}

export default App;
