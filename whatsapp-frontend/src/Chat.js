import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import InsertEmojiIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import "./Chat.css"
import ChatMessage from './ChatMessage'
import axios from "./axios"
import { useParams } from 'react-router-dom'
import { subscribeToChat, sendMessageEvent, receiveMessageEvent, joinRoomSocket } from "./Socket"

function Chat() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([])
    const [currentUser, setCurrentUser] = useState({
        _id: "",
        email: "",
        name: "",
        token: ""
    })
    const [chatRoomId, setChatRoomId] = useState('')
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        // console.log('loggedInUser', loggedInUser);
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setCurrentUser(foundUser);
        }
    }, []);
    const { id } = useParams()

    const [room, setRoom] = useState({
        _id: "",
        name: "",
        email: ""
    })
    useEffect(() => {
        if (id) {
            axios.get(`/contacts/${id}`, {
                headers: {
                    authorization: currentUser.token
                }
            }).then(response => {
                setRoom(response.data.data);
                console.log('response.data.chatRoomId', response.data);
                setChatRoomId(response.data.chatRoomId)
            });
        }
    }, [id, currentUser])
    useEffect(() => {
        if (id) {
            axios.get(`/messages/get-messages/${id}`, {
                headers: {
                    authorization: currentUser.token
                }
            }).then(response => {
                // console.log('response-resss', response);
                setMessages(response.data.data)
            })
        }
    }, [id, currentUser])
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        console.log('subscribeToChat hook calll', chatRoomId);
        if (chatRoomId) joinRoomSocket(chatRoomId);
        subscribeToChat((err, data) => {
            if (err) return;
            console.log('here-----------');
            // setChat(oldChats => [data, ...oldChats])
        });
    }, [chatRoomId]);
    useEffect(() => {
        console.log('receiver hook call');
        receiveMessageEvent((err, message) => {
            setMessages(oldMessages => [...oldMessages, message])
            console.log('here-data-----------', messages);
        })
        
    }, []) 
    useEffect(() => {
        scrollToBottom()
    }, [messages]);
    const sendMessage = async (e) => {
        e.preventDefault();
        const message = {
            message: input,
            senderId: currentUser._id,
            receiverId: id,
            chatRoomId
        }
        sendMessageEvent(message)
        console.log('send msg event fired');
        message._id = 111
        setMessages(oldMessages => [...oldMessages, message])
        // await axios.post("/messages/send-message", {
        //     message: input,
        //     senderId: currentUser._id,
        //     receiverId: id
        // }, {
        //     headers: {
        //         authorization: currentUser.token
        //     }
        // })
        setInput("")
    }
    // console.log("messages", messages)
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://avatars.dicebear.com/api/human/2888.svg" />
                <div className="chat__headerInfo">
                    <h3>{room.name}</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <ChatMessage message={message} key={message._id} currentUserId={currentUser._id} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat__footer">
                <InsertEmojiIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
