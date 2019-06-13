class Apis {
    // 构造
    constructor() {
        /**
         * 接口地址.
         * @type {string}
         */
        this.GET_BANNER_LIST = "banner";//首页轮博页面.
        this.GET_HOT_PLAY_LIST = "playlist/hot";//首页热门歌单分类.
        this.GET_HIGH_QUALITY_PLAY_LIST = "top/playlist/highquality";//精品歌单.
        this.GET_PERSONALIZED = "personalized";//推荐歌单.
        this.GET_TOP_ALBUM = "top/album";//新碟上架.
        this.GET_SONG_DETAIL = "song/detail";//歌曲详情.
        this.GET_SONG_URL = "song/url";//播放歌曲的url.
        this.GET_SONG_PLAY_LIST = "song/detail";//获取歌曲播放列表详情.
    }
}

export default Apis;