import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon,Anchor } from 'antd';
import '../assets/styles/main.scss';
import Service from '../services/service';

class SongListDetailContainer extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount() {
        this.getSongListDetail();
    }

    getSongListDetail() {
        let params = {
            id: this.props.location.query ? this.props.location.query.id : ""
        }
        this.props.getSongListDetail(params);
    }


    render() {
        return (
            <div className='songListBox '>
                <div className='songListInfo'>
                    <img className='songListInfoBg' src={this.props.songListDetail.coverImgUrl ? this.props.songListDetail.coverImgUrl : ""} />
                    <div className='songListInfoBody'>
                        <div className='backIndexBtn'>
                            <Icon type="arrow-left" />
                        </div>
                        <div className='songListInfoContent'>
                            <img className='songListImg' src={this.props.songListDetail.coverImgUrl && this.props.songListDetail.coverImgUrl} />
                            <div className='songListText'>
                                <h3>{this.props.songListDetail.name && this.props.songListDetail.name}</h3>
                                <div className='auatarBox'>
                                    <img src={this.props.songListDetail.creator && this.props.songListDetail.creator.avatarUrl} />
                                    <span>{this.props.songListDetail.creator && this.props.songListDetail.creator.nickname}</span>
                                </div>
                                <div>{this.props.songListDetail.description && this.props.songListDetail.description}</div>
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
                    <Anchor className='playAllBtn'>
                        <Icon type="play-circle" />
                        <span>播放全部</span>
                        <span>(共{this.props.songListDetail.tracks && this.props.songListDetail.tracks.length}首)</span>
                    </Anchor>
                    <div className='songListBox'>
                        {this.props.songListDetail.tracks && this.props.songListDetail.tracks.map((item, index) =>
                            <div key={index} className='songListRow'>
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
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songListDetail: state.songListDetail
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSongListDetail: (params, cb) => {
            return Service.getSongListDetail(dispatch, params, cb);
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongListDetailContainer)