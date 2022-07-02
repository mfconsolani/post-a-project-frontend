import React from 'react'
import {Nudge as Pulsar, Small, Pane, Text, Switch} from 'evergreen-ui'

const SwitchInput = ({ input, ...rest }) => {
    const [checked, setChecked] = React.useState(false)

    return (
        <Pane display="flex" flexDirection="column" alignItems="end" marginBottom="18px">
            <Pulsar isShown={true}
                tooltipContent='Pick "yes" if you want to register your company, 
                start-up or NGO. For those registering just as a candidate, no need to switch anything'>
                <Text>
                    <Small>
                        <b>{rest.text}</b>
                    </Small>
                </Text>
            </Pulsar>
            <Pane display="flex" alignItems="center">
                <Text>
                    <Small marginRight="0.5em">{rest.falsetext}</Small>
                </Text>
                <Switch {...input} {...rest}
                    hasCheckIcon
                    checked={checked}
                    onChange={(e) => {
                        setChecked(e.target.checked)
                        input.onChange(e.target.checked ? "COMPANY" : "USER")
                    }}
                    display="inline-block"
                />
                <Text>
                    <Small marginLeft="0.5em">{rest.truetext}</Small>
                </Text>
            </Pane>
        </Pane>
    )
}

export default SwitchInput;