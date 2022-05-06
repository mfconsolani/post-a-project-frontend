import { Paragraph, Pane, Avatar, Text, Badge, Button, Dialog } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import axios from "axios";
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter'
import './ProfileCard.styles.css'

//TODO
//Build it in such a way that only users with profile completed will be shown

const CandidateProfileDialog = ({ title, customLabel, body, buttonName, profileData, ...rest }) => {
    const [isShown, setIsShown] = React.useState(false)

    return (
        <Pane>
            <Dialog
                isShown={isShown}
                title={title}
                onCloseComplete={() => setIsShown(false)}
                confirmLabel={customLabel || "Label"}
            >
                <Pane>
                    <Pane display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                            src={`https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`}
                            name="Alan Turing"
                            size={300}
                            border="3px solid white"

                        />
                        <Text size={600}>{profileData.username ? capitalizeFirstLetter(profileData.username) : profileData.email.split('@')[0]}</Text>
                    </Pane>
                    <Pane display="flex" flexDirection="column" alignItems="center">
                        <Paragraph>
                            {profileData.profile && profileData.profile.country}
                        </Paragraph>
                        <Paragraph size={300}>
                            {profileData.profile && profileData.profile.description}
                        </Paragraph>
                        <Pane>
                            {profileData.profile && profileData.profile.skills.map(elem => {
                                return (
                                    <Badge color="blue" marginRight={8}>
                                        {elem.skill}
                                    </Badge>)
                            })}
                        </Pane>
                    </Pane>
                </Pane>
            </Dialog>

            <Button
                {...rest}
                onClick={() => setIsShown(true)}>
                {buttonName}
            </Button>
        </Pane>
    )
}


const ProfileCard = () => {
    const [userProfiles, setUserProfiles] = useState([])
    const [isShown, setIsShown] = React.useState(false)

    useEffect(() => {
        const fetchUserProfiles = async () => {
            return await axios.get('http://localhost:8080/api/users/candidates/extended')
                .then(res => {
                    console.log(res.data.payload)
                    setUserProfiles(res.data.payload.filter(elem => elem.profile))
                })
                .catch(err => console.log(err))
        }
        fetchUserProfiles()
        return
    }, [])


    return (
        <Pane
            display="flex"
            flexDirection="row"
            alignItems="center"
            flexWrap="wrap"
            justifyContent="space-between"
            padding="1em"
        >
            {userProfiles && userProfiles.map(elem => {
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
                        minHeight={300}
                        margin="0.5em"
                    >
                        <Pane>
                            <Pane display="flex" flexDirection="column" alignItems="center">
                                <Avatar
                                    src={`https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`}
                                    name="Alan Turing"
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
                        <Pane>
                            <Dialog
                                id="dialog"
                                isShown={isShown}
                                title="Dialog title"
                                onCloseComplete={() => setIsShown(false)}
                                confirmLabel="Custom Label"
                            >
                                Dialog content
                            </Dialog>
                        </Pane>
                        <Pane borderTop="1px solid #444" marginY="1em" paddingX="0.5em">
                            <Paragraph size={300} marginTop={8}>
                                SKILLS
                            </Paragraph>
                            <Pane>
                                {elem.profile && elem.profile.skills.map(elem => {
                                    return (
                                        <Badge color="blue" marginRight={8}>
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
                                        <Badge color="purple" marginRight={8}>
                                            {elem.role}
                                        </Badge>)
                                })}
                            </Pane>
                            <Pane
                                display="flex"
                                justifyContent="center"
                                marginTop={24}
                                // borderTop="1px solid #888"
                                marginY="1em"
                                paddingY="0.5em"
                                paddingX="0.5em"
                            >
                                <CandidateProfileDialog
                                    profileData={elem}
                                    body="Some content goes here"
                                    title="Title goes here"
                                    buttonName="Message"
                                    customLabel=""
                                    marginX={8}
                                    color="#3366FF"
                                    border="1px solid #3366FF"
                                    backgroundColor="none"
                                />
                                <CandidateProfileDialog
                                    profileData={elem}
                                    body="Some content goes here"
                                    title="Title goes here"
                                    buttonName="View Profile"
                                    customLabel=""
                                    appearance="primary"
                                    marginX={8}
                                />
                            </Pane>
                        </Pane>
                    </Pane>
                )
            })}
        </Pane>
    )
}

export default ProfileCard