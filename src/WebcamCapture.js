import { RadioButtonUncheckedRounded } from "@mui/icons-material";
import { useCallback, useRef} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";
import { setCameraImage } from "./features/camera/cameraSlice";
import './WebcamCapture.css';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: 'user'
};


const WebcamCapture = () => {

    const webcamRef = useRef(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        navigate('/preview');
    }, [webcamRef]);

  return (

    <div className="webcamCapture">

        <Webcam 
            audio={false}
            height={videoConstraints.height}
            ref={webcamRef}
            screenshotFormat='image/lpeg'
            width={videoConstraints.width}
            videoConstraints={videoConstraints}
        />

        <RadioButtonUncheckedRounded 
            className="webcamCapture_button"
            onClick={capture}
            fontSize='large'
            
        />

      

    </div>

  )

};

export default WebcamCapture;