import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Slider, List, Drawer } from 'antd-mobile';

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
    }

    componentDidMount() {
        this.getSongDetail();
        this.getSongUrl();
        this.initSongSetting();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nowPlaySongId !== this.props.nowPlaySongId) {
            this.getSongDetail();
        }
    }

    // 初始化歌曲设置.
    initSongSetting() {
        const audio = this.audio;
        audio.volume = 0.5;
        // 这里需要设置audio的canplay事件监听
        audio.addEventListener("canplay", () => {
            //获取总时间
            const totalTime = parseInt(audio.duration);
            this.setState({
                totalTime: this.getTime(totalTime),
                isCanPlay: true,
            });
        });
        // 播放中添加时间变化监听
        audio.addEventListener("timeupdate", () => {
            const { processItemMove } = this.state;
            //获取当前播放时间
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
        });

        // 当前音乐播放完毕监听
        audio.addEventListener("ended", () => {
            this.endedPlayMusic();
        });

    }
    endedPlayMusic() {
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
    getSongDetail() {
        let params = {
            ids: this.props.nowPlaySongId
        }
        this.props.getSongDetail(params);
    }

    // 获取播放歌曲url.
    getSongUrl() {
        let params = {
            id: this.props.nowPlaySongId,
            br: 320000,
        }
        this.props.getSongUrl(params);
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

    showDrawer = () => {
        console.log("aaa")
        this.setState({
            isSongPlayListShow: !this.state.isSongPlayListShow,
        }, () => {
            console.log(this.state)
        });
    };

    onClose = () => {
        this.setState({
            isSongPlayListShow: false,
        });
    };

    render() {
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                        multipleLine
                    >Category</List.Item>);
                }
                return (<List.Item key={index}
                    thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                >Category{index}</List.Item>);
            })}
        </List>);

        return (
            <div className='PlayerBox'>
                <div className='playerOperate'>
                    <div className='nowPlayInfo'>
                        <div className='nowPlayInfoImg'>
                            <img src={this.props.songDetail.al && this.props.songDetail.al.picUrl} alt='' />
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
                        <Button type="ghost" shape="circle-outline" icon="menu" onClick={this.showDrawer} disabled={!this.state.isCanPlay} />
                        <audio ref={ref => (this.audio = ref)} id="audio" preload="metadata"
                            src={this.props.songUrl.url && this.props.songUrl.url}>
                        </audio>
                    </div>
                </div>
                <div className='playerProgress'>
                    <Slider
                        style={{}}
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
                {/* <div className='songPlayListBox'> */}
                {/* <Drawer
                    title="Basic Drawer"
                    placement='bottom'
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.isSongPlayListShow}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer> */}
                
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.isSongPlayListShow}
        onOpenChange={this.showDrawer}
        position='bottom'
      >
        Click upper-left corner
      </Drawer>
                {/* </div> */}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songDetail: state.songDetail,
        nowPlaySongId: state.nowPlaySongId,
        songUrl: state.songUrl,

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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerContainer)