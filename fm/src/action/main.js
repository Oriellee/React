//action types
export const GET_BANNER_LIST = 'GET_BANNER_LIST';


//action creators
export const receiveBannerList = data => {
    return {
        type: GET_BANNER_LIST,
        data
    }
};

