import React from "react";
import { Field, Form } from 'react-final-form'
import axios from 'axios'
import { Button, toaster, Spinner, Paragraph } from 'evergreen-ui'
import './SignUp.styles.css'
import { Link, useNavigate } from 'react-router-dom'
import CONSTANTS from '../../config.js'
import useAuth from "../../hooks/useAuth";
import PasswordInput from '../PasswordInput/PasswordInput.component'
import TextInputAdapter from '../TextInput/TextInput.component'
import SwitchInput from '../SwitchInput/SwitchInput.component';

let strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{10,})');

const checkPass = value => strongRegex.test(value) ? undefined : 'Password must include: at least one uppercase letter, one lowercase letter, one number and one symbol and have at least 8 characters'
const required = value => (value ? undefined : 'Required')
const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined)

const validatePassword = (password, passwordRepeat = null) => {
    if (!strongRegex.test(password)) {
        const message = "Password must include: at least one capital letter, one lowercase letter, one number and one special character (!@#$%^&*_) and have at least 8 characters"
        return { isInvalid: true, message }
    }
    return { isInvalid: false }
}

const SignUp = (props) => {
    const { setAuth } = useAuth()
    let navigate = useNavigate()
    const onSubmit = async (values, form) => {
        !validatePassword(values.password, values.passwordRepeat).isInvalid
            && await axios.post(`${CONSTANTS.API_URL}api/auth/local/signup`, values, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
                .then(res => {
                    if (res.data?.success) {
                        setAuth({ status: true, userEmail: res.data?.payload.email, userId: res.data?.payload.id, profileType: res.data?.payload.profileType })
                        toaster.success('Welcome! You\'ve been successfully signed up')
                        form.reset()
                        navigate('/candidates')
                    } else {
                        toaster.warning(res.data.message)
                    }
                })
                .catch(err => {
                    toaster.danger(err?.response.status === 409
                        ? "Email might already be in use"
                        : "Unexpected error when trying to sign up")
                    })
    }

    return (
        <div className="form-container-wrapper">
            <Form
                onSubmit={onSubmit}
                validate={values => {
                    const errors = {};
                    if (values.password !== values.passwordRepeat) {
                        errors.passwordRepeat = "Passwords must match";
                    }
                    return errors;
                }}
                render={({ handleSubmit, values, submitting, form, pristine }) => (
                    <form onSubmit={async event => await handleSubmit(event, form)}
                        className="form-container">
                        <div>
                            <h3 className="signup-title">SIGN UP</h3>
                            <Field
                                component={TextInputAdapter}
                                name="email"
                                autoComplete="off"
                                label="Email"
                                placeholder="youremail@emailprovider.com"
                                type="email"
                                required
                                errormessage="This field is required"
                                validate={required}
                            />
                            <Field
                                component={TextInputAdapter}
                                name="username"
                                autoComplete="off"
                                label="Username"
                                placeholder="i.e.: pepitopepe89 (optional field)"
                                type="text"
                            />

                            <Field
                                component={PasswordInput}
                                name="password"
                                label="Password"
                                required
                                validate={composeValidators(required, checkPass)}
                            />
                            <Field
                                component={PasswordInput}
                                name="passwordRepeat"
                                label="Repeat password"
                                required
                                validate={composeValidators(required, checkPass)}
                            />
                            <Paragraph marginBottom="18px" size={300}>Already signed? <Link to="/signin">Log in</Link></Paragraph>
                            <Field
                                component={SwitchInput}
                                truetext="Yes"
                                falsetext="No"
                                text="Signing up as a company?"
                                name="profileType"
                                defaultValue="USER"
                            />
                        </div>
                        <div className="button-container">
                            {!submitting
                                ? <Button disabled={pristine || submitting} marginRight={16} appearance="primary" intent="none"
                                >Sign Up!</Button>
                                : <Spinner size={32} />}
                        </div>
                    </form>
                )}
            />
        </div>
    )
}

export default SignUp;

