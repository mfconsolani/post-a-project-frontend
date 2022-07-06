import React, { useContext, useEffect, useState } from "react";
import { Pane, Button, Alert, toaster } from 'evergreen-ui';
import { Field, Form } from 'react-final-form'
import './ProfileForm.styles.css'
import CONSTANTS from "../../config";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import DataContext from "../../context/DataContext";
import { useLocation, useNavigate } from "react-router";
import useLogout from "../../hooks/useLogout";
import { FileUploader } from '../UploadFile/UploadFile.component';
import useFetchFile from '../../hooks/useFetchFile'
import TextInputAdapter from "../TextInput/TextInput.component";
import TextAreaAdapter from "../TextArea/TextArea.component";
import MultiSelectInput from "../MultiSelect/MultiSelect.component";
import { DatePickerCustom as DatePicker } from "../DatePicker/DatePicker.component";
import { Unauthorized } from "../Unauthorized/Unauthorized.component";
import ProfileAvatar from '../Avatar/Avatar.component'
import DownloadButton from "../DownloadButton/DownloadButton.component";

const CandidateProfileForm = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const { setProfileInfo, profileInfo } = useContext(DataContext)
    const location = useLocation()
    const navigate = useNavigate()
    const logout = useLogout()
    const [errors, setErrors] = useState({})
    const [isProfileComplete, setIsProfileComplete] = useState()
    const { avatar, resume, fetchAvatar, fetchResume } = useFetchFile()

    useEffect(() => {
        fetchResume(profileInfo.resume)
        fetchAvatar(profileInfo.avatar)
    }, [])

    const onSubmit = async (event) => {
        try {
            const createProfile = axiosPrivate.post(`${CONSTANTS.API_URL}api/profile/user/${auth.userId}`, event)
            const createProfileResponse = await createProfile
            if (createProfileResponse.data.message === "Profile created") {
                setIsProfileComplete(true)
                setProfileInfo({ profileExists: true, ...createProfileResponse.data.payload })
                toaster.success('Profile completed', {
                    duration: 3,
                    id: 'forbidden-action'
                })
            } else if (createProfileResponse.data.message === "Profile updated") {
                setProfileInfo({ profileExists: true, ...createProfileResponse.data.payload })
                toaster.success('Profile successfully updated', {
                    duration: 3,
                    id: 'forbidden-action'
                })
            }
        } catch (err) {
            console.log(err)
            logout()
            navigate('/signin', { state: { from: location }, replace: true });
            toaster.danger('Error occurred when creating or updating profile', {
                duration: 3
            })
        }
    }

    return (
        <React.Fragment>
            {auth && !auth.status ? <Unauthorized />
                : <Pane elevation={4} float="left" borderRadius="5px" padding="1rem" marginX="1rem" marginTop="5em" marginBottom="2em" minWidth="50vw">
                    {(profileInfo && Object.keys(profileInfo).length > 1) | isProfileComplete
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
                            email: auth.userEmail,
                            firstName: profileInfo.firstName,
                            lastName: profileInfo.lastName,
                            country: profileInfo.country,
                            city: profileInfo.city,
                            birthday: profileInfo.birthday,
                            description: profileInfo.description,
                            skills: profileInfo.skills && profileInfo.skills.map(element => {
                                return { label: element.skill, value: element.skill }
                            }),
                            roles: profileInfo.roles && profileInfo.roles.map(element => {
                                return { label: element.role, value: element.role }
                            }),
                            phone: profileInfo.phoneNumber
                        }}
                        keepDirtyOnReinitialize
                        render={({ handleSubmit, values, submitting, pristine }) => (
                            <form onSubmit={handleSubmit}>
                                <ProfileAvatar avatar={avatar} />
                                <Field
                                    component={TextInputAdapter}
                                    name="firstName"
                                    label="Name"
                                    required
                                />
                                <Field
                                    component={TextInputAdapter}
                                    name="lastName"
                                    label="Last name"
                                    required
                                />
                                <Field
                                    component={TextInputAdapter}
                                    name="country"
                                    label="Country of residence"
                                    required
                                />
                                <Field
                                    component={TextInputAdapter}
                                    name="city"
                                    label="City"
                                    placeholder="Madrid; Buenos Aires; Barcelona"
                                    required
                                />
                                <Field
                                    component={DatePicker}
                                    disableClock={true}
                                    name="birthday"
                                    label="Birthday"
                                    required
                                />
                                <Field
                                    component={TextAreaAdapter}
                                    name="description"
                                    label="Summary"
                                    placeholder="Tell us a bit about your self, skills, hobbies and whatever you want!"
                                    required
                                />
                                <Field
                                    component={MultiSelectInput}
                                    name="skills"
                                    label="Skills"
                                    dataType="skill"
                                    placeholder="Skills you would be confident with"
                                    setErrors={setErrors}
                                    beforeSubmit={() => {
                                        (!values.skills || values.skills.length < 1) && setErrors({ skills: true })
                                        return (!values.skills || values.skills.length < 1) ? false : true
                                    }}
                                    validationMessage={(errors && errors.skills) && "Must select at least one skill"}
                                />
                                <Field
                                    component={MultiSelectInput}
                                    name="roles"
                                    label="Roles"
                                    dataType="role"
                                    placeholder="Roles you would be confident with"
                                    setErrors={setErrors}
                                    beforeSubmit={() => {
                                        (!values.roles || values.roles.length < 1) && setErrors({ roles: true })
                                        return (!values.roles || values.roles.length < 1) ? false : true
                                    }}
                                    validationMessage={(errors && errors.roles) && "Must select at least one role"}

                                />
                                <Field
                                    component={TextInputAdapter}
                                    name="phone"
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
                                    Save profile
                                </Button>
                            </form>
                        )}
                    />
                    <Pane display="flex" justifyContent="space-around" alignItems="center" marginY="1em" >
                        <FileUploader file={resume} />
                        <DownloadButton resume={resume} />
                    </Pane>
                </Pane>
            }
        </React.Fragment >
    )
}

export default CandidateProfileForm;