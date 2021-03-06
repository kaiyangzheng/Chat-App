import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Register = (props) => {
    const { setIsLogin, setName, setToken, setCurrentUserId } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [resResult, setResResult] = useState('');
    const [alert, setAlert] = useState({ 'msg': '', 'type': '' });
    const [showAlert, setShowAlert] = useState(false);

    const handleLogin = () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let encoded = window.btoa(`${username}:${password}`);
        myHeaders.append("Authorization", "Basic " + encoded);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        fetch('https://chat-app-api-kz.herokuapp.com/login', requestOptions)
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(json => {
                setResResult(json);
            })
    }

    useEffect(() => {
        if (resResult) {
            setAlert({ ...alert, msg: 'Success... Redirecting To Dashboard', type: 'alert-success' })
            setShowAlert(true);
            let timer1 = setTimeout(() => {
                setShowAlert(false)
                setToken(resResult['token'])
                setName(resResult['name'])
                setCurrentUserId(resResult['id'])
            }, 1000)
            return () => {
                clearTimeout(timer1);
            }
        }
    }, [resResult])

    const handleRegister = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({
            "name": username,
            "password": password
        });
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch('https://chat-app-api-kz.herokuapp.com/register', requestOptions)
            .then(response => response.text())
            .then(result => setResResult(JSON.parse(result)));

    }

    useEffect(() => {
        if (password !== confirmPass) {
            setAlert({ ...alert, msg: 'Error: Passwords must match', type: 'alert-danger' })
            setShowAlert(true);
            let timer1 = setTimeout(() => {
                setShowAlert(false);
            }, 1000);
            return () => {
                clearTimeout(timer1);
            }
        } else if (Object.keys(resResult)[0] === "message") {
            handleLogin();
        } else if (Object.keys(resResult)[0] === "error") {
            setAlert({ ...alert, msg: `Error: ${resResult['error']}`, type: 'alert-danger' })
            setShowAlert(true);
            let timer2 = setTimeout(() => {
                setShowAlert(false);
            }, 1000);
            return () => {
                clearTimeout(timer2);
            }
        }
    }, [resResult])

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleRegister();
    }

    return <>
        {showAlert && <p className={`alert ${alert.type}`}>{alert.msg}</p>}
        <form className="login-form" style={{ height: "620px" }} onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" id="confirm-password" name="confirm-password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
            {!showAlert && <button>Sign Up</button>}
            {!showAlert && <div style={{ textAlign: "center", marginTop: "10px" }}>
                or
                <p><a onClick={() => setIsLogin(true)}>Log In</a></p>
            </div>}
            <ClipLoader color={"#1ad9d6"} loading={showAlert} css={"display: block; margin: 0 auto; margin-top: 3rem;"} />

        </form>
    </>
}

export default Register;