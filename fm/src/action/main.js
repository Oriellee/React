//action types
export const GET_BANNER_LIST = "GET_BANNER_LIST";
export const GET_HOT_PLAY_LIST = "GET_HOT_PLAY_LIST";
export const GET_HIGH_QUALITY_PLAY_LIST = "GET_HIGH_QUALITY_PLAY_LIST";


//action creators
export const receiveBannerList = data => {
    return {
        type: GET_BANNER_LIST,
        data
    }
};

export const receiveHotPlayList = data => {
    return {
        type: GET_HOT_PLAY_LIST,
        data
    }
};

export const receiveHighQualityPlayList = data => {
    return {
        type: GET_HIGH_QUALITY_PLAY_LIST,
        data
    }
};


// reducer.
export function bannerList(state = [], action) {
    switch (action.type) {
        case GET_BANNER_LIST:
            return action.data;
        default:
            return state;
    }
};

export function hotPlayList(state = [], action) {
    switch (action.type) {
        case GET_HOT_PLAY_LIST:
            return action.data;
        default:
            return state;
    }
};

export function highQualityPlayList(state = [], action) {
    switch (action.type) {
        case GET_HIGH_QUALITY_PLAY_LIST:
            return action.data;
        default:
            return state;
    }
};