import React, { useEffect } from 'react';
import { resetCameraImage, selectCameraImage } from './features/camera/cameraSlice';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Preview.css';
import CloseIcon from '@mui/icons-material/Close';
import {TextFields,Create,Note,MusicNote,AttachFile,Crop,Timer, Send} from '@mui/icons-material'
import {v4 as uuid} from 'uuid';
import db, {storage } from './firebase';
import {ref, getDownloadURL, uploadString, uploadBytesResumable} from 'firebase/storage';
import { addDoc, collection, /*doc,*/ serverTimestamp, /*setDoc*/ } from 'firebase/firestore';
import { selectUser } from './features/app/appSlice';


const Preview = () => {

  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

    useEffect(() => {
        if(!cameraImage) {
            navigate('/', {replace: true});
        }
  },[cameraImage, navigate]);


  const closePreview = () => {
     dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();
    const metadata = {
        contentType: 'image/jpeg'
    };
    const storageRef = ref(storage, `posts/${id}`);
    const uploadTask = uploadBytesResumable(storageRef, cameraImage, metadata); //uploadString(storageRef, cameraImage, 'data_url');

    uploadTask.on(
        'state_changed', 
        null, //progress function
        (error) => {
            //Error Function
            alert(error);
        }, 
        () => {
            //Complete Function
            uploadString(storageRef, cameraImage, 'data_url')
            .then((snapshot) => {
                getDownloadURL(storageRef).then((url) => {
                    addDoc(collection(db, 'posts'), {
                        imageUrl: url,
                        username: user.username, 
                        profilePic: user.profilePic,
                        read: false,
                        timestamp: serverTimestamp()
                    });
                    navigate('/chats', {replace: true})
                });
            });
            // getDownloadURL(uploadTask.snapshot.ref)
            //     .then((url) => {
            //         setDoc(doc(db, 'posts'), {
            //             imageUrl: url,
            //             username: 'Chuks',
            //             read: false,
            //             timestamp: serverTimestamp()
            //         })
            //        navigate('/', {replace: true}) 
            //     })
        }
    );
  };

  return (

    <div className='preview'>
        <CloseIcon className='preview_close' onClick={closePreview} />
        <div className="preview_toolbarRight">
            <TextFields/>
            <Create/>
            <Note/>
            <MusicNote/>
            <AttachFile/>
            <Crop/>
            <Timer/>
        </div>
        <img src={cameraImage} alt="" />
        <div className="preview_footer" onClick={sendPost}>
            <h2>Send Now</h2>
            <Send className='preview_sendIcon' fontSize='small' />
        </div>
    </div>

  )

};

export default Preview;