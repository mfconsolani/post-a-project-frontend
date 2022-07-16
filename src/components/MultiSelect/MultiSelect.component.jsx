import { Pane, Label, Spinner, InlineAlert} from 'evergreen-ui'
import { useState, useEffect } from 'react';
import axios from '../../api/axios'
import CONSTANTS from '../../config';
import { MultiSelect } from "react-multi-select-component";

const MultiSelectInput = ({ input,dataType, ...rest }) => {
    const [selected, setSelected] = useState(rest.meta.initial || []);
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            return await axios.get(`${CONSTANTS.API_URL}api/${input.name}/`)
                .then(res => {
                    const existingData = res.data.map(element => {
                        return { label: element[dataType], value: element[dataType] }
                    })
                    setData(existingData)
                })
                .catch(err => console.log(err))
        }
        getData()
        return
    }, [])

    return (
        <Pane marginY="1em">
            <Label htmlFor={input.name} marginY="0.5em">{rest.label}</Label>
            {data.length > 0
                ? <MultiSelect
                    fontSize="12px"
                    {...rest}
                    {...input}
                    id={input.name}
                    name={input.name}
                    options={data}
                    value={selected}
                    onChange={event => {
                        setSelected(event)
                        rest.setErrors({ data: false })
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

export default MultiSelectInput