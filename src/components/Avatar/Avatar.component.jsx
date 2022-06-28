import { Avatar, Label } from "evergreen-ui"
import usePostFile from "../../hooks/usePostFile"
import useAuth from "../../hooks/useAuth"


const ProfileAvatar = (props) => {

    const { auth } = useAuth()
    const { uploadFile } = usePostFile()

    return (
        <Label htmlFor="avatar-input">
            {props.avatar ? 
            <Avatar cursor="pointer" name={auth.userEmail} size={100} marginRight={16} marginTop={8} src={props.avatar} borderRadius="40%"
            /> : 
            <Avatar cursor="pointer" name={auth.userEmail} size={100} marginRight={16} marginTop={8} borderRadius="40%"
            />}
            <input
                id="avatar-input"
                onChange={async (e) => {
                    return await uploadFile({ file: e.target.files[0], userEmail: auth.userEmail, fileType: "avatar" })
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