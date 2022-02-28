import React from "react";
import { Pane, Button, Paragraph, Textarea, TextInputField, Label } from 'evergreen-ui';
import { Field, Form } from 'react-final-form'

const TextInputAdapter = ({ input, ...rest }) => (
    <TextInputField {...input} {...rest}
        label={rest.label}
        placeholder={rest.placeholder}
        onChange={(event) => input.onChange(event)}
    />
)

const TextAreaAdapter = ({ input, ...rest }) => {
    // console.log(input.name)
    return (
        <Pane display="flex" flexDirection="column">
            <Label htmlFor={input.name}>
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
                        {/* <Field
                            component={TextInputAdapter}
                            name="title"
                            label="Project Title"
                            required
                        /> */}
                        
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