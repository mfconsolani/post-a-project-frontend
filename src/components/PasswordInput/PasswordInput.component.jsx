import React from "react"
import { EyeOpenIcon, InlineAlert, EyeOffIcon, Label, Pane } from "evergreen-ui"
import './PasswordInput.styles.css'

const PasswordInput = ({ input, ...rest }) => {
    const [passwordType, setPasswordType] = React.useState("password")

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <React.Fragment>
            <Pane marginBottom={8}>
                <Pane marginBottom="0.3em">
                <Label>{rest.label}</Label>
                </Pane>
                <div className="input-icon-wrap">
                    <input
                        {...input} {...rest}
                        type={passwordType}
                        className="input-with-icon"
                        id={input.name}
                        placeholder={rest.placeholder}
                        onChange={(event) => input.onChange(event)}
                    />
                    <span className="input-icon">
                        <span onClick={togglePassword} >
                            {passwordType === "password" ? <EyeOpenIcon /> : <EyeOffIcon />}
                        </span>
                    </span>
                </div>
            </Pane>
            <Pane>
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
            </Pane>
        </React.Fragment>


    )
}

export default PasswordInput