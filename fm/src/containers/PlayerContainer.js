import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Carousel, WingBlank, Flex } from 'antd-mobile';
import ContentTitle from '../components/main/ContentTitle';
import HotPlayList from '../components/main/HotPlayList';
import CatList from '../components/main/CatList';
import '../assets/styles/main.scss';
import Service from '../services/service';

class PlayerContainer extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount() {
        this.getSongDetail();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.nowPlaySongId !== this.props.nowPlaySongId) {
            this.getSongDetail();
        }
    }

    getSongDetail() {
        let params = {
            ids: this.props.nowPlaySongId
        }
        this.props.getSongDetail(params);
    }

    render() {
        return (
            <div className='PlayerBox '>
                <div className='nowPlayInfo'>
                    <div className='nowPlayInfoImg'>
                        <img src={this.props.songDetail.ar && this.props.songDetail.ar.name} alt='' />
                    </div>
                    <div className='nowPlayInfoTitle'>
                        <span>{this.props.songDetail.name}</span>
                        <span>{this.props.songDetail.al && this.props.songDetail.al.name}</span>
                    </div>
                </div>
                <div className='nowPlayOption'>
                    <Icon type="play-circle" />
                    <Icon type="menu" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songDetail: state.songDetail,
        nowPlaySongId: state.nowPlaySongId,

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSongDetail: (params, cb) => {
            return Service.getSongDetail(dispatch, params, cb);
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerContainer)