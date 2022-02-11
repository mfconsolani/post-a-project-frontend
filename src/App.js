import './App.css';
import { ProjectCard } from './Components'
import SignUp from './Components/SignUp/SignUp.component';
import { fakeData } from './fakeData'

//TODO
//Header
//Sign up 
//Login
//Profile form
//Post a project form
//



const App = () => {

  return (
    <div className="App">
      <SignUp/>
      {
        fakeData.map(element => {
          return (
            <ProjectCard {...element} key={element.id} />
          )
        })
      }
    </div>
  );
}

export default App;

// <Header>
//   <SignIn/>
//   <SignUp/>
//   <Profile/>
// </Header>