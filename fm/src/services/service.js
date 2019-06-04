import extendsApi from './extendsApi';
import { receiveBannerList, receiveHotPlayList, receiveHighQualityPlayList, receivePersonalized, receiveTopAlbum } from '../action/main';
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
        this.post(url, params).then(res => {
            dispatch(receiveBannerList(res.data.banners));
            cb && cb();
        }).catch(error => {

        })
    }
    getHotPlayList(dispatch, params, cb) {
        let url = Apis.GET_HOT_PLAY_LIST;
        this.post(url, params).then(res => {
            dispatch(receiveHotPlayList(res.data.tags));
            cb && cb();
        }).catch(error => {

        })
    }
    getHighQualityPlayList(dispatch, params, cb) {
        let url = Apis.GET_HIGH_QUALITY_PLAY_LIST;
        this.post(url, params).then(res => {
            dispatch(receiveHighQualityPlayList(res.data.playlists));
            cb && cb();
        }).catch(error => {

        })
    }
    getPersonalized(dispatch, params, cb) {
        let url = Apis.GET_PERSONALIZED;
        this.post(url, params).then(res => {
            dispatch(receivePersonalized(res.data.result));
            cb && cb();
        }).catch(error => {

        })
    }
    getTopAlbum(dispatch, params, cb) {
        let url = Apis.GET_TOP_ALBUM;
        this.post(url, params).then(res => {
            dispatch(receiveTopAlbum(res.data.albums));
            cb && cb();
        }).catch(error => {

        })
    }
}


export default new Service()