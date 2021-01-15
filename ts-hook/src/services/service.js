import extendsApi from './extendsApi';
import Apicfg from './Apis';
var Apis = new Apicfg();

class Service extends extendsApi {
    getTypeList = (params) => {
        let url = Apis.GET_TYPE_LIST;
        return this.get(url, params);
    };
    addType = (params) => {
        let url = Apis.ADD_TYPE;
        return this.get(url, params);
    };
    updataType = (params) => {
        let url = Apis.UPDATA_TYPE;
        return this.get(url, params);
    };
    delType = (params) => {
        let url = Apis.DEL_TYPE;
        return this.get(url, params);
    };
    getTableList = (params) => {
        let url = Apis.GET_TABLE_LIST;
        return this.get(url, params);
    };
}

export default new Service();
