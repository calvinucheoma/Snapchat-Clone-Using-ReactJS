import './App.css';
import WebcamCapture from './WebcamCapture';
import {Routes, Route} from 'react-router-dom';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { login, logout, selectUser } from './features/app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useEffect } from 'react';
import Login from './Login';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

   useEffect(()=>{
     onAuthStateChanged(auth,(authUser)=>{
       if (authUser){
          dispatch(login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          }))
       } else{
          dispatch(logout())
       }
    })
  },[]);


  return (

    <div className="App">

        {!user ?(
          <Login />
      ):(
          <>
            <img className='app_logo' src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="" />

            <div className="app_body">  

            <div class="app_bodyBackground">

                    <Routes>
                        <Route path='/' element={<WebcamCapture />} />
                        <Route path='/preview' element={<Preview />} />
                        <Route path='/chats' element={<Chats />} />
                        <Route path='/chats/view' element={<ChatView/>} />       
                    </Routes>

            </div>

            </div>

          </>

        )}
        
    </div>

  );

};

export default App;
