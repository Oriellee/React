import { GET_BANNER_LIST } from '../action/main';

// reducer.
export function bannerList(state = [], action) {
    switch (action.type) {
        case GET_BANNER_LIST:
            return action.data;
        default:
            return state;
    }
};