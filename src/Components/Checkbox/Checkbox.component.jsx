import { Checkbox } from 'evergreen-ui'
import React from 'react'

const CustomCheckbox = (props) => {
  const [checked, setChecked] = React.useState(false)
  return (
    <Checkbox
      display="inline-flex"
      label={props.label}
      checked={checked}
      onChange={e => {
        props.callback()
        setChecked(e.target.checked)
      }}
    />
  )
}

export default CustomCheckbox;