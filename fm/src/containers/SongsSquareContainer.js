import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from 'antd';
import '../assets/styles/main.scss';
import Service from '../services/service';
import BackPrevious from '../components/backPrevious';
import ListRow from '../components/ListRow';

class SongsSquareContainer extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    componentDidMount() {
        this.getSongSquare();
    }

    // 获取歌曲详情.
    getSongSquare() {
        let params = {
            cat: this.props.match.params ? this.props.match.params.type : ""
        }
        this.props.getSongSquare(params);
    }

    render() {
        let songSquare = this.props.songSquare;
        return (
            <div className='songSquareBox '>
                <div className='backBox'>
                    <BackPrevious url='/home' />
                </div>
                <div className='songSquareContent'>
                    {songSquare.map((item, index) =>
                        <ListRow key={index} goto='/songListDetail/' name="name" url={this.props.match.params.type === "2" ? "picUrl" : "coverImgUrl"} item={item} index={index} {...this.props} />)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        songSquare: state.songSquare,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSongSquare: (params, cb) => {
            return Service.getSongSquare(dispatch, params, cb);
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongsSquareContainer)