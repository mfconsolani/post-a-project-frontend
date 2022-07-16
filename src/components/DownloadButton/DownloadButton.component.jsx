import React from "react";
import { CloudDownloadIcon, Button } from "evergreen-ui";
import './DownloadButton.styles.css'

const DownloadButton = (props) => {

    return (
        <React.Fragment>
            <a href={props.resume} target="_blank" rel="noreferrer">
                <Button
                    intent="success"
                    marginY={8}
                    marginRight={12}
                    iconAfter={CloudDownloadIcon}>
                    Download resume
                </Button>
            </a>
        </React.Fragment>
    )
}

export default DownloadButton;