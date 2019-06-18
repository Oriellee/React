//action types
export const GET_BANNER_LIST = "GET_BANNER_LIST";
export const GET_HOT_PLAY_LIST = "GET_HOT_PLAY_LIST";
export const GET_HIGH_QUALITY_PLAY_LIST = "GET_HIGH_QUALITY_PLAY_LIST";
export const GET_PERSONALIZED = "GET_PERSONALIZED";
export const GET_TOP_ALBUM = "GET_TOP_ALBUM";
export const GET_SONG_DETAIL = "GET_SONG_DETAIL";
export const CHANGE_NOW_PLAY_SONG_ID = "CHANGE_NOW_PLAY_SONG_ID";
export const GET_SONG_URL = "GET_SONG_URL";
export const GET_SONG_PLAY_LIST_IDS = "GET_SONG_PLAY_LIST_IDS";
export const GET_SONG_PLAY_LIST = "GET_SONG_PLAY_LIST";
export const GET_SONG_LIST_DETAIL = "GET_SONG_LIST_DETAIL";


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

export const receiveSongDetail = data => {
    return {
        type: GET_SONG_DETAIL,
        data
    }
};
export const receiveNowPlaySongId = data => {
    return {
        type: CHANGE_NOW_PLAY_SONG_ID,
        data
    }
};

export const receiveSongUrl = data => {
    return {
        type: GET_SONG_URL,
        data
    }
};

export const receiveSongPlayListIds = data => {
    return {
        type: GET_SONG_PLAY_LIST_IDS,
        data
    }
};

export const receiveSongPlayList = data => {
    return {
        type: GET_SONG_PLAY_LIST,
        data
    }
};

export const receiveSongListDetail = data => {
    return {
        type: GET_SONG_LIST_DETAIL,
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

export function songDetail(state = {}, action) {
    switch (action.type) {
        case GET_SONG_DETAIL:
            return action.data;
        default:
            return state;
    }
};

const initSongPlayListIds = [254285];

export function songPlayListIds(state = initSongPlayListIds, action) {
    switch (action.type) {
        case GET_SONG_PLAY_LIST_IDS:
            return action.data;
        default:
            return state;
    }
};

export function songPlayList(state = [], action) {
    switch (action.type) {
        case GET_SONG_PLAY_LIST:
            return action.data;
        default:
            return state;
    }
};

export function nowPlaySongId(state = initSongPlayListIds[0], action) {
    switch (action.type) {
        case CHANGE_NOW_PLAY_SONG_ID:
            return action.data;
        default:
            return state;
    }
};

export function songUrl(state = {}, action) {
    switch (action.type) {
        case GET_SONG_URL:
            return action.data;
        default:
            return state;
    }
};

export function songListDetail(state = {}, action) {
    switch (action.type) {
        case GET_SONG_LIST_DETAIL:
            return action.data;
        default:
            return state;
    }
};

