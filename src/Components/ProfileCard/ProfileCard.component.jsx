import { Paragraph, Pane } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import axios from "axios";
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter'
import './ProfileCard.styles.css'


const ProfileCard = () => {
    const [userProfiles, setUserProfiles] = useState([])

    useEffect(() => {
        const fetchUserProfiles = async () => {
            return await axios.get('http://localhost:8080/api/users')
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
                <div>
                    <div className="card-container">
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
                </div>
            )
        })
    )
}

export default ProfileCard