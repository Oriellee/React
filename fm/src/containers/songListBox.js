import React, { Component } from 'react';
import { Icon, Drawer } from 'antd';

class songListBox extends Component {
    constructor() {
        super()
        this.state = {
            checkedSong: {},
            isplayOperateDrawerShow: false,

        }
    }
    // 修改抽屉状态.
    changePlayOperateDrawerStatus(status, row) {
        this.setState({
            isplayOperateDrawerShow: status,
            checkedSong: row ? row : {}
        }, () => {
            console.log(this.state)
        })
    }
    render() {
        const playOperateDrawerTitle =
            <div className='playOperateDrawerTitle'>
                <img src={this.state.checkedSong.al && this.state.checkedSong.al.picUrl} alt='' />
                <div>
                    <span>歌曲 : {this.state.checkedSong.name}</span>
                    <span>{this.state.checkedSong.ar && this.state.checkedSong.ar.map((item, index) => { return item.name + " " })}</span>
                </div>
            </div>
        return (
            <div className='songListBox'>
                {this.props.songListDetail.tracks && this.props.songListDetail.tracks.map((item, index) =>
                    <div key={index} className='songListRow' onClick={() => this.changePlayOperateDrawerStatus(true, item)}>
                        <span>{index + 1}</span>
                        <div>
                            <span>{item.name}</span>
                            <span>{item.ar.map((arItem, arIndex) => { return arItem.name + " " })} - {item.al.name}</span>
                        </div>
                        <div>
                            <Icon type="play-square" />
                            <Icon type="more" />
                        </div>
                    </div>
                )}
                <Drawer
                    title={playOperateDrawerTitle}
                    placement='bottom'
                    closable={false}
                    onClose={() => this.changePlayOperateDrawerStatus(false)}
                    visible={this.state.isplayOperateDrawerShow}
                    height={530}
                    maskClosable={true}
                >
                    <div className='playOperateDrawer'>
                        <p>
                            <Icon type="play-circle" />
                            <span>下一首播放</span>
                        </p>
                        <p>
                            <Icon type="folder-add" />
                            <span>收藏到歌单</span>
                        </p>
                        <p>
                            <Icon type="download" />
                            <span>下载</span>
                        </p>
                        <p>
                            <Icon type="message" />
                            <span>评论</span>
                        </p>
                        <p>
                            <Icon type="share-alt" />
                            <span>分享</span>
                        </p>
                        <p>
                            <Icon type="user" />
                            <span>歌手 : {this.state.checkedSong.ar && this.state.checkedSong.ar.map((arItem, arIndex) => { return arItem.name + " " })}</span>
                        </p>
                        <p>
                            <Icon type="customer-service" />
                            <span>专辑 : {this.state.checkedSong.al && this.state.checkedSong.al.name}</span>
                        </p>

                    </div>
                    <div className='songPlayListColseDrawer' onClick={() => this.changePlayOperateDrawerStatus(false)}>关闭</div>
                </Drawer>
            </div>
        )
    }
}
export default songListBox;