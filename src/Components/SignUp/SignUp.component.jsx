import React from "react";
import { Field, Form } from 'react-final-form'
import axios from 'axios'
import {
    TextInputField, Button, toaster, Spinner, Switch,
    Text, Paragraph,
    InlineAlert, Pane, Small, Nudge as Pulsar
} from 'evergreen-ui'
import './SignUp.styles.css'
import { Link, useNavigate } from 'react-router-dom'


//TODO
//Add view password button
//Add input to assign username
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


const ControlledSwitchInput = ({ input, ...rest }) => {
    const [checked, setChecked] = React.useState(false)
    // console.log("input", input, "rest", rest)
    // React.useEffect(() => {
    //     console.log(checked)
    // }, [checked])

    return (
        <Pane display="flex" flexDirection="column" alignItems="end" marginBottom="18px">
            <Pulsar isShown={true}
                tooltipContent='Pick "yes" if you want to register your company, 
                start-up or NGO. For those registering just as a candidate, no need to switch anything'>
                <Text>
                    <Small>
                        <b>{rest.text}</b>
                    </Small>
                </Text>
            </Pulsar>
            <Pane display="flex" alignItems="center">
                <Text>
                    <Small marginRight="0.5em">{rest.falsetext}</Small>
                </Text>
                <Switch {...input} {...rest}
                    hasCheckIcon
                    checked={checked}
                    onChange={(e) => {
                        setChecked(e.target.checked)
                        input.onChange(e.target.checked ? "COMPANY" : "USER")
                    }}
                    display="inline-block"
                />
                <Text>
                    <Small marginLeft="0.5em">{rest.truetext}</Small>
                </Text>
            </Pane>
        </Pane>
    )
}

const TextInputAdapter = ({ input, ...rest }) => {

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


const SignUp = (props) => {
    let navigate = useNavigate()
    const onSubmit = async (values, form) => {
        // console.log(values)
        !validatePassword(values.password, values.passwordRepeat).isInvalid
            && await axios.post(`${process.env.REACT_APP_API_URL}api/auth/local/signup`, values)
                .then(res => {
                    if (res.data?.success) {
                        props.setStatus({ status: true, userEmail: res.data?.payload.email, userId: res.data?.payload.id, profileType: res.data?.payload.profileType })

                        toaster.success('Welcome! You\'ve been successfully signed up')
                        // console.log(res.data)
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
                                label="Username"
                                placeholder="i.e.: pepitopepe89 (optional field)"
                                type="text"
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
                            <Paragraph marginBottom="18px" size={300}>Already signed? <Link to="/signin">Log in</Link></Paragraph>
                            <Field
                                component={ControlledSwitchInput}
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

