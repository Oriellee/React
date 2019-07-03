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
    albumListDetail,
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
    albumListDetail,
});

export default rootReducer;