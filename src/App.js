import React, { useState, useEffect } from 'react';

import Login from './Login';
import Register from './Register';
import Chat from './Chat';
import Navbar from './Nav';
import UploadImage from './UploadImage';

function App() {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    return saved || "";
  })

  const [currentUserId, setCurrentUserId] = useState(() => {
    const saved = localStorage.getItem("currUserId");
    return saved || "";
  })

  const [name, setName] = useState(() => {
    const saved = localStorage.getItem("name");
    return saved || "";
  })

  const [isLogin, setIsLogin] = useState(true);
  const [notifications, setNotifications] = useState([])
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("currUserId", currentUserId)
  }, [token, name, currentUserId])

  useEffect(() => {
    if (notifications.length > 0) {
      document.title = `Chat App (${notifications.length})`
    } else {
      document.title = 'Chat App'
    }
  }, [notifications])


  return <>
    {token && <Navbar setToken={setToken} setIsLogin={setIsLogin} name={name} notifications={notifications} chats={chats} currentUserId={currentUserId} users={users} />}
    {!token && isLogin && <Login setToken={setToken} setName={setName} setIsLogin={setIsLogin} setCurrentUserId={setCurrentUserId} />}
    {!token && !isLogin && <Register setToken={setToken} setIsLogin={setIsLogin} setName={setName} setCurrentUserId={setCurrentUserId} />}
    {token && <Chat token={token} setToken={setToken} setIsLogin={setIsLogin} currentUserId={currentUserId} name={name} notifications={notifications} setNotifications={setNotifications} chats={chats} setChats={setChats} users={users} setUsers={setUsers} />}
  </>

}

export default App;
