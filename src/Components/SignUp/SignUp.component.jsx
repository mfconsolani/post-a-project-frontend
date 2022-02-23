import React from "react";
import { Field, Form } from 'react-final-form'
import axios from 'axios'
import { TextInputField, Button, toaster } from 'evergreen-ui'
import './SignUp.styles.css'

let strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})');

const validatePassword = (value) => {
    if (!strongRegex.test(value)) {
        const message = "Password must include: at least one capital letter, one lowercase letter, one number and one symbol and have at least 8 characters"
        return { isInvalid: true, message }
    }
    return { isInvalid: false }
}


const TextInputAdapter = ({ input, ...rest }) => (
    <TextInputField {...input} {...rest}
        label={rest.label}
        placeholder={rest.placeholder}
        onChange={(event) => input.onChange(event)}
    />
)


const SignUp = () => {
    const onSubmit = async values => {
        !validatePassword(values.password).isInvalid && await axios.post('http://localhost:8080/api/auth/local/signup', values)
        .then(res => {
            if (res.data?.success){
                // console.log(props)
                toaster.success('Welcome! You\'ve been successfully signed up')
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
                render={({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit} className="form-container">
                        <div>
                            <h3 className="signup-title">SIGN UP</h3>
                            <Field
                                component={TextInputAdapter}
                                name="email"
                                label="Email"
                                placeholder="youremail@emailprovider.com"
                                type="email"
                                required
                            />
                            <Field
                                component={TextInputAdapter}
                                name="password"
                                label="Password"
                                type="password"
                                required
                                validationMessage={values.password && validatePassword(values.password).message}
                                isInvalid={values.password && validatePassword(values.password).isInvalid}
                            />
                        </div>
                        <div className="button-container">
                            
                            <Button
                                marginRight={16}
                                appearance="primary"
                                intent="none"
                            >
                                Sign Up!
                            </Button>
                        </div>
                    </form>
                )}
            />
        </div>
    )
}

export default SignUp;

