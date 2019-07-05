import React, { Component } from 'react';
import { Icon, Drawer } from 'antd';
import { connect } from 'react-redux';

import Service from '../services/service';

class SongListBox extends Component {
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
            this.props.changeDraweShowState(status)
        })
    }
    // 播放选中歌曲.
    changeNowPlaySong(row) {
        let songPlayListIds = [...this.props.songPlayListIds];
        let flag = true;
        songPlayListIds.forEach((item, index) => {
            if (item === row.id) {
                flag = false;
            }
        })
        flag && songPlayListIds.push(row.id);
        let params = {
            type: 4,//加入播放列表并且播放该歌曲,
            ids: songPlayListIds,
            nowPlayId: row.id,
        }
        this.props.changeSongPlayListIds(params);
    }

    // 添加下一首播放.
    addNextPlaySong(row) {
        let songPlayListIds = [...this.props.songPlayListIds];
        let flag = true;
        songPlayListIds.forEach((item, index) => {
            if (item === row.id) {
                flag = false;
            }
        })
        flag && songPlayListIds.splice(songPlayListIds.indexOf(this.props.nowPlaySongId) + 1, 0, row.id);
        let params = {
            type: 4,//加入播放列表并且播放该歌曲,
            ids: songPlayListIds,
        }
        this.props.changeSongPlayListIds(params, () => this.changePlayOperateDrawerStatus(false));
    }
    render() {
        const playOperateDrawerTitle =
            <div className='playOperateDrawerTitle'>
                {this.state.checkedSong.al && <img src={this.state.checkedSong.al.picUrl} alt='' />}
                <div>
                    <span>歌曲 : {this.state.checkedSong.name}</span>
                    <span>{this.state.checkedSong.ar ? this.state.checkedSong.ar.map((arItem, arIndex) => { return arItem.name + " " }) : this.state.checkedSong.artists ? this.state.checkedSong.artists.map((arItem, arIndex) => { return arItem.name + " " }) : ""}</span>
                </div>
            </div>
        return (
            <div className={this.props.draweShowState?'songListBox hideContent':'songListBox'}>
                {this.props.songList.map((item, index) =>
                    <div key={index} className='songListRow' >
                        <span>{index + 1}</span>
                        <div onClick={() => this.changeNowPlaySong(item)}>
                            <span className={(item.id === this.props.nowPlaySongId) ? "nowPlaySong" : undefined}>{item.name}</span>
                            <span>{item.ar ? item.ar.map((arItem, arIndex) => { return arItem.name + " " }) : item.artists ? item.artists.map((arItem, arIndex) => { return arItem.name + " " }) : ""} - {item.al ? item.al.name : item.album ? item.album.name : ""}</span>
                        </div>
                        <div>
                            <Icon type="play-square" />
                            <Icon type="more" onClick={() => this.changePlayOperateDrawerStatus(true, item)} />
                        </div>
                    </div>
                )}
                <Drawer
                    title={playOperateDrawerTitle}
                    placement='bottom'
                    closable={false}
                    onClose={() => this.changePlayOperateDrawerStatus(false)}
                    visible={this.state.isplayOperateDrawerShow}
                    height={600}
                    maskClosable={true}
                >
                    <div className='playOperateDrawer'>
                        <p onClick={() => this.addNextPlaySong(this.state.checkedSong)}>
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
                            <span>歌手 : {this.state.checkedSong.ar ? this.state.checkedSong.ar.map((arItem, arIndex) => { return arItem.name + " " }) : this.state.checkedSong.artists ? this.state.checkedSong.artists.map((arItem, arIndex) => { return arItem.name + " " }) : ""}</span>
                        </p>
                        <p>
                            <Icon type="customer-service" />
                            <span>专辑 : {this.state.checkedSong.al ? this.state.checkedSong.al.name : this.state.checkedSong.album ? this.state.checkedSong.album.name : ""}</span>
                        </p>

                    </div>
                    <div className='songPlayListColseDrawer' onClick={() => this.changePlayOperateDrawerStatus(false)}>关闭</div>
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // songDetail: state.songDetail,
        nowPlaySongId: state.nowPlaySongId,
        // songUrl: state.songUrl,
        // songPlayList: state.songPlayList,
        songPlayListIds: state.songPlayListIds,
        draweShowState:state.draweShowState,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDraweShowState: (params, cb) => {
            return Service.changeDraweShowState(dispatch, params, cb);
        },
        // getSongDetail: (params, cb) => {
        //     return Service.getSongDetail(dispatch, params, cb);
        // },
        // getSongUrl: (params, cb) => {
        //     return Service.getSongUrl(dispatch, params, cb);
        // },
        // getSongPlayList: (params, cb) => {
        //     return Service.getSongPlayList(dispatch, params, cb);
        // },
        // changeSongPlayListIds: (params, cb) => {
        //     return Service.changeSongPlayListIds(dispatch, params, cb);
        // },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongListBox)