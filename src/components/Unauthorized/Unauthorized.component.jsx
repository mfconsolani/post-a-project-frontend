import { Alert } from "evergreen-ui";

export const Unauthorized = (props) => {
    return (
        <Alert intent="danger" title="Unauthorized route" margin={16}>
            {props.message || "Sorry! This option is only available for certain type of users 😔"}
        </Alert>
    )
}

