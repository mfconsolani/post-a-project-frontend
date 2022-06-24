import React, { useEffect } from 'react'
import { Pane, FileCard, FileUploader as Uploader } from 'evergreen-ui';
// import postImage from '../../helpers/postImage';
import usePostFile from '../../helpers/postImage';

export const FileUploader = () => {
    const {uploadFile, isLoading} = usePostFile()
    const [files, setFiles] = React.useState([])
    const [fileRejections, setFileRejections] = React.useState([])
    const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
    const handleRemove = React.useCallback(() => {
        setFiles([])
        setFileRejections([])
    }, [])
    const handleChange = React.useCallback(async (files) => {
        const result = await uploadFile({ image: files[0] })
        console.log(result)        
        setFiles([files[0]])
    }, [])

    useEffect(() => {
        console.log(files[0])
    }, [files])

    return (
        <Pane maxWidth={654} maxHeight={250} marginTop={24}>
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
    )
}

