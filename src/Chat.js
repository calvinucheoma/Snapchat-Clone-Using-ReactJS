import { Avatar } from '@mui/material';
import {StopRounded} from '@mui/icons-material';
import React from 'react';
import ReactTimeago from 'react-timeago';
import {useDispatch} from 'react-redux';
import { selectImage } from './features/app/appSlice';
import { doc, updateDoc } from 'firebase/firestore';
import db from './firebase';
import { useNavigate } from 'react-router-dom'
import './Chat.css';



const Chat = ({id, username, timestamp, read, imageUrl, profilePic }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = () => {
    if(!read) {
        dispatch(selectImage(imageUrl));
        updateDoc(doc(db,'posts',id),{
            read: true
        })
        navigate('/chats/view')
    }
  };

  return (

    <div onClick={open} className='chat'>
        <Avatar src={profilePic} className='chat_avatar' />
        <div className="chat_info">
            <h4>{username}</h4>
            <p> 
               {!read && 'Tap to view -' }{" "}
               <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /> 
            </p>
        </div>

        {!read && <StopRounded className='chat_readIcon' />}

    </div>

  )

};

export default Chat;