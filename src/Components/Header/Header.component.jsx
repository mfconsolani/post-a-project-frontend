import React, { useContext } from "react"
import DataContext from "../../DataContext";
import useAuth from "../../hooks/useAuth";
import {
    Button, Avatar, Menu, Popover, Position, PeopleIcon, LogOutIcon, EditIcon,
    HeartIcon, Pane
} from 'evergreen-ui'
import { Link } from 'react-router-dom';


const Header = () => {
    const { auth, setAuth } = useAuth()
    const { setProfileInfo } = useContext(DataContext)

    return (
        <React.Fragment>
            <Pane display="flex" flexDirection="row" justifyContent="flex-end" width="100vw" zIndex="2"
                marginBottom={16} position="fixed" top="0" left="0" right="0" backgroundColor="white" paddingBottom="1em" >
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
                                        <Menu.Item icon={PeopleIcon}>My Profile</Menu.Item>
                                    </Link>

                                    <Menu.Item icon={HeartIcon} disabled >Favs</Menu.Item>
                                    <Menu.Item icon={EditIcon} disabled>
                                        Rename...
                                    </Menu.Item>
                                </Menu.Group>
                                <Menu.Divider />
                                <Menu.Group>
                                    <Link to="/projects" style={{ textDecoration: 'none' }}>
                                        <Menu.Item icon={LogOutIcon} intent="danger" onClick={() => {
                                            setAuth({ status: false, userEmail: '', userId: '', profileType: '' })
                                            setProfileInfo({ profileExists: false })
                                            localStorage.clear()
                                        }}>
                                            Logout
                                        </Menu.Item>
                                    </Link>
                                </Menu.Group>
                            </Menu>
                        }
                    >
                        <Avatar cursor="pointer" name={auth.userEmail} size={40} marginRight={16} marginTop={8} />
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