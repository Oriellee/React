import extendsApi from './extendsApi'

class AllServiceApi extends extendsApi {
    // constructor() {
    //     super()
    //     this.demoUrl = ''
    // }
    demoGet(params) {
        let url = '/top/playlist?limit=10&order=new';
        return this.get(url, params).then(res => {
            return res.data
        })
    }
}


export default new AllServiceApi()