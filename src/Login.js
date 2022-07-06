import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';
import { login } from './features/app/appSlice';
import './Login.css';


const Login = () => {

    const dispatch = useDispatch();
    const signIn = () => {
        signInWithPopup(auth,provider).then(result=>{
            dispatch(login({
                username:result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,
            }))
        }).catch((error)=>alert(error.message))
    };

  return (

    <div className='login'>
        <div className="login_container">
            <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt=""/>
            <Button onClick={signIn} variant='outlined'> Sign in </Button>
        </div>
    </div>

  )

};

export default Login;