import { Paragraph, Pane, Avatar, Text, Badge } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import axios from "axios";
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter'
import './ProfileCard.styles.css'


const ProfileCard = () => {
    const [userProfiles, setUserProfiles] = useState([])

    useEffect(() => {
        const fetchUserProfiles = async () => {
            return await axios.get('http://localhost:8080/api/users/candidates/extended')
                .then(res => {
                    console.log(res.data.payload)

                    setUserProfiles(res.data.payload)
                })
                .catch(err => console.log(err))
        }
        fetchUserProfiles()
        return
    }, [])


    return (

        userProfiles && userProfiles.map(elem => {
            return (
                <Pane display="flex" flexDirection="row" alignItems="center" >
                    <Pane
                        key={elem.id + "d" + (elem.profile && elem.profile.id)}
                        elevation={3}
                        float="left"
                        display="flex"
                        flexDirection="column"
                        borderRadius="5px"
                        backgroundColor="#eee"
                        marginY={30}
                        padding={20}
                        width={300}>
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
                        <Pane borderTop="1px solid #444" marginY="1em" paddingX="0.5em">
                            <Paragraph size={300}>
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
                        </Pane>
                    </Pane>
                 </Pane>
            )
        })
    )
}

export default ProfileCard