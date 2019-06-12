import { combineReducers } from 'redux';
import {
    bannerList,
    hotPlayList,
    highQualityPlayList,
    personalizedList,
    topAlbum,
    nowPlaySongId,
    songDetail,
    songUrl,
} from '../action/main';

const rootReducer = combineReducers({
    bannerList,
    hotPlayList,
    highQualityPlayList,
    personalizedList,
    topAlbum,
    nowPlaySongId,
    songDetail,
    songUrl,
});

export default rootReducer;