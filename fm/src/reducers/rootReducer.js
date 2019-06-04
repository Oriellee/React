import { combineReducers } from 'redux';
import {
    bannerList,
    hotPlayList,
    highQualityPlayList,
} from '../action/main';

const rootReducer = combineReducers({
    bannerList,
    hotPlayList,
    highQualityPlayList,
});

export default rootReducer;