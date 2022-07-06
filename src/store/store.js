import {configureStore} from '@reduxjs/toolkit';
import appReducer from '../features/app/appSlice';
import cameraReducer from '../features/camera/cameraSlice';

const store = configureStore({
    reducer: {
        app: appReducer,
        camera: cameraReducer,
    }
});

export default store;