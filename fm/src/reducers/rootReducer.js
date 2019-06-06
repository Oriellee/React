import { combineReducers } from 'redux';
import {
    bannerList,
    hotPlayList,
    highQualityPlayList,
    personalizedList,
    topAlbum,
    nowPlaySongId,
    songDetail,
} from '../action/main';

const rootReducer = combineReducers({
    bannerList,
    hotPlayList,
    highQualityPlayList,
    personalizedList,
    topAlbum,
    nowPlaySongId,
    songDetail,
});

export default rootReducer;