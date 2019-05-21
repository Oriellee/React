import extendsApi from './extendsApi';
import { receiveBannerList } from '../action/main';
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
            console.log(res.data);
            dispatch(receiveBannerList(res.data.banner));
            cb && cb();
        }).catch(error => {

        })
    }
}


export default new Service()