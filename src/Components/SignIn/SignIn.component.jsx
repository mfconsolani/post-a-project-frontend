import React, { useContext } from "react";
import { Field, Form } from 'react-final-form'
import axios from 'axios'
import { TextInputField, Button, toaster, Spinner, InlineAlert } from 'evergreen-ui'
import './SignIn.styles.css'
import { useNavigate, useLocation } from "react-router-dom";
import CONSTANTS from "../../config";
import useAuth from "../../hooks/useAuth";
import DataContext from "../../DataContext";

const required = value => (value ? undefined : 'Required')

const TextInputAdapter = ({ input, ...rest }) => (
    <React.Fragment>
        <TextInputField {...input} {...rest}
            marginBottom={8}
            label={rest.label}
            placeholder={rest.placeholder}
            onChange={(event) => input.onChange(event)}
        />
        {rest.meta.error && rest.meta.touched && (
            <InlineAlert
                intent="danger"
                id="inline-alert-icon"
                marginBottom={24}
                size={300}
            >
                {rest.meta.error}
            </InlineAlert>
        )}
    </React.Fragment>
)


const SignIn = (props) => {
    const { setAuth } = useAuth()
    const { setProfileInfo } = useContext(DataContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/projects" 

    const onSubmit = async (values, form) => {
        await axios.post(`${CONSTANTS.API_URL}api/auth/local/login`, values, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then(res => {
                if (res.data?.success) {
                    setAuth({ status: true, userEmail: res.data?.userEmail, userId: res.data?.userId, profileType: res.data?.profile, accessToken: res.data?.accessToken })
                    const userProfile = res.data?.profileData
                        && Object.keys(res.data?.profileData).length !== 0 && JSON.stringify({ profileExists: true, ...res.data?.profileData })

                    userProfile && userProfile.length > 0 && localStorage.setItem('userProfile', userProfile)
                    res.data?.profileData
                        && Object.keys(res.data?.profileData).length !== 0
                        && setProfileInfo({ profileExists: true, ...res.data?.profileData })
                    toaster.success('Welcome! You\'ve been successfully logged in', {
                        duration: 2
                    })
                    form.reset()
                    navigate(from, {replace: true});
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
                                component={TextInputAdapter}
                                name="password"
                                label="Password"
                                type="password"
                                required
                                validate={required}
                            />
                        </div>
                        <div className="button-container">

                            {!submitting
                                ? <Button
                                    marginRight={16}
                                    color="#3366FF"
                                    border="1px solid #3366FF"
                                > Sign In
                                </Button>
                                : <Spinner size={32} />}

                        </div>
                    </form>
                )}
            />
        </div>
    )
}

export default SignIn;

