import React, { useEffect, useState } from 'react';
import './App.css';
import { ProjectCard, SignUp, SignIn, ProjectForm } from './Components'
import { Pane, Button, Alert, Avatar } from 'evergreen-ui'
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios'

//TODO
//Profile form



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState({ status: false, userEmail: '', userId: '', profileType: '' })
  const [projects, setProjects] = useState('')

  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])

  useEffect(() => {
    const projectsPublished = async () => {
      return await axios.get('http://localhost:8080/api/projects')
        .then(res => {
          setProjects(res.data)
        })
        .catch(err => console.log(err))
    }
    projectsPublished()
    return
  }, [])

  return (
    <div className="App">
      <Pane display="flex" flexDirection="row" justifyContent="flex-end" width="100vw" marginBottom={16}>
        {isLoggedIn.status &&
          <Link to="/postproject" style={{ textDecoration: 'none' }}>
            <Button marginRight={16} marginTop={8} appearance="minimal" >Post project</Button>
          </Link>}
        <Link to="/projects" style={{ textDecoration: 'none' }}>
          <Button marginRight={16} marginTop={8} appearance="minimal" >Projects</Button>
        </Link>
        {isLoggedIn.status ? <Avatar name={isLoggedIn.userEmail} size={40} marginRight={16} marginTop={8} /> :
          <React.Fragment>
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <Button marginRight={16} marginTop={8} color="#3366FF" border="1px solid #3366FF" >Sign In</Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button marginRight={16} marginTop={8} appearance="primary" >Sign Up</Button>
            </Link>
          </React.Fragment>
        }
      </Pane>
      <Pane display="flex" flexDirection="column" alignItems="center">
        <Routes>
          <Route path="/" element='' />
          <Route path="/signin" element={<SignIn status={isLoggedIn} setStatus={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/postproject" element={isLoggedIn.profileType
            ? <ProjectForm user={isLoggedIn} />
            : <Alert intent="danger" title="Unauthorized route" margin={16}>
              Sorry! This option is only available for certain type of users 😔
            </Alert>} />
          <Route path="/projects" element={projects && projects?.data.map(element => {
            return (
              <ProjectCard userLogged={isLoggedIn} {...element} key={element.id} />
            )
          })} />
        </Routes>



      </Pane>

    </div>
  );
}

export default App;
