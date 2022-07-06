import React, {useEffect, useState} from 'react';
import { Avatar } from '@mui/material';
import {Search, ChatBubble, RadioButtonUnchecked} from '@mui/icons-material';
import './Chats.css';
import { query, onSnapshot, collection, orderBy} from 'firebase/firestore';
import db, { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Chat from './Chat';
import { selectUser } from './features/app/appSlice';
import { signOut } from 'firebase/auth';
import { resetCameraImage } from './features/camera/cameraSlice';



const Chats = () => {

  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')),(snapshot => setPosts(snapshot.docs.map(doc=>({
        id: doc.id,
        data: doc.data(),
      }
     )))
    ))
  },[]);

    const takeSnap = () =>{
      dispatch(resetCameraImage);
      navigate('/');
    }

  return (

    <div className='chats'>

        <div className="chats_header">
            <Avatar src={user.profilePic} onClick={()=> signOut(auth)} className='chats_avatar' />
            <div className="chats_search">
                <Search className='chats_searchIcon'/>
                <input type='text' placeholder='Friends' />
            </div>
            <ChatBubble className='chats_chatIcon'/>
        </div>

        <div className="chat_posts">
            {posts.map(({id, data: {profilePic, username, timestamp, imageUrl, read}}) => (
                <Chat
                    key={id}
                    id={id}
                    username={username}
                    timestamp={timestamp}
                    imageUrl={imageUrl}
                    read={read}
                    profilePic={profilePic}
                />
            ))}
        </div>

        <RadioButtonUnchecked 
            className='chats_takePicIcon'
            onClick={takeSnap}
            fontSize='large'
        />

    </div>

  )

};

export default Chats;