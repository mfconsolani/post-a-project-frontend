import React, { useContext } from 'react';
import './App.css';
import { ProjectCardHolder, SignUp, SignIn, ProjectForm, CandidateProfileForm, CompanyProfileForm, RequireAuth, Header } from './components'
import ProfileCard from './components/ProfileCard/ProfileCard.component'
import { Alert, Spinner } from 'evergreen-ui'
import { Route, Routes } from 'react-router-dom';
import DataContext from './DataContext';
import useAuth from './hooks/useAuth';


const App = () => {
  const { projects } = useContext(DataContext)
  const { auth } = useAuth()

  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element='' />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<RequireAuth />}>
            <Route path="/candidates" element={<ProfileCard />} />
          </Route>
          <Route path="/postproject" element={auth.profileType === "COMPANY"
            ? <ProjectForm />
            : <Alert intent="danger" title="Unauthorized route" margin={16}>
              Sorry! This option is only available for certain type of users 😔
            </Alert>} />
          <Route path="/projects" element={projects ?
            <ProjectCardHolder /> : <Spinner marginRight="2rem" size={54} />} />
          <Route path="/profile" element={
            auth.profileType === "USER"
              ? <CandidateProfileForm />
              : <CompanyProfileForm />} />
        </Routes>
    </div>
  );
}

export default App;
