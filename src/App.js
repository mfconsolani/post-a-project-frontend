import { useEffect, useState } from 'react';
import './App.css';
import { ProjectCard, SignUp, SignIn } from './Components'
import { Pane, Button } from 'evergreen-ui'
import { fakeData } from './fakeData'
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios'

//TODO
//Header
//Sign up 
//Login
//Profile form
//Post a project form
//



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState({ loggedIn: false, userEmail: '', userId: '' })
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
      <Pane display="flex" flexDirection="row" justifyContent="flex-end" width="100vw">
        <Link to="/projects" style={{ textDecoration: 'none' }}>
          <Button marginRight={16} marginTop={8} appearance="minimal" >Projects</Button>
        </Link>
        <Link to="/signin" style={{ textDecoration: 'none' }}>
          <Button marginRight={16} marginTop={8} color="#3366FF" border="1px solid #3366FF" >Sign In</Button>
        </Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Button marginRight={16} marginTop={8} appearance="primary" >Sign Up</Button>
        </Link>
      </Pane>
      <Pane display="flex" flexDirection="column" alignItems="center">
        <Routes>
          <Route path="/" element='' />
          <Route path="/signin" element={<SignIn status={isLoggedIn} setStatus={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/projects" element={projects && projects?.data.map(element => {
            return (
              <ProjectCard {...element} key={element.id} />
            )
          })} />
        </Routes>

        
      </Pane>

    </div>
  );
}

export default App;

// <Header>
//   <SignIn/>
//   <SignUp/>
//   <Profile/>
// </Header>