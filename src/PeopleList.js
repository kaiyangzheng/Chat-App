import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';

function accountColor(name) {
    let asciiCode = name?.charCodeAt(0)
    let colorIndex;
    if (asciiCode >= 97) {
        colorIndex = asciiCode - 97;
    } else {
        colorIndex = asciiCode - 65;
    }
    let colors = ["008000", "0000FF", "800080", "800080", "FF00FF", "008080", "FFFF00", "808080", "00FFFF",
        "000080",
        "800000", "FF3939", "7F7F00", "C0C0C0", "FF6347", "FFE4B5", "33023", "B8860B", "C04000",
        "6B8E23", "CD853F", "C0C000", "228B22", "D2691E", "808000", "20B2AA", "F4A460", "00C000",
        "8FBC8B", "B22222", "843A05", "C00000"]
    return "#" + colors[colorIndex];
}

const PeopleList = ({ chats, sortedChats, userIdInChats, users, setSelectedChat, scrollToBottomFast, currentUserId, selectedChat, notifications }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        scrollToBottomFast();
    }
    return <>
        {chats?.map((chat, index) => {
            const { id } = chat;
            let name = users.filter((user) => { return user.id == userIdInChats[index] })[0]?.name;
            let color = accountColor(name);
            let lastMessageUserId = chat.messages[chat.messages.length - 1]?.user_id
            let lastMessageText = chat.messages[chat.messages.length - 1]?.text
            let lastMessageDate = chat.messages[chat.messages.length - 1]?.send_time
            let lastMessageDateObject = new Date(chat.messages[chat.messages.length - 1]?.send_time);
            let newMessage = notifications.includes(chat.id);
            return <>
                {selectedChat.id === chat.id ? <form onSubmit={handleSubmit} >
                    <button type="submit" style={{ backgroundColor: "#ececf6" }} className="list-group-item list-group-item-action list-group-item-light rounded-0" key={id} onClick={() => { setSelectedChat(chats.filter((chat) => { return chat.id == id })[0]); }} >
                        < div className="media" >
                            <Avatar style={{ backgroundColor: color }}>
                                {name?.toUpperCase().charAt(0)}
                            </Avatar>
                            <div className="media-body ml-4">
                                <div className="d-md-flex align-items-center justify-content-between mb-1">
                                    <h6 className="mb-0">{name}</h6>{lastMessageDate && <small className="small font-weight-bold">{lastMessageDateObject.toLocaleDateString()}</small>}
                                </div>
                                {lastMessageUserId == currentUserId && <p className="font-italic mb-0 text-small">You: {lastMessageText}</p>}
                                {lastMessageUserId != currentUserId && <p className="font-italic mb-0 text-small"> {lastMessageText}</p>}
                            </div>
                        </div>
                    </button>
                </form> : <form onSubmit={handleSubmit}>
                    <button type="submit" className="list-group-item list-group-item-action list-group-item-light rounded-0" key={id} onClick={() => { setSelectedChat(chats.filter((chat) => { return chat.id == id })[0]); }} >
                        {newMessage ? < div className="media text-dark" >
                            <Avatar style={{ backgroundColor: color }}>
                                {name?.toUpperCase().charAt(0)}
                            </Avatar>
                            <div className="media-body ml-4">
                                <div className="d-md-flex align-items-center justify-content-between mb-1">
                                    <h6 className="mb-0">{name}</h6>{lastMessageDate && <small className="small font-weight-bold">{lastMessageDateObject.toLocaleDateString()}</small>}
                                </div>
                                {lastMessageUserId == currentUserId && <p className="font-italic mb-0 text-small" style={{ color: "black" }}>You: {lastMessageText}</p>}
                                {lastMessageUserId != currentUserId && <p className="font-italic mb-0 text-small" style={{ color: "black" }}> {lastMessageText}</p>}
                            </div>
                        </div> :
                            < div className="media" >
                                <Avatar style={{ backgroundColor: color }}>
                                    {name?.toUpperCase().charAt(0)}
                                </Avatar>
                                <div className="media-body ml-4">
                                    <div className="d-md-flex align-items-center justify-content-between mb-1">
                                        <h6 className="mb-0">{name}</h6>{lastMessageDate && <small className="small font-weight-bold">{lastMessageDateObject.toLocaleDateString()}</small>}
                                    </div>
                                    {lastMessageUserId == currentUserId && <p className="font-italic mb-0 text-small">You: {lastMessageText}</p>}
                                    {lastMessageUserId != currentUserId && <p className="font-italic mb-0 text-small"> {lastMessageText}</p>}
                                </div>
                            </div>}
                    </button>
                </form>}
            </>
        })}
    </>
}

export default PeopleList;  