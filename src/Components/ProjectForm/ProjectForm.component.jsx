import React, { useEffect, useState } from "react";
import { Pane, Button, Paragraph, Textarea, TextInputField, Label } from 'evergreen-ui';
import { Field, Form } from 'react-final-form'
import './ProjectForm.styles.css'
import axios from 'axios'
import { MultiSelect } from "react-multi-select-component";

const TextInputAdapter = ({ input, ...rest }) => (
    <TextInputField display="flex" flexDirection="column"  marginY="1em" {...input} {...rest}
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

const Example = ({ input, ...rest }) => {
    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    ];
    const [selected, setSelected] = useState([]);
    const [skills, setSkills] = useState([])

    useEffect(() => {
        const projectsPublished = async () => {
            return await axios.get('http://localhost:8080/api/skills/')
              .then(res => {
                  console.log(res)
                  const existingSkills = res.data.map(element => {
                      return {label: element.skill, value: element.skill}
                  })
                setSkills(existingSkills)
              })
              .catch(err => console.log(err))
          }
          projectsPublished()
          return
    }, [])

    return (
        <Pane marginY="1em">
            <Label htmlFor={input.name} marginY="0.5em">{rest.label}</Label>

            {skills.length > 0 
            ? <MultiSelect
                // fontFamily="ui"
                fontSize="12px"
                {...rest}
                {...input}
                id={input.name}
                name={input.name}
                options={skills}
                value={selected}
                onChange={event => {
                    setSelected(event)
                    input.onChange(event)
                }}
                labelledBy="Select"
            />
            : <p>Loading skills</p>}
        </Pane>
    );
};


const ProjectForm = () => {

    const onSubmit = (event) => {
        console.log(event)
    }

    return (

        <Pane elevation={2} float="left" borderRadius="5px" padding="1rem" margin="1rem" minWidth="50vw">
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, values }) => (
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
                            component={Example}
                            name="skills"
                            label="Skills"
                            required
                        />

                        <Button
                            marginRight={16}
                            color="#3366FF"
                            border="1px solid #3366FF"
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