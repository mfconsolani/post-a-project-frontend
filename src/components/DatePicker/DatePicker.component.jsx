import DatePicker from "react-date-picker"
import {Pane, Label} from 'evergreen-ui';

export const DatePickerCustom = ({ input, ...rest }) => {

    return (
        <Pane>
            <Label marginBottom="10em" >{rest.label}</Label>
            <Pane>
                <DatePicker
                    className="custom-date-picker-style"
                    {...rest} {...input}
                    format="dd-MM-yy"
                    name={input.name}
                    onChange={(e) => input.onChange(e)} />
            </Pane>
        </Pane>
    )
}

