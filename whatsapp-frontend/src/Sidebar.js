import React from 'react'
import "./Sidebar.css"
import ChatIcon from '@material-ui/icons/Chat';
import DonutLarge from '@material-ui/icons/DonutLarge'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
function Sidebar({contacts, currnetUser}) {
    // console.log('contacts---------',contacts);
    // console.log('currnetUser---currnetUser------',currnetUser);

    return (
        <div className="sidebar">
            <div className="sidebar__heaader">
                <Avatar src="https://avatars.githubusercontent.com/u/25351020?s=60&v=4" />
                <div>{currnetUser.name}</div>
                <div className="sidebar__heaaderRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {contacts.map(contact => (
                    <SidebarChat contact={contact} key={contact._id} id={contact._id} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
