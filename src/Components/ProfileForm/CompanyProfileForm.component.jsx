import React, { useState } from "react";
import { Pane, Button, Textarea, TextInputField, Label, Alert, toaster } from 'evergreen-ui';
import { Field, Form } from 'react-final-form'
import './ProfileForm.styles.css'
import axios from 'axios'

//TODO
//When I modify the profile info, on submit, the updated values should update as well, but they dont
//So if you change of view and go back to profile, you get the old initial values, not the updated ones
//until you login again

const TextInputAdapter = ({ input, ...rest }) => (
    <TextInputField display="flex" flexDirection="column" marginY="1em"
        {...input} {...rest}
        label={rest.label}
        placeholder={rest.placeholder}
        onChange={(event) => input.onChange(event)}
    />
)

const TextAreaAdapter = ({ input, ...rest }) => {
    return (
        <Pane display="flex" flexDirection="column" marginY="1em">
            <Label htmlFor={input.name} marginY="0.5em" >
                {rest.label}
            </Label>
            <Textarea {...input} {...rest}
                id={input.name}
                placeholder={rest.placeholder}
                onChange={(event) => input.onChange(event)}
            />
        </Pane>
    )
}

//TODO
//implement axios.post on form submission
//isolate components

const CompanyProfileForm = (props) => {
    const [isProfileComplete, setIsProfileComplete] = useState()

    const onSubmit = async (event) => {
        try {
            const createProfile = axios.post(`http://localhost:8080/api/profile/company/${props.user.userId}`, event)
            const createProfileResponse = await createProfile
            if (createProfileResponse.data.message === "Profile created") {
                setIsProfileComplete(true)
                props.setProfile({profileExists: true, ...createProfileResponse.data.payload})
                localStorage.setItem('userProfile',JSON.stringify({profileExists: true, ...createProfileResponse.data.payload}))
                toaster.success('Profile completed', {
                    duration: 3,
                    id: 'forbidden-action'
                })
            } else if (createProfileResponse.data.message === "Profile updated") {
                props.setProfile({profileExists: true, ...createProfileResponse.data.payload})
                localStorage.setItem('userProfile',JSON.stringify({profileExists: true, ...createProfileResponse.data.payload}))
                toaster.success('Profile successfully updated', {
                    duration: 3,
                    id: 'forbidden-action'
                })
            }
        } catch (err) {
            console.log(err)
            toaster.danger('Error occurred when creating or updating profile', {
                duration: 3
            })
        }
    }

    return (
        <React.Fragment>
            {props.user && !props.user.status ?
                <Alert intent="danger" title="Unauthorized route" margin={16}>
                    Sorry! This option is only available for certain type of users 😔
                </Alert>
                : <Pane elevation={4} float="left" borderRadius="5px" padding="1rem" marginX="1rem" marginTop="5em" marginBottom="2em" minWidth="50vw">
                    {(props.profile && Object.keys(props.profile).length > 1) | isProfileComplete
                        ? <Alert zIndex="0"
                            intent="success"
                            title="Your profile is up to date! 😁"
                            marginBottom={20}
                        >Your profile is complete. You are now visible to the companies </Alert>
                        : <Alert zIndex="0"
                            intent="warning"
                            title="Your profile is not complete 😩"
                            marginBottom={20}
                        >We recommend you complete your profile for more visibility and new features!
                        </Alert>
                    }

                    <Form
                        onSubmit={onSubmit}
                        initialValues={{
                            email: props.user.userEmail,
                            ...props.profile
                        }}
                        keepDirtyOnReinitialize
                        render={({ handleSubmit, values, submitting, pristine }) => (
                            <form onSubmit={handleSubmit}>
                                <Field
                                    component={TextInputAdapter}
                                    name="employees"
                                    label="Number of employees"
                                    required
                                />
                                <Field
                                    component={TextInputAdapter}
                                    name="industry"
                                    label="Industry/Sector"
                                    required
                                />
                                <Field
                                    component={TextInputAdapter}
                                    name="country"
                                    label="Country of residence"
                                    required
                                />
                                <Field
                                    component={TextAreaAdapter}
                                    name="description"
                                    label="Description"
                                    placeholder="Provide information about what you do, your values, your team, your goals, etc"
                                    required
                                />
                                <Field
                                    component={TextInputAdapter}
                                    name="phoneNumber"
                                    label="Phone number"
                                    placeholder="Please add the country code"
                                    required
                                />
                                <Field
                                    component={TextInputAdapter}
                                    name="email"
                                    label="Contact email"
                                    disabled
                                />
                                <Button
                                    marginRight={16}
                                    color="#3366FF"
                                    border="1px solid #3366FF"
                                    disabled={submitting || pristine}
                                >
                                    Save information
                                </Button>
                            </form>
                        )}
                    />
                </Pane>
            }
        </React.Fragment>
    )
}

export default CompanyProfileForm;