import './App.css';
import { ProjectCard } from './Components'
import { fakeData } from './fakeData'

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
