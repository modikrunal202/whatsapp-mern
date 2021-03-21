import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import "./SidebarChat.css";
import axios from "./axios"
import { Link } from 'react-router-dom';

function SidebarChat({id, addNewChat, user }) {
    const [seed, setSeed] = useState("")
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])
    const createChat = async () => {
        const name = prompt("Enter name")
        const email = prompt("Enter Email")
        if (name && email) {
            // console.log('got it', name, email);
            await axios.post("/auth/add-user", {
                name,
                email
            }).then(res => {
                if (res.status === 201) {
                    console.log('done-------');
                } else {
                    console.log('failed-------');
                }
            }).catch(err => {
                console.log('failed err-------', err);
            })
        }
    }
    return !addNewChat ? (
        <Link className="sidebarLink" to={`/rooms/${id}`} >
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{user.name}</h2>
                    <p>last message in room</p>
                </div>
            </div>
        </Link>
    ) : (
            <div onClick={createChat} className="sidebarChat">
                <h2>Add New Chat</h2>
            </div>
        )
}

export default SidebarChat
