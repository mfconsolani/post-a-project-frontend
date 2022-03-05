import React from "react";
import { Field, Form } from 'react-final-form'
import axios from 'axios'
import { TextInputField, Button, toaster, Spinner } from 'evergreen-ui'
import './SignIn.styles.css'

const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})');

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


const SignIn = (props) => {
    const onSubmit = async values => {
        !validatePassword(values.password).isInvalid && await axios.post('http://localhost:8080/api/auth/local/login', values)
            .then(res => {
                if (res.data?.success) {
                    props.setStatus({ status: true, userEmail: res.data?.userEmail, userId: res.data?.userId })
                    console.log(props, props.status)
                    toaster.success('Welcome! You\'ve been successfully logged in')
                }
            })
            .catch(err => {
                toaster.danger(err?.response.status === 401 && "Wrong email or password")
            })
    }

    return (
        <div className="form-container-wrapper">
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, values, form, submitSucceeded, submitting }) => (
                    <form onSubmit={async event => {
                        await handleSubmit(event)
                        if (submitSucceeded) {
                            form.reset()
                        }
                    }} className="form-container">
                        <div>
                            <h3 className="signin-title">SIGN IN</h3>
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

                            {!submitting
                                ? <Button
                                    marginRight={16}
                                    color="#3366FF"
                                    border="1px solid #3366FF"
                                // onClick={form.restart}
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

