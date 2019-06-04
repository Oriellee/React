import { combineReducers } from 'redux';
import {
    bannerList,
    hotPlayList,
    highQualityPlayList,
    personalizedList,
    topAlbum,
} from '../action/main';

const rootReducer = combineReducers({
    bannerList,
    hotPlayList,
    highQualityPlayList,
    personalizedList,
    topAlbum,
});

export default rootReducer;