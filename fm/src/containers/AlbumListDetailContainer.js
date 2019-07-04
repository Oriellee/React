import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Anchor, Drawer } from 'antd';
import { Toast } from 'antd-mobile';
import '../assets/styles/main.scss';
import Service from '../services/service';
import BackPrevious from '../components/backPrevious';
import SongListBox from './SongListBox';

class AlbumListDetailContainer extends Component {
    constructor() {
        super()
        this.state = {
            isDetailInfoShow: false,
        }
        this.playAll = this.playAll.bind(this);
    }
    componentDidMount() {
        this.getAlbumListDetail();
    }

    // 获取歌曲详情.
    getAlbumListDetail() {
        let params = {
            id: this.props.match.params ? this.props.match.params.id : ""
        }
        this.props.getAlbumListDetail(params);
    }

    // 修改歌曲详情信息页面的打开关闭.
    changeDetailnfoStatus = (status) => {
        this.setState({
            isDetailInfoShow: status
        })
    }

    // 播放全部.
    playAll() {
        let list = this.props.albumListDetail ? [...this.props.albumListDetail.tracks] : [];
        if (list.length > 0) {
            let songPlayListIds = [];
            list.forEach((item, index) => {
                songPlayListIds.push(item.id);
            })
            let params = {
                type: 1,//播放全部.
                ids: songPlayListIds
            }
            this.props.changeSongPlayListIds(params, () => {
                console.log(this.props)
            });
        } else {
            Toast.info('列表为空~', 2, null, true);
        }
    }


    render() {
        let albumInfo = this.props.albumListDetail.album ? this.props.albumListDetail.album : {};
        let songList = this.props.albumListDetail.songs ? this.props.albumListDetail.songs : [];
        return (
            <div className='songListBox '>
                <div className='songListInfo'>
                    <img alt='' className='songListInfoBg' src={albumInfo ? albumInfo.picUrl : ""} />
                    <div className='songListInfoBody'>
                        <BackPrevious url='/home' />
                        <div className='songListInfoContent'>
                            <img alt='' className='songListImg' src={albumInfo && albumInfo.picUrl} />
                            <div className='songListText'>
                                <h3>{albumInfo.name}</h3>
                                <div className='auatarBox'>
                                    {/* <img alt='' src={albumInfo && albumInfo.avatarUrl} /> */}
                                    <span>歌手 : {albumInfo.artists && albumInfo.artists.map((item, index) => { return item.name + " " })}</span>
                                </div>
                                <div onClick={() => this.changeDetailnfoStatus(true)}>
                                    <div>
                                        {albumInfo.description}
                                    </div>
                                    <Icon type="right" />
                                </div>
                            </div>
                        </div>
                        <div className='songListShow'>
                            <div>
                                <Icon type="play-circle" />
                                <span>{albumInfo.info && albumInfo.info.commentThread.hotCount}</span>
                            </div>
                            <div>
                                <Icon type="share-alt" />
                                <span>{albumInfo.info && albumInfo.info.commentThread.shareCount}</span>
                            </div>
                            <div>
                                <Icon type="message" />
                                <span>{albumInfo.info && albumInfo.info.commentThread.commentCount}</span>
                            </div>
                            <div>
                                <Icon type="heart" />
                                <span>{albumInfo.info && albumInfo.info.commentThread.likedCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='songListTracks'>
                    <Anchor className='playAllBtn' >
                        <Icon type="play-circle" onClick={this.playAll} />
                        <span>播放全部</span>
                        <span>(共{songList && songList.length}首)</span>
                    </Anchor>
                    <SongListBox {...this.props} songList={songList} />
                </div>
                <Drawer
                    title=""
                    placement='right'
                    closable={true}
                    onClose={() => this.changeDetailnfoStatus(false)}
                    visible={this.state.isDetailInfoShow}
                    width="100%"
                    maskClosable={true}
                    bodyStyle={{}}
                >
                    <div className='songListInfoDrawer'>
                        <img alt='' className='songListInfoDrawerBg' src={albumInfo.picUrl ? albumInfo.picUrl : ""} />
                        <div className='songListInfoDrawerBody'>
                            <img alt='' className='songListInfoDrawerCover' src={albumInfo.picUrl && albumInfo.picUrl} />
                            <h3 className='songListInfoDrawerTitle'>{albumInfo.name && albumInfo.name}</h3>
                            <div className='songListInfoDrawerTags'>
                                <span>标签:</span>
                                {albumInfo.tags && albumInfo.tags.map((item, index) =>
                                    <div key={index}>{item}</div>
                                )}
                            </div>
                            <div className='songListInfoDrawerDesc'>
                                <pre>{albumInfo.description && albumInfo.description}</pre>
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
        albumListDetail: state.albumListDetail,
        songPlayListIds: state.songPlayListIds,
        all: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumListDetail: (params, cb) => {
            return Service.getAlbumListDetail(dispatch, params, cb);
        },
        changeSongPlayListIds: (params, cb) => {
            return Service.changeSongPlayListIds(dispatch, params, cb);
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlbumListDetailContainer)