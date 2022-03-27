import React, { useState, useEffect, useRef } from 'react';

import SenderMessage from './SenderMessage';
import RecieverMessage from './RecieverMessage';

const ChatWindow = ({ selectedChat, currentUserId, userIdInChats, chats, users, messagesEndRef, scrollToBottom }) => {
    const [otherUserInfo, setOtherUserInfo] = useState({});
    const [messages, setMessages] = useState([]);
    const [messageLength, setMessageLength] = useState(0);
    const [currSelectedChat, setCurrSelectedChat] = useState(selectedChat);

    useEffect(() => {
        setMessages(selectedChat.messages)
    }, [chats, selectedChat])

    useEffect(() => {
        setMessageLength(selectedChat.messages?.length);
    }, [selectedChat])

    useEffect(() => {
        if (messages?.length > messageLength) {
            setMessageLength(messages.length);
        }
    }, [messages])

    useEffect(() => {
        scrollToBottom();
    }, [messageLength])

    useEffect(() => {
        if (selectedChat.user1_id != currentUserId) {
            setOtherUserInfo(users?.filter((user) => { return user.id == selectedChat.user1_id })[0])
        } else {
            setOtherUserInfo(users?.filter((user) => { return user.id == selectedChat.user2_id })[0])
        }
    }, [selectedChat, users])

    return <>
        {messages?.map((message, index) => {
            if (message.user_id == currentUserId) {
                if (index == messages.length - 1) {
                    return <RecieverMessage text={message.text} sendTime={message.send_time} />
                }
                return <RecieverMessage text={message.text} sendTime={message.send_time} />
            } else {
                if (index == messages.length - 1) {
                    return <SenderMessage text={message.text} sendTime={message.send_time} otherUsername={otherUserInfo.name} />
                }
                return <SenderMessage text={message.text} sendTime={message.send_time} otherUsername={otherUserInfo.name} />
            }
        })}
        <div ref={messagesEndRef}></div>
    </>

}

export default ChatWindow;