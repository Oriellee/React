
import React, { Component } from 'react';
import { Icon } from 'antd';

export default class extends Component {
    render() {
        return (
            <div className='typeList'>
                <div className='inner'>
                    {
                        this.props.list.map((item, index) =>
                            <div key={index} className='musicRow'>
                                <div>
                                    <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557923398794&di=e4dbbe0fab512625094b7f5e515cc5d0&imgtype=0&src=http%3A%2F%2Fzjnews.zjol.com.cn%2Fzjnews%2Fzjxw%2F201705%2FW020170516308318226126.jpg' />
                                    <Icon type="play-circle" width={'1.25em'} height={'1.25em'} />
                                </div>
                                <p>今日歌曲推荐测试测试测试</p>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
