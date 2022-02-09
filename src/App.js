import './App.css';
import { ProjectCard } from './Components'
import { fakeData } from './fakeData'
import { Field, Form } from 'react-final-form'
import axios from 'axios'

//TODO
//Header
//Sign up 
//Login
//Profile form
//Post a project form
//

const onSubmit = async values => {
  console.log(values)
  return await axios.post('http://localhost:8080/api/auth/local/signup', values).then(res => console.log(res)).catch(err => console.log(err))
}
// http://localhost:8080/api/projects

const App = () => {

  return (
    <div className="App">

      
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div>Sign Up Form</div>
              <label>Email</label>
              <Field
                name="email"
                component="input"
                type="email"
                placeholder="email@youremail.com"
              />
              <label>Password</label>
              <Field
                name="password"
                component="input"
                type="password"
              />
            </div>
            <button>Submit</button>
          </form>
        )}
      />
      <div>hola</div>
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