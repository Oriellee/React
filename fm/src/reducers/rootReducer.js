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
    songPlayList,
    songPlayListIds,
    songListDetail,
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
    songPlayList,
    songPlayListIds,
    songListDetail,
});

export default rootReducer;