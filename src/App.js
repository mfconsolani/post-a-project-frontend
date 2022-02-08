import './App.css';
import { ProjectCard } from './Components'
import { fakeData } from './fakeData'

//TODO
//Header
//Sign up 
//Login
//Profile form
//Post a project form
//


function App() {
  return (
    <div className="App">
      {
        fakeData.map(element => {
          return (
            <ProjectCard {...element} key={element.id}/>
          )
        })
      }
    </div>
  );
}

export default App;
