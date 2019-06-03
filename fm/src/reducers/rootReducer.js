import { combineReducers } from 'redux';
import {
    bannerList,
    hotPlayList,
} from '../action/main';

const rootReducer = combineReducers({
    bannerList,
    hotPlayList,
});

export default rootReducer;