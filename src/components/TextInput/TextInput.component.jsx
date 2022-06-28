import { TextInputField } from "evergreen-ui" 

const TextInputAdapter = ({ input, ...rest }) => (
    <TextInputField display="flex" flexDirection="column" marginY="1em"
        {...input} {...rest}
        label={rest.label}
        placeholder={rest.placeholder}
        onChange={(event) => input.onChange(event)}
    />
)

export default TextInputAdapter