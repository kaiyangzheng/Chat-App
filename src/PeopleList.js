import React, { useState, useEffect } from 'react';

const PeopleList = ({ chats, sortedChats, userIdInChats, users, setSelectedChat, scrollToBottomFast, currentUserId, selectedChat }) => {
    //() => { setSelectedChat(chats.filter((chat) => { return chat.id == id })[0]); }
    const handleSubmit = (e) => {
        e.preventDefault();
        scrollToBottomFast();
    }
    return <>
        {chats?.map((chat, index) => {
            const { id } = chat;
            let name = users.filter((user) => { return user.id == userIdInChats[index] })[0]?.name;
            let lastMessageUserId = chat.messages[chat.messages.length - 1]?.user_id
            let lastMessageText = chat.messages[chat.messages.length - 1]?.text
            let lastMessageDate = chat.messages[chat.messages.length - 1]?.send_time
            let lastMessageDateObject = new Date(chat.messages[chat.messages.length - 1]?.send_time);
            return <>
                {selectedChat.id === chat.id ? <form onSubmit={handleSubmit} >
                    <button type="submit" style={{ backgroundColor: "#ececf6" }} className="list-group-item list-group-item-action list-group-item-light rounded-0" key={id} onClick={() => { setSelectedChat(chats.filter((chat) => { return chat.id == id })[0]); }} >
                        < div className="media" ><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="d-none d-md-flex rounded-circle" />
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
                        < div className="media" ><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="d-none d-md-flex rounded-circle" />
                            <div className="media-body ml-4">
                                <div className="d-md-flex align-items-center justify-content-between mb-1">
                                    <h6 className="mb-0">{name}</h6>{lastMessageDate && <small className="small font-weight-bold">{lastMessageDateObject.toLocaleDateString()}</small>}
                                </div>
                                {lastMessageUserId == currentUserId && <p className="font-italic mb-0 text-small">You: {lastMessageText}</p>}
                                {lastMessageUserId != currentUserId && <p className="font-italic mb-0 text-small"> {lastMessageText}</p>}
                            </div>
                        </div>
                    </button>
                </form>}
            </>
        })}
    </>
}

export default PeopleList;  