import React, { useState, useEffect } from 'react';

import Login from './Login';
import Register from './Register';
import Chat from './Chat';


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

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("currUserId", currentUserId)
  }, [token, name, currentUserId])

  const logout = () => {
    setToken('');
  }

  return <>
    {!token && isLogin && <Login setToken={setToken} setName={setName} setIsLogin={setIsLogin} setCurrentUserId={setCurrentUserId} />}
    {!token && !isLogin && <Register setToken={setToken} setIsLogin={setIsLogin} setName={setName} setCurrentUserId={setCurrentUserId} />}
    {token && <Chat token={token} setToken={setToken} setIsLogin={setIsLogin} currentUserId={currentUserId} name={name} />}
  </>

}

export default App;
