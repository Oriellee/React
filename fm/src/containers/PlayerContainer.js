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

    }

    render() {
        return (
            <div className='PlayerBox '>
                {/* <div className='nowPlayInfo'>
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
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // songDetail: state.songDetail

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerContainer)