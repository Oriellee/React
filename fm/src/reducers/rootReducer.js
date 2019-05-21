import { combineReducers } from 'redux';
import {
    bannerList,
} from './main';

const rootReducer = combineReducers({
    bannerList,
});

export default rootReducer;