import { useEffect, useState } from 'react';
import './App.css';
import { ProjectCard, SignUp, SignIn } from './Components'
import { fakeData } from './fakeData'

//TODO
//Header
//Sign up 
//Login
//Profile form
//Post a project form
//



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState({loggedIn: false, userEmail: '', userId: ''})

  useEffect(()=>{
    console.log(isLoggedIn)
  }, [isLoggedIn])

  return (
    <div className="App">
      <SignIn status={isLoggedIn} setStatus={setIsLoggedIn}/>
      <SignUp/>
      {/* {
        fakeData.map(element => {
          return (
            <ProjectCard {...element} key={element.id} />
          )
        })
      } */}
    </div>
  );
}

export default App;

// <Header>
//   <SignIn/>
//   <SignUp/>
//   <Profile/>
// </Header>