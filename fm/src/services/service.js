import extendsApi from './extendsApi';
import { receiveBannerList, receiveHotPlayList, receiveHighQualityPlayList, receivePersonalized, receiveTopAlbum, receiveSongDetail, receiveSongUrl, receiveSongPlayList, receiveSongPlayListIds, receiveNowPlaySongId, receiveSongListDetail, } from '../action/main';
import Apicfg from './Apis';
var Apis = new Apicfg();

class Service extends extendsApi {
    demoGet(params) {
        let url = '/top/playlist?limit=10&order=new';
        return this.get(url, params).then(res => {
            // return res.data
        })
    }
    getBannerList(dispatch, params, cb) {
        let url = Apis.GET_BANNER_LIST;
        this.get(url, params).then(res => {
            dispatch(receiveBannerList(res.data.banners));
            cb && cb();
        }).catch(error => {

        })
    }
    getHotPlayList(dispatch, params, cb) {
        let url = Apis.GET_HOT_PLAY_LIST;
        this.get(url, params).then(res => {
            dispatch(receiveHotPlayList(res.data.tags));
            cb && cb();
        }).catch(error => {

        })
    }
    getHighQualityPlayList(dispatch, params, cb) {
        let url = Apis.GET_HIGH_QUALITY_PLAY_LIST;
        this.get(url, params).then(res => {
            dispatch(receiveHighQualityPlayList(res.data.playlists));
            cb && cb();
        }).catch(error => {

        })
    }
    getPersonalized(dispatch, params, cb) {
        let url = Apis.GET_PERSONALIZED;
        this.get(url, params).then(res => {
            dispatch(receivePersonalized(res.data.result));
            cb && cb();
        }).catch(error => {

        })
    }
    getTopAlbum(dispatch, params, cb) {
        let url = Apis.GET_TOP_ALBUM;
        this.get(url, params).then(res => {
            dispatch(receiveTopAlbum(res.data.albums));
            cb && cb();
        }).catch(error => {

        })
    }
    getSongDetail(dispatch, params, cb) {
        let url = Apis.GET_SONG_DETAIL;
        this.get(url, params).then(res => {
            dispatch(receiveSongDetail(res.data.songs[0]));
            cb && cb();
        }).catch(error => {

        })
    }
    getSongUrl(dispatch, params, cb) {
        let url = Apis.GET_SONG_URL;
        this.get(url, params).then(res => {
            dispatch(receiveSongUrl(res.data.data[0]));
            cb && cb();
        }).catch(error => {

        })
    }
    getSongPlayList(dispatch, params, cb) {
        let url = Apis.GET_SONG_PLAY_LIST;
        this.get(url, params).then(res => {
            dispatch(receiveSongPlayList(res.data.songs));
            cb && cb(res.data.songs);
        }).catch(error => {

        })
    }
    changeSongPlayListIds(dispatch, params, cb) {
        dispatch(receiveSongPlayListIds(params.ids));
        // type:1-播放全部,2-删除单首,判断是否当前播放,当前播放自动播放下一首,3-清空全部,4-播放单首,将播放列表全部添加且定位到该歌曲.
        if (params.type === 1) {
            let newParams = {
                ids: params.ids.join(","),
            }
            this.getSongPlayList(dispatch, newParams, (data) => {
                dispatch(receiveNowPlaySongId(data[0].id));
            })
        } else if (params.type === 2) {
            let newParams = {
                ids: params.ids.join(","),
            }
            this.getSongPlayList(dispatch, newParams, (data) => {
                dispatch(receiveNowPlaySongId(params.nextPlayId));
            })
        }
        else if (params.type === 3) {
            dispatch(receiveSongPlayList([]));
            dispatch(receiveSongDetail({}));
            dispatch(receiveSongUrl(""));
            dispatch(receiveNowPlaySongId(""))
        } else if (params.type === 4) {
            let newParams = {
                ids: params.ids.join(","),
            }
            this.getSongPlayList(dispatch, newParams, (data) => {
                dispatch(receiveNowPlaySongId(params.nowPlayId));
            })
        }
        setTimeout(cb, 3000)
    }
    getSongListDetail(dispatch, params, cb) {
        let url = Apis.GET_SONG_LIST_DETAIL;
        this.get(url, params).then(res => {
            dispatch(receiveSongListDetail(res.data.playlist));
            cb && cb();
        }).catch(error => {

        })
    }

}


export default new Service()