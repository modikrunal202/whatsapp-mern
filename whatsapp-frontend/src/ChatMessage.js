import React from 'react'
import "./ChatMessage.css"

function ChatMessage({ message, currentUserId }) {
    return (
        <div>
            <p className={`chat__message ${message.senderId===currentUserId && "chat__receiver"}`}>
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timestamp">
                    {message.createdAt}
                </span>
            </p>
        </div>
    )
}

export default ChatMessage
