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
                <Pane display="flex" flexDirection="column" alignItems="center" >
                    <div className="card-container" key={elem.id + "d" + (elem.profile && elem.profile.id) + 3}>
                        <span className="pro">PRO</span>
                        <img className="round" src={`https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`} alt="user" />
                        <h3>{elem.username ? capitalizeFirstLetter(elem.username) : elem.email.split('@')[0]}</h3>
                        <h6>New York</h6>
                        <p>User interface designer and <br /> front-end developer</p>
                        <div className="buttons">
                            <button className="primary">
                                Message
                            </button>
                            <button className="primary ghost">
                                Following
                            </button>
                        </div>
                        <div className="skills">
                            <h6>Skills</h6>
                            <ul>
                                <li>UI / UX</li>
                                <li>Front End Development</li>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>JavaScript</li>
                                <li>React</li>
                                <li>Node</li>
                            </ul>
                        </div>
                    </div>

                    <Pane
                        key={elem.id + "d" + (elem.profile && elem.profile.id)}
                        elevation={3}
                        float="left"
                        display="flex"
                        flexDirection="column"
                        borderRadius="5px"
                        marginY={30}
                        padding={20}
                        width={300}>
                        <Pane>
                            <Pane display="flex" flexDirection="column" alignItems="center">
                                <Paragraph>
                                    Card Header
                                </Paragraph>
                                <Avatar
                                    src={`https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`}
                                    name="Alan Turing"
                                    size={100}

                                />
                                <Text size={300}>{elem.username ? capitalizeFirstLetter(elem.username) : elem.email.split('@')[0]}</Text>
                            </Pane>
                            <Pane display="flex" flexDirection="column" alignItems="center">
                                <Paragraph>
                                    Location 🇦🇹
                                </Paragraph>
                                <Paragraph>
                                    Role 🖥
                                </Paragraph>
                            </Pane>
                        </Pane>
                        <Pane>
                            <Paragraph>
                                Skills
                            </Paragraph>
                            <Pane>
                                {elem.profile && elem.profile.skills.map(elem => {
                                    return (
                                        <Badge color="teal" marginRight={8}>
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