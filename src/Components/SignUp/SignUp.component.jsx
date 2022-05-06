import React from "react";
import { Field, Form } from 'react-final-form'
import axios from 'axios'
import { TextInputField, Button, toaster, Spinner, Text, Paragraph } from 'evergreen-ui'
import './SignUp.styles.css'
import { Link } from 'react-router-dom'

//TODO
//Implement second password check
//Prevent isInvalid from popping at the very first time: use onBlur


let strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})');

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

const required = value => (value ? undefined : 'Required')

const TextInputAdapter = ({ input, ...rest }) => {
    // console.log(input, rest.meta.error, rest.meta.touched)

    return (
            <TextInputField {...input} {...rest}
                label={rest.label}
                placeholder={rest.placeholder}
                onChange={(event) => input.onChange(event)}
                validationMessage={rest.meta.error && rest.meta.touched && rest.errormessage}
                isInvalid={rest.meta.error && rest.meta.touched ? true : false}
            />
    )
}


const SignUp = () => {
    const onSubmit = async (values, form) => {
        // console.log(values.password, values.passwordRepeat, values.passwordRepeat === values.password, !validatePassword(values.password, values.passwordRepeat).isInvalid, validatePassword(values.password).isInvalid )
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
                render={({ handleSubmit, values, submitting, form }) => (
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
                                // validate="required"
                                validate={required}

                            />

                            <Field
                                marginBottom="0.3em"
                                component={TextInputAdapter}
                                name="password"
                                label="Password"
                                type="password"
                                required
                                validationMessage={values.password && validatePassword(values.password).message}
                                isInvalid={values.password && validatePassword(values.password).isInvalid}
                            />
                            <Field
                                component={TextInputAdapter}
                                name="passwordRepeat"
                                label="Repeat password"
                                type="password"
                                validate={required}
                                errormessage="This field is required"
                            />
                            {values.password === values.passwordRepeat ? <span>capo</span> : <span>pelotudo</span>}
                            <Paragraph marginBottom="24px" size={300}>Already signed? <Link to="/signin">Log in</Link></Paragraph>
                        </div>
                        <div className="button-container">
                            {!submitting
                                ? <Button marginRight={16} appearance="primary" intent="none"
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

