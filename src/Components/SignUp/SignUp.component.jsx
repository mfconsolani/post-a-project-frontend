import React from "react";
import { Field, Form } from 'react-final-form'
import axios from 'axios'
// import { TextInputField, Button } from 'evergreen-ui'
import './SignUp.styles.css'

// const TextInputAdapter = ({ input, ...rest }) => (
//     <TextInputField {...input} {...rest}
//         label={rest.label}
//         placeholder={rest.placeholder}
//         onChange={(event) => input.onChange(event)}
//     />
// )

const SignUp = () => {
    const onSubmit = async values => {
        console.log(values)
        return await axios.post('http://localhost:8080/api/auth/local/signup', values).then(res => console.log(res)).catch(err => console.log(err))
    }

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="form-container">
                    <div>
                        <h3>Sign Up Form</h3>
                        {/* <Field
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
                        />
                    </div>
                    <Button marginRight={16} appearance="primary" intent="success">
                        Sign Up!
                    </Button> */}
                    <Field
                            component="input"
                            name="email"
                            label="Email"
                            placeholder="youremail@emailprovider.com"
                            type="email"
                            required
                        />
                        <Field
                            component="input"
                            name="password"
                            label="Password"
                            type="password"
                            required
                        />
                    </div>
                    <button marginRight={16} appearance="primary" intent="success">
                        Sign Up!
                    </button>
                </form>
            )}
        />
    )
}

export default SignUp;

