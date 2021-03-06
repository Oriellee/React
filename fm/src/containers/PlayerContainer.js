import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Drawer, Icon } from 'antd';
import { Slider } from 'antd-mobile';

import '../assets/styles/main.scss';
import Service from '../services/service';

class PlayerContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 是否暂停状态
            playStatus: false,
            // 总时间
            totalTime: "00:00",
            // 当前播放时间
            currentTime: "00:00",
            // 进度条item是否可拖动
            progress: 0,
            processItemMove: false,
            // 当前的播放模式 1列表循环 2随机 3单曲
            playMode: 1,
            // 歌单显示控制
            isSongPlayListShow: false,
            isCanPlay: false,
        }
        this.getSongPlayList = this.getSongPlayList.bind(this);
        this.getSongUrl = this.getSongUrl.bind(this);
        this.initSongSetting = this.initSongSetting.bind(this);
        this.allDelSongPlayList = this.allDelSongPlayList.bind(this);
        this.changeNowPlaySong = this.changeNowPlaySong.bind(this);
        this.onSwitchAction = this.onSwitchAction.bind(this);
    }

    componentDidMount() {
        this.getSongDetail(this.props.nowPlaySongId);
        // this.getSongUrl();
        // this.initSongSetting();
        this.getSongPlayList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nowPlaySongId !== "" && nextProps.nowPlaySongId !== this.props.nowPlaySongId) {
            this.getSongDetail(nextProps.nowPlaySongId);
        }
    }

    // 初始化歌曲设置.
    initSongSetting() {
        this.setState({
            // playStatus: false,
            progress: 0,
        })
        const audio = this.audio;
        audio.volume = 0.2;
        // 这里需要设置audio的canplay事件监听
        audio.addEventListener("canplay", () => {
            //获取总时间
            const totalTime = parseInt(audio.duration);
            this.setState({
                totalTime: this.getTime(totalTime),
                isCanPlay: true,
            });
            this.onSwitchAction();
        });
        // 播放中添加时间变化监听
        audio.addEventListener("timeupdate", () => {
            const { processItemMove } = this.state;
            //获取当前播放时间
            if (audio.duration) {
                const currentTime = parseInt(audio.currentTime);
                // 进度条.
                const playWidth = 100 * (audio.currentTime / audio.duration);
                // 如果正在拖动进度条的时候，不监听播放进度
                if (!processItemMove) {
                    // 未拖动时根据时间变化设置当前时间
                    this.setState({
                        currentTime: this.getTime(currentTime),
                        progress: playWidth,
                    });
                }
            }
        });

        // 当前音乐播放完毕监听
        audio.addEventListener("ended", () => {
            this.endedPlayMusic();
        });

    }
    endedPlayMusic() {
        let songPlayListIds = this.props.songPlayListIds;
        let nowPlaySongId = this.props.nowPlaySongId;
        if (songPlayListIds.length > 0 && nowPlaySongId) {
            const currentIndex = songPlayListIds.findIndex(item => {
                return item === nowPlaySongId;
            });
            if ([currentIndex + 1]) {
                this.changeNowPlaySong({ id: songPlayListIds[currentIndex + 1] })
            } else {
                this.changeNowPlaySong({ id: songPlayListIds[0] })
            }
        }

        // const { playMode, currentMusic } = this.state;
        // const { musicList } = this.state;
        // if (musicList.length > 0 && currentMusic) {
        //     const currentIndex = musicList.findIndex(item => {
        //         return item.id === currentMusic.id;
        //     });
        //     // 列表循环
        //     if (playMode === 1) {
        //         if (musicList[currentIndex + 1]) {
        //             this.setState({ currentMusic: musicList[currentIndex + 1] }, () => {
        //                 this.onSwitchAction();
        //             });
        //         } else {
        //             this.setState({ currentMusic: musicList[0] }, () => {
        //                 this.onSwitchAction();
        //             });
        //         }
        //     }
        //     // 列表随机
        //     else if (playMode === 2) {
        //         const randomIndex = Math.floor(Math.random() * 3 + 1);
        //         if (musicList[randomIndex + 1]) {
        //             this.setState({ currentMusic: musicList[randomIndex + 1] }, () => {
        //                 this.onSwitchAction();
        //             });
        //         } else {
        //             this.setState({ currentMusic: musicList[0] }, () => {
        //                 this.onSwitchAction();
        //             });
        //         }
        //     }
        //     // 单曲循环
        //     else if (playMode === 3) {
        //         this.onSwitchAction();
        //     }
        // } else {
        //     // 当前播放列表已经空了，则不自动切歌，播放完毕后，直接重置当前的播放的音乐
        this.onSwitchAction();
        // }
    };

    // 切歌后相关操作，如果正在播放中，则切歌后还是会直接播放，如果处于暂停，则切歌后不会直接播放
    onSwitchAction() {
        const { playStatus } = this.state;
        // 处于暂停标志，则表示正在播放中，则重置进度条后，直接调用播放，否则就只重置进度条，不调用播放
        this.resetProcess();
        if (playStatus) {
            this.changePlayStatus(true);
        }
    };

    // 重新设置当前缓存和播放进度状态，用于切歌后的进度条显示
    resetProcess() {
        this.setState({
            progress: 0
        })
    };

    // 秒转换-分:秒的格式
    getTime(time) {
        if (time) {
            const minute = parseInt((time / 60) % 60);
            const second = parseInt(time % 60);
            let minuteText = `${minute}`;
            let secondText = `${second}`;
            if (minute < 10) {
                minuteText = `0${minute}`;
            }
            if (second < 10) {
                secondText = `0${second}`;
            }
            return `${minuteText}:${secondText}`;
        } else {
            return "00:00";
        }
    };

    // 获取歌曲详情.
    getSongDetail(id) {
        this.setState({
            progress: 0
        })
        let params = {
            ids: id
        }
        this.props.getSongDetail(params, this.getSongUrl);
    }

    // 获取播放歌曲url.
    getSongUrl() {
        let params = {
            id: this.props.nowPlaySongId,
            br: 320000,
        }
        this.props.getSongUrl(params, this.initSongSetting);
    }

    // 根据列表id,获取所有列表歌曲详情.
    getSongPlayList() {
        let params = {
            ids: this.props.songPlayListIds.join(","),
        }
        this.props.getSongPlayList(params);
    }

    // 修改播放状态.
    changePlayStatus(status) {
        const audio = this.audio;
        this.setState({ playStatus: status }, () => {
            status ? audio.play() : audio.pause();
        });
    }

    // 设置进度条.
    changeProgress = (value) => {
        const audio = this.audio;
        audio.currentTime = (value / 100) * audio.duration;
    }

    // 展开关闭播放列表.
    changeSongPlayListStatus = (status) => {
        this.setState({
            isSongPlayListShow: status,
        });
    };

    // 删除播放列表中的歌曲.
    delSongPlayRow(row) {
        let songPlayListIds = [...this.props.songPlayListIds];
        let nowIndex;
        songPlayListIds.forEach((item, index) => {
            if (row.id === item) {
                songPlayListIds.splice(index, 1);
                nowIndex = index;
            }
        })
        let params = {};
        if (songPlayListIds.length > 0) {
            params = {
                type: 2,//删除单首歌曲,
                ids: songPlayListIds,
                nextPlayId: row.id === this.props.nowPlaySongId ? songPlayListIds[nowIndex] : this.props.nowPlaySongId
            }
        } else {
            params = {
                type: 3,//清空播放列表.
                ids: [],
            }
        }
        this.props.changeSongPlayListIds(params);

    }

    // 清空播放列表.
    allDelSongPlayList() {
        let params = {
            type: 3,//清空播放列表.
            ids: [],
        }
        this.props.changeSongPlayListIds(params, () => this.changeSongPlayListStatus(false));
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


    render() {
        const songPlayListDrawerTitle = <div className='songPlayListDrawerTitle'>
            <span>播放列表({this.props.songPlayList.length}首)</span>
            <div>
                <Icon type="delete" onClick={this.allDelSongPlayList} />
            </div>
        </div>
        return (
            <div>
                {
                    this.props.songPlayList.length > 0 && <div className='PlayerBox'>
                        <div className='playerOperate'>
                            <div className='nowPlayInfo'>
                                <div className='nowPlayInfoImg'>
                                    <img src={this.props.songDetail.al ? this.props.songDetail.al.picUrl : undefined} alt='' />
                                </div>
                                <div className='nowPlayInfoTitle'>
                                    <span>{this.props.songDetail.name}</span>
                                    <span>{this.props.songDetail.ar && this.props.songDetail.ar.map((item, index) => { return item.name + " " })}</span>
                                </div>
                            </div>
                            <div className='nowPlayOption'>
                                {
                                    this.state.playStatus ?
                                        <Button type="ghost" shape="circle-outline" icon="pause-circle" disabled={!this.state.isCanPlay} onClick={() => this.changePlayStatus(false)} />
                                        : <Button type="ghost" shape="circle-outline" icon="play-circle" disabled={!this.state.isCanPlay} onClick={() => this.changePlayStatus(true)} />
                                }
                                <Button type="ghost" shape="circle-outline" icon="menu" onClick={() => this.changeSongPlayListStatus(true)} disabled={!this.state.isCanPlay} />
                                <audio ref={ref => (this.audio = ref)} id="audio" preload="metadata"
                                    src={this.props.songUrl.url ? this.props.songUrl.url : undefined}>
                                </audio>
                            </div>
                        </div>
                        <div className='playerProgress'>
                            <Slider
                                value={this.state.progress}
                                onChange={this.changeProgress}
                                trackStyle={{
                                    backgroundColor: '#c56276',
                                    height: '2px',
                                }}
                                railStyle={{
                                    backgroundColor: '#5a5a5a',
                                    height: '2px',
                                }}
                                handleStyle={{
                                    height: '0px',
                                    width: '0px',
                                    marginLeft: '-3px',
                                    marginTop: '0px',
                                    backgroundColor: '#c56276',
                                    borderColor: '#c56276',
                                }}
                                disabled={!this.state.isCanPlay}
                            />
                        </div>
                        <Drawer
                            title={songPlayListDrawerTitle}
                            placement='bottom'
                            closable={false}
                            onClose={() => this.changeSongPlayListStatus(false)}
                            visible={this.state.isSongPlayListShow}
                            height={500}
                            maskClosable={true}
                        >
                            <div className='songPlayListDrawer'>
                                {
                                    this.props.songPlayList.map((item, index) =>
                                        <p key={index} onClick={() => this.changeNowPlaySong(item)}>
                                            <span className={(item.id === this.props.nowPlaySongId) ? "nowPlaySong" : undefined}>{item.name} - {item.ar.map((arItem, arIndex) => { return arItem.name + " " })}</span>
                                            <Icon type="close" onClick={() => this.delSongPlayRow(item)} />
                                        </p>
                                    )
                                }
                            </div>
                            <div className='songPlayListColseDrawer' onClick={() => this.changeSongPlayListStatus(false)}>关闭</div>
                        </Drawer>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songDetail: state.songDetail,
        nowPlaySongId: state.nowPlaySongId,
        songUrl: state.songUrl,
        songPlayList: state.songPlayList,
        songPlayListIds: state.songPlayListIds,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSongDetail: (params, cb) => {
            return Service.getSongDetail(dispatch, params, cb);
        },
        getSongUrl: (params, cb) => {
            return Service.getSongUrl(dispatch, params, cb);
        },
        getSongPlayList: (params, cb) => {
            return Service.getSongPlayList(dispatch, params, cb);
        },
        changeSongPlayListIds: (params, cb) => {
            return Service.changeSongPlayListIds(dispatch, params, cb);
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerContainer)