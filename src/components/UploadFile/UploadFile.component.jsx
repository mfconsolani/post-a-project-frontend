import React, { useState } from 'react'
import { Pane, FileCard, FileUploader as Uploader, Spinner, CloudUploadIcon, Button } from 'evergreen-ui';
import usePostFile from '../../hooks/usePostFile';
import useAuth from '../../hooks/useAuth';

export const FileUploader = (props) => {
    const { uploadFile, isLoading } = usePostFile()
    const { auth } = useAuth()
    const [enableUpload, setEnableUpload] = useState(!!props.resume)
    const [files, setFiles] = React.useState([])
    const [fileRejections, setFileRejections] = React.useState([])
    const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
    const handleRemove = React.useCallback(() => {
        setFiles([])
        setFileRejections([])
    }, [])

    const toggleUpload = () => {
        setEnableUpload(prevState => !prevState)
    }

    const handleChange = React.useCallback(async (files) => {
        await uploadFile({ file: files[0], userEmail: auth.userEmail, fileType: "resume" })
        setFiles([files[0]])
    }, [uploadFile, auth])

    return (
        enableUpload
            ? isLoading
                ? (<Pane display="flex" alignItems="center" justifyContent="center" maxWidth={654} maxHeight={250} marginTop={24}>
                    <Spinner />
                </Pane>)
                : <Pane maxWidth={654} maxHeight={250} marginTop={24}>
                    <Uploader
                        label="Resume"
                        acceptedMimeTypes={["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.oasis.opendocument.text"]}
                        description="You can upload 1 file. File can be up to 50 MB."
                        maxSizeInBytes={50 * 1024 ** 2}
                        maxFiles={1}
                        onChange={handleChange}
                        onRejected={handleRejected}
                        renderFile={(file) => {
                            const { name, size, type } = file
                            const fileRejection = fileRejections.find((fileRejection) => fileRejection.file === file)
                            const { message } = fileRejection || {}
                            return (

                                <FileCard
                                    key={name}
                                    isInvalid={fileRejection != null}
                                    name={name}
                                    onRemove={handleRemove}
                                    sizeInBytes={size}
                                    type={type}
                                    validationMessage={message}
                                />
                            )
                        }}
                        values={files}
                    />
                </Pane>
            : <Button file={props.resume} onClick={toggleUpload} iconAfter={CloudUploadIcon}> Update Resume </Button>
    )
}

