import React, { useEffect, useState } from "react";
import { Pane, Button, Spinner, Textarea, InlineAlert, TextInputField, Label } from 'evergreen-ui';
import { Field, Form } from 'react-final-form'
import './ProjectForm.styles.css'
import axios from 'axios'
import { MultiSelect } from "react-multi-select-component";
import DateTimePicker from 'react-datetime-picker';

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
    const [selected, setSelected] = useState([]);
    const [skills, setSkills] = useState([])


    useEffect(() => {
        const getSkills = async () => {
            return await axios.get('http://localhost:8080/api/skills/')
                .then(res => {
                    console.log(res)
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
                    labelledBy="Select"
                />
                : <Spinner size={24} />}
            {(rest.validationMessage && rest.validationMessage.length) && <InlineAlert intent="danger">
                {rest.validationMessage}
            </InlineAlert>}

        </Pane>
    );
};

const RolesMultiSelect = ({ input, meta, ...rest }) => {
    const [selected, setSelected] = useState([]);
    const [roles, setRoles] = useState([])

    useEffect(() => {
        const getRoles = async () => {
            return await axios.get('http://localhost:8080/api/roles/')
                .then(res => {
                    console.log(res)
                    const existingSkills = res.data.map(element => {
                        return { label: element.role, value: element.role }
                    })
                    setRoles(existingSkills)
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
                    // fontFamily="ui"
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

const DatePicker = ({ input, ...rest }) => {
    const date = new Date();
    const oneWeekAfter = new Date(date.getTime() + (86400000 * 7))

    return (
        <Pane>
            <Label marginBottom="10em" >{rest.label}</Label>
            <Pane>
                <DateTimePicker
                    maxDate={oneWeekAfter}
                    minDate={date}
                    className="custom-date-picker-style"
                    {...rest} {...input}
                    format="dd-MM-yy h:mm:ss a"
                    name={input.name}
                    onChange={(e) => input.onChange(e)} />
            </Pane>
        </Pane>
    )
}
//TODO
//complete company field when I have the proper props
//implement axios.post on form submission
//isolate components

const ProjectForm = (props) => {
    const [errors, setErrors] = useState({})

    const onSubmit = (event) => {
        console.log(event)
    }
    return (

        <Pane elevation={4} float="left" borderRadius="5px" padding="1rem" marginY="4em" minWidth="50vw">
            <Form
                onSubmit={onSubmit}
                initialValues={{ owner: props.user.userEmail }}
                render={({ handleSubmit, values, submitting, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            component={TextInputAdapter}
                            name="title"
                            label="Project Title"
                            required
                        />
                        <Field
                            component={TextAreaAdapter}
                            name="body"
                            label="Project Description"
                            required
                        />
                        <Field
                            component={TextInputAdapter}
                            name="location"
                            label="Based"
                            required
                        />
                        <Field
                            component={DatePicker}
                            maxDetail="minute"
                            disableClock={true}
                            name="expiresBy"
                            label="Offer expiring date"
                            required
                        />
                        <Field
                            component={SkillsMultiSelect}
                            name="skills"
                            label="Skills"
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
                            setErrors={setErrors}
                            beforeSubmit={() => {
                                (!values.roles || values.roles.length < 1) && setErrors({ roles: true })
                                return (!values.roles || values.roles.length < 1) ? false : true
                            }}
                            validationMessage={(errors && errors.roles) && "Must select at least one role"}

                        />
                        <Field
                            component={TextInputAdapter}
                            name="duration"
                            label="Duration of the assignment"
                            placeholder="i.e.: 3 months; 10 days; 1 year"
                            required
                        />
                        {/* <Field
                            component={TextInputAdapter}
                            name="company"
                            label="Company name"
                            disabled
                        /> */}
                        <Field
                            component={TextInputAdapter}
                            name="owner"
                            label="Project owner contact"
                            disabled
                        />
                        <Button
                            marginRight={16}
                            color="#3366FF"
                            border="1px solid #3366FF"
                            disabled={submitting || pristine}
                        >
                            Publish project
                        </Button>
                    </form>
                )}
            />
        </Pane>
    )
}

//company, role, skill, duration, expiresBy, likesCount, location, projectOwner


export default ProjectForm;