import React, { useState, useEffect, useRef } from 'react';

import SenderMessage from './SenderMessage';
import RecieverMessage from './RecieverMessage';

const ChatWindow = ({ selectedChat, currentUserId, userIdInChats, chats, users }) => {
    const [otherUserInfo, setOtherUserInfo] = useState({});
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages(selectedChat.messages)
    }, [chats, selectedChat])
    useEffect(() => {
        if (selectedChat.user1_id != currentUserId) {
            setOtherUserInfo(users?.filter((user) => { return user.id == selectedChat.user1_id })[0])
        } else {
            setOtherUserInfo(users?.filter((user) => { return user.id == selectedChat.user2_id })[0])
        }
    }, [selectedChat, users])


    return <>
        {messages?.map((message) => {
            if (message.user_id == currentUserId) {
                return <RecieverMessage text={message.text} sendTime={message.send_time} />
            } else {
                return <SenderMessage text={message.text} sendTime={message.send_time} />
            }
        })}
    </>

}

export default ChatWindow;