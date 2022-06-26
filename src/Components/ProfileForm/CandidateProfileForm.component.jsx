import React, { useContext, useEffect, useState } from "react";
import { Pane, Button, Spinner, Textarea, InlineAlert, TextInputField, Label, Alert, toaster, Avatar } from 'evergreen-ui';
import { Field, Form } from 'react-final-form'
import './ProfileForm.styles.css'
import axios from 'axios'
import { MultiSelect } from "react-multi-select-component";
import DatePicker from 'react-date-picker';
import CONSTANTS from "../../config";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import DataContext from "../../context/DataContext";
import { useLocation, useNavigate } from "react-router";
import useLogout from "../../hooks/useLogout";
import { FileUploader } from '../UploadFile/UploadFile.component';
import usePostFile from "../../hooks/usePostFile";
import { Buffer } from 'buffer';

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

const SkillsMultiSelect = ({ input, ...rest }) => {
    const [selected, setSelected] = useState(rest.meta.initial || []);
    const [skills, setSkills] = useState([])

    useEffect(() => {
        const getSkills = async () => {
            return await axios.get(`${CONSTANTS.API_URL}api/skills/`)
                .then(res => {
                    const existingSkills = res.data.map(element => {
                        return { label: element.skill, value: element.skill }
                    })
                    setSkills(existingSkills)
                })
                .catch(err => console.log(err))
        }
        getSkills()
        return
    }, [])

    return (
        <Pane marginY="1em">
            <Label htmlFor={input.name} marginY="0.5em">{rest.label}</Label>
            {skills.length > 0
                ? <MultiSelect
                    fontSize="12px"
                    {...rest}
                    {...input}
                    id={input.name}
                    name={input.name}
                    options={skills}
                    value={selected}
                    onChange={event => {
                        setSelected(event)
                        rest.setErrors({ skills: false })
                        input.onChange(event)
                    }}
                    overrideStrings={{ "selectSomeItems": rest.placeholder }}
                    labelledBy="Select"
                />
                : <Spinner size={24} />}
            {(rest.validationMessage && rest.validationMessage.length) && <InlineAlert intent="danger">
                {rest.validationMessage}
            </InlineAlert>}

        </Pane>
    );
};

const RolesMultiSelect = ({ input, ...rest }) => {
    const [selected, setSelected] = useState(rest.meta.initial || []);
    const [roles, setRoles] = useState([])

    useEffect(() => {
        const getRoles = async () => {
            return await axios.get(`${CONSTANTS.API_URL}api/roles/`)
                .then(res => {
                    const existingRoles = res.data.map(element => {
                        return { label: element.role, value: element.role }
                    })
                    setRoles(existingRoles)
                })
                .catch(err => console.log(err))
        }
        getRoles()
        return
    }, [])


    return (
        <Pane marginY="1em" >
            <Label htmlFor={input.name} marginY="0.5em">{rest.label}</Label>

            {roles.length > 0
                ? <MultiSelect
                    fontSize="12px"
                    {...rest}
                    {...input}
                    id={input.name}
                    name={input.name}
                    options={roles}
                    value={selected}
                    onChange={event => {
                        setSelected(event)
                        rest.setErrors({ roles: false })
                        input.onChange(event)
                    }}
                    overrideStrings={{ "selectSomeItems": rest.placeholder }}
                    labelledBy="Select"
                />
                : <Spinner size={24} />}
            {(rest.validationMessage && rest.validationMessage.length)
                && <InlineAlert marginY="0.5em" className="inline-alert" intent="danger">
                    {rest.validationMessage}
                </InlineAlert>}
        </Pane>
    );
};

const DatePickerCustom = ({ input, ...rest }) => {
    // const date = new Date();
    // const oneWeekAfter = new Date(date.getTime() + (86400000 * 7))

    return (
        <Pane>
            <Label marginBottom="10em" >{rest.label}</Label>
            <Pane>
                <DatePicker
                    // maxDate={oneWeekAfter}
                    // minDate={date}
                    className="custom-date-picker-style"
                    {...rest} {...input}
                    format="dd-MM-yy"
                    name={input.name}
                    onChange={(e) => input.onChange(e)} />
            </Pane>
        </Pane>
    )
}

const CandidateProfileForm = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const { uploadFile } = usePostFile()
    const { setProfileInfo, profileInfo } = useContext(DataContext)
    const location = useLocation()
    const navigate = useNavigate()
    const logout = useLogout()
    const [errors, setErrors] = useState({})
    const [isProfileComplete, setIsProfileComplete] = useState()
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        const fetchAvatar = async () => {
            const avatarFile = await axiosPrivate.get(`${CONSTANTS.API_URL}api/profile/user/file/avatar/${profileInfo.avatar}`, { responseType: 'arraybuffer' })
            const base64ImageString = Buffer.from(avatarFile.data, 'binary').toString('base64')
            setAvatar("data:image/*;base64," + base64ImageString)
        }
        fetchAvatar()
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
            {auth && !auth.status ?
                <Alert intent="danger" title="Unauthorized route" margin={16}>
                    Sorry! This option is only available for certain type of users 😔
                </Alert>
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
                                <label htmlFor="avatar-input">
                                    {avatar ? <Avatar cursor="pointer" name={auth.userEmail} size={100} marginRight={16} marginTop={8} src={avatar} borderRadius="40%"
                                    /> : <Spinner size={50} />}
                                    <input id="avatar-input" onChange={async (e) => {
                                        console.log(e.target.files[0])
                                        return await uploadFile({ file: e.target.files[0], userEmail: auth.userEmail, fileType: "avatar" })
                                    }} type="file" accept="image/*" style={{
                                        display: "none"
                                    }}>
                                    </input>
                                </label>
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
                                    component={DatePickerCustom}
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
                                    component={SkillsMultiSelect}
                                    name="skills"
                                    label="Skills"
                                    placeholder="Skills you would be confident with"
                                    setErrors={setErrors}
                                    beforeSubmit={() => {
                                        (!values.skills || values.skills.length < 1) && setErrors({ skills: true })
                                        return (!values.skills || values.skills.length < 1) ? false : true
                                    }}
                                    validationMessage={(errors && errors.skills) && "Must select at least one skill"}
                                />
                                <Field
                                    component={RolesMultiSelect}
                                    name="roles"
                                    label="Roles"
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
                    <FileUploader />
                </Pane>
            }
        </React.Fragment >
    )
}

export default CandidateProfileForm;