import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Carousel, WingBlank, Flex } from 'antd-mobile';
import ContentTitle from '../components/main/ContentTitle';
import HotPlayList from '../components/main/HotPlayList';
import CatList from '../components/main/CatList';
import '../assets/styles/main.scss';
import Service from '../services/service';

class MainContainer extends Component {
    constructor() {
        super()
        this.state = {
            imgHeight: "150px",
            checkedTab: 2
        }
    }
    componentDidMount() {
        this.getBannerList();
        this.getHotPlayList();
        this.getHighQualityPlayList();
    }

    // 切换顶端tab页.
    changeTab(tab) {
        this.setState({
            checkedTab: tab
        })
    }

    // 获取banner列表.
    getBannerList() {
        let params = {
            type: 1 //安卓端.
        }
        this.props.getBannerList(params);
    }

    // 获取歌单分类.
    getHotPlayList() {
        this.props.getHotPlayList({});
    }

    //获取精品歌单.
    getHighQualityPlayList() {
        this.props.getHighQualityPlayList({});
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
                    <div className='searchBox'>
                        <Icon type="search" />
                        <span>搜索</span>
                    </div>
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
                                    <a
                                        key={item.bannerId}
                                        href={item.url}
                                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                    >
                                        <img
                                            src={item.pic}
                                            alt="查看"
                                            style={{ width: '100%', verticalAlign: 'top', height: "100%" }}
                                        />
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
                        <ContentTitle title="精品歌单" url='' />
                        <CatList list={this.props.highQualityPlayList} />
                    </div>
                    <div className='listRow'>
                        <ContentTitle title="热门歌单" url='' />
                        <CatList list={this.props.typeList} />
                    </div>
                    <div className='listRow'>
                        <ContentTitle title="新碟上架" url='' />
                        <CatList list={this.props.typeList} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        typeList: [1, 2, 3, 4, 5, 6, 7],
        bannerList: state.bannerList,
        hotPlayList: state.hotPlayList,
        highQualityPlayList: state.highQualityPlayList,
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer)