import api from './interApi';
import qs from 'qs';

class axiosApi {
    get = (url, params = {}) => {
        // get 请求
        if (Object.prototype.toString.call(params) === '[object Object]') {
            console.log('req========>', url);
            return api.creatAxios1.get(url, { params: params });
        } else {
            const error = new Error('参数错误！');
            try {
                throw error;
            } catch (e) {
                console.log('e=======>', e);
            }
        }
    };
    post = (url, params = {}) => {
        // post 请求
        if (Object.prototype.toString.call(params) === '[object Object]') {
            return api.creatAxios1.post(url, qs.stringify(params));
        } else {
            const error = new Error('参数错误！');
            try {
                throw error;
            } catch (e) {
                console.log('e=======>', e);
            }
        }
    };

    /**
     * 并发请求，同时发送多个请求，使用栗子：src/views/infoEntry/dragCard/dragCardService.js
     * 顺序和请求发送的顺序相同
     * @param {arr: [请求1,请求2...]}
     */

    sendAll = (arr) => {
        // 并发请求
        return new Promise((resolve, reject) => {
            api.sendAll(arr).then((res) => {
                return resolve(res);
            });
        });
    };
}

export default axiosApi;
