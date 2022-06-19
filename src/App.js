import React, { useContext } from 'react';
import './App.css';
import { ProjectCardHolder, SignUp, SignIn, ProjectForm, CandidateProfileForm, CompanyProfileForm, RequireAuth, Header, PersistLogin } from './components'
import ProfileCard from './components/ProfileCard/ProfileCard.component'
import { Alert, Spinner } from 'evergreen-ui'
import { Route, Routes } from 'react-router-dom';
import DataContext from './context/DataContext';
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
        <Route element={<PersistLogin />}>
          <Route path="/candidates" element={<ProfileCard />} />
          <Route path="/projects" element={projects ?
            <ProjectCardHolder /> : <Spinner marginRight="2rem" size={54} />} />
          <Route element={<RequireAuth />}>
            <Route path="/postproject" element={auth.profileType === "COMPANY"
              ? <ProjectForm />
              : <Alert intent="danger" title="Unauthorized route" margin={16}>
                Sorry! This option is only available for certain type of users 😔
              </Alert>} />
            <Route path="/profile" element={
              auth.profileType === "USER"
                ? <CandidateProfileForm />
                : <CompanyProfileForm />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
