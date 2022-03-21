import React, { useState, useEffect, useRef } from 'react';

import PeopleList from './PeopleList';
import ChatWindow from './ChatWindow';
import TextField from '@mui/material/TextField';

const Chat = ({ token, currentUserId, name }) => {
    const [chats, setChats] = useState([]);
    const [sortedChats, setSortedChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [userIdInChats, setUserIdInChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState('');
    const [messageValue, setMessageValue] = useState('');
    const [userFormValue, setUserFormValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState({ 'msg': '', 'type': '' })
    const [tick, setTick] = useState(0);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const scrollToBottomFast = () => {
        messagesEndRef.current?.scrollIntoView();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageValue) {
            postMessage();
            setMessageValue('');
        }
    }

    const handleAddUser = (e) => {
        e.preventDefault();
        let usernames = users.map((user) => { return user.name })
        if (userFormValue && usernames.includes(userFormValue) && userFormValue != name) {
            createChat();
            setUserFormValue('');
        }
    }

    const getUsers = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-access-token", token)
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }

        const response = await fetch("https://chat-app-api-kz.herokuapp.com/user/public_data", requestOptions)
        const responseUsers = await response.json()
        setUsers(responseUsers['users']);
    }

    const getChats = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-access-token", token);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch("https://chat-app-api-kz.herokuapp.com/chat", requestOptions);
        const responseChats = await response.json()
        let sorted = [...responseChats['chats']].sort(function (a, b) {
            return new Date(a.messages[a.messages.length - 1]?.send_time) - new Date(b.messages[b.messages.length - 1]?.send_time);
        })
        setChats(sorted.reverse());
        setSortedChats(sorted);

    }

    const postMessage = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-access-token", token);

        let raw = JSON.stringify({
            "text": messageValue
        })

        let requestOptions = {
            method: 'POST',
            body: raw,
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch("https://chat-app-api-kz.herokuapp.com/message/" + selectedChat.id, requestOptions)
            .then(response => response.text)
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const createChat = async () => {
        let userId = users.filter((user) => { return user.name == userFormValue })[0].id
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-access-token", token);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch("https://chat-app-api-kz.herokuapp.com/chat/" + userId, requestOptions)
            .then(response => response.text)
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        let timer1 = setTimeout(() => {
            setShowAlert(false);
        }, 3000)
        return () => {
            clearTimeout(timer1);
        }

    }, [alert])

    useEffect(() => {
        getChats();
        getUsers();
        const interval = setInterval(() => setTick(tick + 1), 500);
        return () => clearInterval(interval)
    }, [tick])

    useEffect(() => {
        getChats();
        getUsers();
    }, [])

    useEffect(() => {
        for (let i = 0; i < chats.length; i++) {
            if (chats[i].id == selectedChat.id) {
                setSelectedChat(chats[i]);
            }
        }
    }, [chats, users])

    useEffect(() => {
        let userIds = [];
        for (let i = 0; i < chats.length; i++) {
            if (chats[i]['user1_id'] != currentUserId) {
                userIds.push(chats[i]['user1_id']);
            } else {
                userIds.push(chats[i]['user2_id']);
            }
        }
        setUserIdInChats(userIds);
    }, [chats, users])



    return <>
        <div className="container py-5 px-4" >
            <div className="row rounded-lg overflow-hidden shadow">
                <div className="col-5 px-0 bg-white">
                    <div className="bg-white">
                        <div className="bg-gray px-4 py-2 bg-light">
                            <p className="h5 mb-0 py-1">Direct Messages</p>
                        </div>
                        <div className="messages-box">
                            <div className="list-group rounded-0">
                                <form onSubmit={handleAddUser} style={{ marginBottom: "1rem", textAlign: "center" }} autocomplete="off">
                                    <TextField id="standard-basic" label="Add chat" variant="standard" value={userFormValue} onChange={(e) => setUserFormValue(e.target.value)} style={{ width: "90%", marginBottom: "1rem" }} />
                                </form>
                                <PeopleList chats={chats} sortedChats={sortedChats} users={users} userIdInChats={userIdInChats} setSelectedChat={setSelectedChat} scrollToBottomFast={scrollToBottomFast} messagesEndRef={messagesEndRef} currentUserId={currentUserId} selectedChat={selectedChat} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-7 px-0">
                    <div className="px-4 py-5 chat-box bg-white" id="divExample">
                        <ChatWindow selectedChat={selectedChat} currentUserId={currentUserId} users={users} messagesEndRef={messagesEndRef} scrollToBottom={scrollToBottom} />
                    </div>

                    <form className="bg-light" onClick={handleSubmit}>
                        <div className="input-group">
                            {selectedChat ? <input type="text" placeholder='Type a message' className="form-control rounded-0 border-0 py-4 bg-light" value={messageValue} onChange={(e) => { setMessageValue(e.target.value) }} /> : <input type="text" placeholder='Type a message' className="form-control rounded-0 border-0 py-4 bg-light" value={messageValue} onChange={(e) => { setMessageValue(e.target.value) }} disabled style={{ cursor: "not-allowed" }} />}
                            <div className="input-group-append">
                                {selectedChat ? <button id="button-addon2" type="submit" className="btn btn-link" > <i className="fa fa-paper-plane"></i></button> : <button style={{ cursor: "not-allowed" }} disabled id="button-addon2" type="submit" className="btn btn-link" > <i className="fa fa-paper-plane"></i></button>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>
}

export default Chat;