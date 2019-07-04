import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Icon } from 'antd';
import { Carousel, WingBlank, Flex } from 'antd-mobile';
import ContentTitle from '../components/ContentTitle';
import HotPlayList from '../components/HotPlayList';
import CatList from '../components/CatList';
import '../assets/styles/main.scss';
import Service from '../services/service';

class HomeContainer extends Component {
    constructor() {
        super()
        this.state = {
            imgHeight: "130px",
            checkedTab: 2
        }
    }
    componentDidMount() {
        this.props.getBannerList({ type: 1 });
        this.props.getHotPlayList({});
        this.props.getHighQualityPlayList({});
        this.props.getPersonalized({});
        this.props.getTopAlbum({});
    }

    // 切换顶端tab页.
    changeTab(tab) {
        this.setState({
            checkedTab: tab
        })
    }

    render() {
        return (
            <div className='pageBox '>
                <div className='topBox'>
                    <Flex className='titleBox' justify="between">
                        <Icon type="menu" />
                        <div>
                            <span className={this.state.checkedTab === 1 ? "addTitleCss" : ""} onClick={() => this.changeTab(1)}>我的</span>
                            <span className={this.state.checkedTab === 2 ? "addTitleCss" : ""} onClick={() => this.changeTab(2)}>音乐馆</span>
                            <span className={this.state.checkedTab === 3 ? "addTitleCss" : ""} onClick={() => this.changeTab(3)}>发现</span>
                        </div>
                        <Icon type="plus" />
                    </Flex>
                    <Link to='/search' className='searchBox' >
                        <Icon type="search" />
                        <span>搜索</span>
                    </Link>
                </div>
                <div className='content'>
                    <div className="carousel">
                        <WingBlank>
                            <Carousel
                                autoplay
                                infinite
                                beforeChange={(from, to) => { }}
                                afterChange={index => { }}
                            >
                                {this.props.bannerList.map(item => (
                                    <a key={item.bannerId} href={item.url}>
                                        <img src={item.pic} alt="查看" />
                                    </a>
                                ))}
                            </Carousel>
                        </WingBlank>
                    </div>
                    <div className='listRow'>
                        <ContentTitle title="歌单分类" url='' />
                        <HotPlayList list={this.props.hotPlayList} />
                    </div>
                    <div className='listRow'>
                        <ContentTitle title="精品歌单" url='/songsSquare/1' />
                        <CatList goto="/songListDetail/" list={this.props.highQualityPlayList} name="name" url="coverImgUrl" />
                    </div>
                    <div className='listRow'>
                        <ContentTitle title="推荐歌单" url='/songsSquare/2' />
                        <CatList goto="/songListDetail/" list={this.props.personalizedList} name="name" url="picUrl" />
                    </div>
                    <div className='listRow'>
                        <ContentTitle title="新碟上架" url='' />
                        <CatList goto="/albumListDetail/" list={this.props.topAlbum} name="name" url="picUrl" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bannerList: state.bannerList,
        hotPlayList: state.hotPlayList,
        highQualityPlayList: state.highQualityPlayList,
        personalizedList: state.personalizedList,
        topAlbum: state.topAlbum,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBannerList: (params, cb) => {
            return Service.getBannerList(dispatch, params, cb);
        },
        getHotPlayList: (params, cb) => {
            return Service.getHotPlayList(dispatch, params, cb);
        },
        getHighQualityPlayList: (params, cb) => {
            return Service.getHighQualityPlayList(dispatch, params, cb);
        },
        getPersonalized: (params, cb) => {
            return Service.getPersonalized(dispatch, params, cb);
        },
        getTopAlbum: (params, cb) => {
            return Service.getTopAlbum(dispatch, params, cb);
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer)