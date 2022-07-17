import { Paragraph, Pane, Avatar, Text, Badge, Spinner, toaster, FlameIcon, IconButton, ChatIcon } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import axios from "axios";
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter'
import './ProfileCard.styles.css'
import CONSTANTS from "../../config";

const ProfileCard = () => {
    const [userProfiles, setUserProfiles] = useState([])

    useEffect(() => {
        const fetchUserProfiles = async () => {
            return await axios.get(`${CONSTANTS.API_URL}api/users/candidates/extended`)
                .then(res => {
                    setUserProfiles(res.data.payload.filter(elem => elem.profile))
                })
                .catch(err => {
                    console.error(err)
                    return toaster.warning("An error has occurred when loading candidates info", { id: 'forbidden-action' })
                })
        }
        fetchUserProfiles()
        return
    }, [])

    return (
        <React.Fragment>

            <Pane
                display="flex"
                flexDirection="row"
                alignItems="center"
                flexWrap="wrap"
                justifyContent="space-around"
                padding="1em"
            >
                {userProfiles.length < 1 ? <Spinner size={100} /> : userProfiles.map(elem => {
                    return (
                        <Pane
                            key={elem.id}
                            elevation={3}
                            float="left"
                            display="flex"
                            flexDirection="column"
                            borderRadius="5px"
                            backgroundColor="#eee"
                            marginY={30}
                            padding={20}
                            minWidth={300}
                            maxWidth={300}
                            minHeight={300}
                            margin="0.5em"
                        >
                            <Pane>
                                <Pane display="flex" flexDirection="column" alignItems="center">
                                    <Avatar
                                        src={elem.profile.avatar || `https://avatars.dicebear.com/api/avataaars/${elem.username}.svg`}
                                        name={elem.username ? capitalizeFirstLetter(elem.username) : elem.email.split('@')[0]}
                                        size={100}
                                        border="3px solid white"

                                    />
                                    <Text size={600}>{elem.username ? capitalizeFirstLetter(elem.username) : elem.email.split('@')[0]}</Text>
                                </Pane>
                                <Pane display="flex" flexDirection="column" alignItems="center">
                                    <Paragraph>
                                        {elem.profile && elem.profile.country}
                                    </Paragraph>
                                    <Paragraph size={300}>
                                        {elem.profile && elem.profile.description}
                                    </Paragraph>

                                </Pane>
                            </Pane>
                            <Pane borderTop="1px solid #444" marginY="1em" paddingX="0.5em">
                                <Paragraph size={300} marginTop={8}>
                                    SKILLS
                                </Paragraph>
                                <Pane>
                                    {elem.profile && elem.profile.skills.map(elem => {
                                        return (
                                            <Badge key={elem.id} color="blue" marginRight={8}>
                                                {elem.skill}
                                            </Badge>)
                                    })}
                                </Pane>
                                <Paragraph size={300} marginTop={8}>
                                    ROLES
                                </Paragraph>
                                <Pane>
                                    {elem.profile && elem.profile.roles.map(elem => {
                                        return (
                                            <Badge key={elem.id} color="purple" marginRight={8}>
                                                {elem.role}
                                            </Badge>)
                                    })}
                                </Pane>
                                <Pane
                                    display="flex"
                                    justifyContent="space-evenly"
                                    marginTop={24}
                                    // borderTop="1px solid #888"
                                    marginY="1em"
                                    paddingY="0.5em"
                                    paddingX="0.5em"
                                >

                                    <IconButton
                                        icon={FlameIcon}
                                        size="large"
                                        className="flame-icon-button"
                                        intent="danger"
                                        background="transparent"
                                        borderRadius="50%"

                                    />

                                    <IconButton
                                        icon={ChatIcon}
                                        size="large"
                                        className="chat-icon-button"
                                        background="transparent"
                                        borderRadius="50%"
                                    />

                                    
                                    {/* <CandidateProfileDialog
                                        profileData={elem}
                                        body="Some content goes here"
                                        title="Title goes here"
                                        buttonName="View Profile"
                                        customLabel=""
                                        appearance="primary"
                                        marginX={8}
                                    // avatar={avatar}
                                    // key={elem.id}
                                    /> */}
                                </Pane>
                            </Pane>
                        </Pane>
                    )
                })}
            </Pane>
        </React.Fragment>
    )
}

export default ProfileCard