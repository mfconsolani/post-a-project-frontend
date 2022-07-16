import React, { useContext, useEffect } from "react";
import { Field, Form } from 'react-final-form'
import axios from 'axios'
import { Button, toaster, Spinner } from 'evergreen-ui'
import './SignIn.styles.css'
import { useNavigate, useLocation } from "react-router-dom";
import CONSTANTS from "../../config";
import useAuth from "../../hooks/useAuth";
import DataContext from "../../context/DataContext";
import { Checkbox } from "..";
import PasswordInput from "../PasswordInput/PasswordInput.component";
import TextInputAdapter from "../TextInput/TextInput.component";
const required = value => (value ? undefined : 'Required')

const SignIn = (props) => {
    const { setAuth, setPersist, persist } = useAuth()
    const { setProfileInfo } = useContext(DataContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/projects"
    
    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    const onSubmit = async (values, form) => {
        await axios.post(`${CONSTANTS.API_URL}api/auth/local/login`, values, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then( async (res) => {
                if (res.data?.success) {
                    setAuth({ status: true, userEmail: res.data?.userEmail, userId: res.data?.userId, profileType: res.data?.profile, accessToken: res.data?.accessToken })
                    res.data?.profileData
                        && Object.keys(res.data?.profileData).length !== 0
                        && setProfileInfo({ profileExists: true, ...res.data?.profileData})
                    toaster.success('Welcome! You\'ve been successfully logged in', {
                        duration: 2
                    })
                    form.reset()
                    navigate(from, { replace: true });
                    return { success: true }
                }
            })
            .catch(err => {
                toaster.danger(err?.response.status === 401 && "Wrong email or password")
                return { success: false, message: err }
            })
    }

    return (
        <div className="form-container-wrapper">
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, values, form, submitSucceeded, submitting }) => (
                    <form onSubmit={async event => {
                        await handleSubmit(event, form)
                    }} className="form-container">
                        <div>
                            <h3 className="signin-title">SIGN IN</h3>
                            <Field
                                component={TextInputAdapter}
                                name="email"
                                label="Email"
                                placeholder="youremail@emailprovider.com"
                                type="email"
                                autoComplete="off"
                                required
                                validate={required}
                            />
                            <Field
                                component={PasswordInput}
                                name="password"
                                label="Password"
                                required
                                validate={required}
                            />
                            <Field
                                component={Checkbox}
                                name="Persist"
                                label="Persist Session"
                                callback={togglePersist}
                            />
                        </div>
                        <div className="button-container">

                            {!submitting
                                ? <Button
                                    marginRight={16}
                                    color="#3366FF"
                                    border="1px solid #3366FF"
                                > Sign In </Button>
                                : <Spinner size={32} />}

                        </div>
                    </form>
                )}
            />
        </div>
    )
}

export default SignIn;

