import React from "react";
import { Field, Form } from 'react-final-form'
import axios from 'axios'
import { TextInputField, Button, toaster, Spinner, Text, Paragraph, InlineAlert } from 'evergreen-ui'
import './SignUp.styles.css'
import { Link } from 'react-router-dom'

//TODO
//Implement second password check
//Prevent isInvalid from popping at the very first time: use onBlur


let strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})');

const checkPass = value => strongRegex.test(value) ? undefined : 'Password must include: at least one uppercase letter, one lowercase letter, one number and one symbol and have at least 8 characters'
const required = value => (value ? undefined : 'Required')
const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined)

const validatePassword = (password, passwordRepeat = null) => {
    if (!strongRegex.test(password)) {
        const message = "Password must include: at least one capital letter, one lowercase letter, one number and one symbol and have at least 8 characters"
        return { isInvalid: true, message }
        // } else if (strongRegex.test(password) && passwordRepeat !== password){
        //     // console.log(password, passwordRepeat, passwordRepeat === password)
        //     const message = "Passwords are different"
        //     return { isInvalid: true, message }
    }
    return { isInvalid: false }
}

const TextInputAdapter = ({ input, ...rest }) => {
    // console.log(input, rest.meta.error, rest.meta.touched)

    return (
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
}


const SignUp = () => {
    const onSubmit = async (values, form) => {
        !validatePassword(values.password, values.passwordRepeat).isInvalid
            && await axios.post('http://localhost:8080/api/auth/local/signup', values)
                .then(res => {
                    if (res.data?.success) {
                        toaster.success('Welcome! You\'ve been successfully signed up')
                        console.log(res.data)
                        form.reset()
                    } else {
                        toaster.warning(res.data.message)
                    }
                })
                .catch(err => {
                    toaster.danger(err?.response.status === 409 && "Email might already be in use")
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
                    <form onSubmit={async event => {
                        await handleSubmit(event, form)
                    }} className="form-container">
                        <div>
                            <h3 className="signup-title">SIGN UP</h3>
                            <Field
                                component={TextInputAdapter}
                                name="email"
                                label="Email"
                                placeholder="youremail@emailprovider.com"
                                type="email"
                                required
                                errormessage="This field is required"
                                validate={required}
                            />

                            <Field
                                marginBottom="0.3em"
                                component={TextInputAdapter}
                                name="password"
                                label="Password"
                                type="password"
                                required
                                validate={composeValidators(required, checkPass)}
                            />
                            <Field
                                component={TextInputAdapter}
                                name="passwordRepeat"
                                label="Repeat password"
                                type="password"
                                required
                                validate={composeValidators(required, checkPass)}
                            />
                            <Paragraph marginBottom="24px" size={300}>Already signed? <Link to="/signin">Log in</Link></Paragraph>
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

