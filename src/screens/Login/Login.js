import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import * as bcrypt from 'bcryptjs';
import TextField from "@material-ui/core/TextField";
import logo from '../logo.png'
import "./Login.css";
import {useAlert} from "react-alert";

const Login = ({setPrevScreen, userInfo}) => {
   const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const alert = useAlert()

    async function handleLogin() {
        console.log(userInfo);
        console.log(user);
        console.log(password);
        if (
            user === undefined ||
            password === undefined ||
            user === '' ||
            password === ''
        ) {
            alert.show('Fill both username and password fields!');

        } else {
            const match = await bcrypt.compare(password, userInfo.password);
            if (match && user === userInfo.username) {
                console.log('LOGIN SUCCESSFUL');
                setPrevScreen('/');
                navigate('/credentials');
            } else {
                console.log('LOGIN FAILED');
                //Alert.alert('', 'Wrong username or password!');
                alert.show('Wrong username or password!');
            }
        }
    }

    return (
        <React.Fragment>
        <div className= "viewStyle">
            <img
                className="tinyLogo"
                src={logo}
                alt={"Logo"}/>
            <div>
                <input
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Username"
                    className="inputField"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="inputField"
                    type="password"
                />
            </div>
            <button
                onClick={handleLogin}
                className="login_button"
            >LOGIN</button>
        </div>
        </React.Fragment>
    );
};

export default Login;
