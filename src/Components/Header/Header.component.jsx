import React from "react"
import useAuth from "../../hooks/useAuth";
import {
    Button, Avatar, Menu, Popover, Position, UserIcon, LogOutIcon, CommentIcon,
    HeartIcon, Pane
} from 'evergreen-ui'
import { Link } from 'react-router-dom';
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router";
import DataContext from "../../context/DataContext";

const Header = () => {
    const { auth } = useAuth()
    const { profileInfo } = React.useContext(DataContext)
    const logout = useLogout()
    const navigate = useNavigate()    

    return (
        <React.Fragment>
            <Pane display="flex" flexDirection="row" justifyContent="flex-end" width="100vw" zIndex="2"
                marginBottom={16} position="fixed" top="0" left="0" right="0" backgroundColor="rgba(256,256,256,0.8)" paddingBottom="1em" >
                {auth.profileType === "COMPANY" &&
                    <Link to="/postproject" style={{ textDecoration: 'none', marginRight: "16px", marginTop: "8px" }}>
                        <Button appearance="minimal" >Post project</Button>
                    </Link>}
                <Link to="/projects" style={{ textDecoration: 'none', marginRight: "16px", marginTop: "8px" }}>
                    <Button appearance="minimal" >Projects</Button>
                </Link>
                <Link to="/candidates" style={{ textDecoration: 'none', marginRight: "16px", marginTop: "8px" }}>
                    <Button appearance="minimal" >Candidates</Button>
                </Link>
                {auth.status ?
                    <Popover
                        position={Position.BOTTOM_LEFT}
                        content={
                            <Menu>
                                <Menu.Group>
                                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                                        <Menu.Item icon={UserIcon}>My Profile</Menu.Item>
                                    </Link>

                                    <Menu.Item icon={HeartIcon} disabled >Favs</Menu.Item>
                                    <Menu.Item icon={CommentIcon} disabled>
                                        Messages
                                    </Menu.Item>
                                </Menu.Group>
                                <Menu.Divider />
                                <Menu.Group>
                                        <Menu.Item icon={LogOutIcon} intent="danger" onClick={async() => {
                                            await logout()
                                            navigate('/projects')
                                            localStorage.clear()
                                        }}>
                                            Logout
                                        </Menu.Item>
                                </Menu.Group>
                            </Menu>
                        }
                    >
                        <Avatar cursor="pointer" name={auth.userEmail} src={profileInfo.avatar} size={40} marginRight={16} marginTop={8} />
                    </Popover>
                    : <React.Fragment>
                        <Link to="/signin" style={{ textDecoration: 'none', marginRight: "16px", marginTop: "8px" }}>
                            <Button color="#3366FF" border="1px solid #3366FF" >Sign In</Button>
                        </Link>
                        <Link to="/signup" style={{ textDecoration: 'none', marginRight: "16px", marginTop: "8px" }}>
                            <Button appearance="primary" >Sign Up</Button>
                        </Link>
                    </React.Fragment>
                }
            </Pane>

        </React.Fragment>
    )
}

export default Header;