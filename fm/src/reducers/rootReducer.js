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
    searchList,
    songSquare,
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
    searchList,
    songSquare,
});

export default rootReducer;