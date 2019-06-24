import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Anchor, Drawer } from 'antd';
import { Toast } from 'antd-mobile';
import '../assets/styles/main.scss';
import Service from '../services/service';
import BackPrevious from '../components/backPrevious';
import SongListBox from './songListBox';

class SongListDetailContainer extends Component {
    constructor() {
        super()
        this.state = {
            isSongListInfoShow: false,
        }
        this.playAll = this.playAll.bind(this);
    }
    componentDidMount() {
        this.getSongListDetail();
    }

    // 获取歌曲详情.
    getSongListDetail() {
        let params = {
            id: this.props.match.params ? this.props.match.params.id : ""
        }
        this.props.getSongListDetail(params);
    }

    // 修改歌曲详情信息页面的打开关闭.
    changeSongListInfoStatus = (status) => {
        this.setState({
            isSongListInfoShow: status
        })
    }

    // 播放全部.
    playAll() {
        let list = this.props.songListDetail ? [...this.props.songListDetail.tracks] : [];
        console.log("aaaa",list)

        if (list.length > 0) {
            let songPlayListIds = [];
            list.forEach((item, index) => {
                songPlayListIds.push(item.id);
            })
            let params = {
                type: 1,//播放全部.
                ids: songPlayListIds
            }
            this.props.changeSongPlayListIds(params,()=>{
                console.log(this.props)
            });
        } else {
            Toast.info('列表为空~', 2, null, true);
        }
    }


    render() {
        return (
            <div className='songListBox '>
                <div className='songListInfo'>
                    <img alt='' className='songListInfoBg' src={this.props.songListDetail.coverImgUrl ? this.props.songListDetail.coverImgUrl : ""} />
                    <div className='songListInfoBody'>
                        <BackPrevious url='/home' />
                        <div className='songListInfoContent'>
                            <img alt='' className='songListImg' src={this.props.songListDetail.coverImgUrl && this.props.songListDetail.coverImgUrl} />
                            <div className='songListText'>
                                <h3>{this.props.songListDetail.name && this.props.songListDetail.name}</h3>
                                <div className='auatarBox'>
                                    <img alt='' src={this.props.songListDetail.creator && this.props.songListDetail.creator.avatarUrl} />
                                    <span>{this.props.songListDetail.creator && this.props.songListDetail.creator.nickname}</span>
                                </div>
                                <div onClick={() => this.changeSongListInfoStatus(true)}>
                                    <div>
                                        {this.props.songListDetail.description && this.props.songListDetail.description}
                                    </div>
                                    <Icon type="right" />
                                </div>
                            </div>
                        </div>
                        <div className='songListShow'>
                            <div>
                                <Icon type="play-circle" />
                                <span>{this.props.songListDetail.playCount && this.props.songListDetail.playCount}</span>
                            </div>
                            <div>
                                <Icon type="share-alt" />
                                <span>{this.props.songListDetail.shareCount && this.props.songListDetail.shareCount}</span>
                            </div>
                            <div>
                                <Icon type="message" />
                                <span>{this.props.songListDetail.commentCount && this.props.songListDetail.commentCount}</span>
                            </div>
                            <div>
                                <Icon type="heart" />
                                <span>{this.props.songListDetail.subscribedCount && this.props.songListDetail.subscribedCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='songListTracks'>
                    <Anchor className='playAllBtn' >
                        <Icon type="play-circle" onClick={this.playAll} />
                        <span>播放全部</span>
                        <span>(共{this.props.songListDetail.tracks && this.props.songListDetail.tracks.length}首)</span>
                    </Anchor>
                    <SongListBox {...this.props} />
                </div>
                <Drawer
                    title=""
                    placement='right'
                    closable={true}
                    onClose={() => this.changeSongListInfoStatus(false)}
                    visible={this.state.isSongListInfoShow}
                    width="100%"
                    maskClosable={true}
                    bodyStyle={{}}
                >
                    <div className='songListInfoDrawer'>
                        <img alt='' className='songListInfoDrawerBg' src={this.props.songListDetail.coverImgUrl ? this.props.songListDetail.coverImgUrl : ""} />
                        <div className='songListInfoDrawerBody'>
                            <img alt='' className='songListInfoDrawerCover' src={this.props.songListDetail.coverImgUrl && this.props.songListDetail.coverImgUrl} />
                            <h3 className='songListInfoDrawerTitle'>{this.props.songListDetail.name && this.props.songListDetail.name}</h3>
                            <div className='songListInfoDrawerTags'>
                                <span>标签:</span>
                                {this.props.songListDetail.tags && this.props.songListDetail.tags.map((item, index) =>
                                    <div key={index}>{item}</div>
                                )}
                            </div>
                            <div className='songListInfoDrawerDesc'>
                                <pre>{this.props.songListDetail.description && this.props.songListDetail.description}</pre>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songListDetail: state.songListDetail,
        songPlayListIds: state.songPlayListIds,
        all:state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSongListDetail: (params, cb) => {
            return Service.getSongListDetail(dispatch, params, cb);
        },
        changeSongPlayListIds: (params, cb) => {
            return Service.changeSongPlayListIds(dispatch, params, cb);
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongListDetailContainer)