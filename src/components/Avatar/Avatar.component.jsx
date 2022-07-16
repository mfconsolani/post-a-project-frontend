import React, { useContext } from "react"
import { Avatar, Label } from "evergreen-ui"
import usePostFile from "../../hooks/usePostFile"
import useAuth from "../../hooks/useAuth"
import DataContext from "../../context/DataContext"


const ProfileAvatar = (props) => {
    const { auth } = useAuth()
    const { uploadFile } = usePostFile()
    const { profileInfo, setProfileInfo } = useContext(DataContext)

    return (
        <Label htmlFor="avatar-input">
            {profileInfo.avatar ?
                <Avatar cursor="pointer" name={auth.userEmail} size={100} marginRight={16} marginTop={8} src={profileInfo.avatar} borderRadius="40%"
                /> :
                <Avatar cursor="pointer" name={auth.userEmail} size={100} marginRight={16} marginTop={8} borderRadius="40%"
                />}
            <input
                id="avatar-input"
                onChange={async (e) => {
                    const fileUpload = await uploadFile({ file: e.target.files[0], userEmail: auth.userEmail, fileType: "avatar" })
                    setProfileInfo(prevState => {
                        return {...prevState, avatar: fileUpload.payload}
                    } )
                }}
                type="file"
                accept="image/*"
                style={{
                    display: "none"
                }}>
            </input>
        </Label>

    )
}

export default ProfileAvatar