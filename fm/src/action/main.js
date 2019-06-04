//action types
export const GET_BANNER_LIST = "GET_BANNER_LIST";
export const GET_HOT_PLAY_LIST = "GET_HOT_PLAY_LIST";
export const GET_HIGH_QUALITY_PLAY_LIST = "GET_HIGH_QUALITY_PLAY_LIST";
export const GET_PERSONALIZED = "GET_PERSONALIZED";
export const GET_TOP_ALBUM = "GET_TOP_ALBUM";


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

export const receivePersonalized = data => {
    return {
        type: GET_PERSONALIZED,
        data
    }
};

export const receiveTopAlbum = data => {
    return {
        type: GET_TOP_ALBUM,
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

export function personalizedList(state = [], action) {
    switch (action.type) {
        case GET_PERSONALIZED:
            return action.data;
        default:
            return state;
    }
};

export function topAlbum(state = [], action) {
    switch (action.type) {
        case GET_TOP_ALBUM:
            return action.data;
        default:
            return state;
    }
};