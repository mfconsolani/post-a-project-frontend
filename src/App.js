import React, { useEffect, useState } from 'react';
import './App.css';
import { ProjectCard, SignUp, SignIn, ProjectForm, CandidateProfileForm, CompanyProfileForm } from './Components'
import ProfileCard from './Components/ProfileCard/ProfileCard.component'
import {
  Pane,
  Button, Alert, Avatar,
  Menu, Popover, Position,
  PeopleIcon, LogOutIcon, EditIcon,
  HeartIcon, Spinner
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
          <ProjectCard
            updateProjects={props.updateProjects}
            // isUpdating={props.isUpdating}
            // setIsUpdating={props.setIsUpdating}
            userLogged={props.isLoggedIn}
            {...element} key={element.id} />
        )
      })}
    </Pane>
  )
}

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('userStatus')) || { status: false, userEmail: '', userId: '', profileType: '' }
  )
  const [projects, setProjects] = useState('')
  const [profileInfo, setProfileInfo] = useState(JSON.parse(localStorage.getItem('userProfile')) || { profileExists: false })
  // const [isUpdating, setIsUpdating] = useState(false)

  const fetchProjects = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL}api/projects`)
      .then(res => {
        setProjects(res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchProjects()
    return
  }, [])

  return (
    <div className="App">
      <Pane display="flex" flexDirection="row" justifyContent="flex-end" width="100vw" zIndex="2"
        marginBottom={16} position="fixed" top="0" left="0" right="0" backgroundColor="white" paddingBottom="1em" >
        {isLoggedIn.profileType === "COMPANY" &&
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

                  <Menu.Item icon={HeartIcon} disabled >Favs</Menu.Item>
                  <Menu.Item icon={EditIcon} disabled>
                    Rename...
                  </Menu.Item>
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group>
                  <Link to="/projects" style={{ textDecoration: 'none' }}>
                    <Menu.Item icon={LogOutIcon} intent="danger" onClick={() => {
                      setIsLoggedIn({ status: false, userEmail: '', userId: '', profileType: '' })
                      setProfileInfo({ profileExists: false })
                      localStorage.clear()
                      // window.location.reload()  
                    }}>
                      Logout
                    </Menu.Item>
                  </Link>
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
            setProfile={setProfileInfo} />}
          />
          <Route path="/signup" element={<SignUp
            setStatus={setIsLoggedIn}
          />} />
          <Route path="/candidates" element={<ProfileCard />} />
          <Route path="/postproject" element={isLoggedIn.profileType === "COMPANY"
            ? <ProjectForm user={isLoggedIn} setProjects={setProjects} />
            : <Alert intent="danger" title="Unauthorized route" margin={16}>
              Sorry! This option is only available for certain type of users 😔
            </Alert>} />
          <Route path="/projects" element={ projects ?
            <ProjectCardHolder
              projects={projects}
              isLoggedIn={isLoggedIn}
              updateProjects={fetchProjects}
            // isUpdating={isUpdating}
            // setIsUpdating={setIsUpdating}
            /> : <Spinner marginRight="2rem" size={54} />} />
          <Route path="/profile" element={
            isLoggedIn.profileType === "USER"
              ? <CandidateProfileForm user={isLoggedIn} profile={profileInfo} setProfile={setProfileInfo} />
              : <CompanyProfileForm user={isLoggedIn} profile={profileInfo} setProfile={setProfileInfo} />} />
        </Routes>


      </Pane>

    </div>
  );
}

export default App;
