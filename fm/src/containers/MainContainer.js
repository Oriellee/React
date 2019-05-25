import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Carousel, WingBlank, Flex } from 'antd-mobile';
import ContentTitle from '../components/main/ContentTitle';
import CatTypeList from '../components/main/CatTypeList';
import CatList from '../components/main/CatList';
import '../assets/styles/main.scss';
import Service from '../services/service';

class MainContainer extends Component {
    constructor() {
        super()
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: "150px",
            checkedTab: 2
        }
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
        let params = {
            type: 1
        }
        this.props.getBannerList(params, () => {
            console.log(this.props.bannerList, "-------");
        });
    }
    changeTab(tab) {
        this.setState({
            checkedTab: tab
        })
    }
    render() {
        console.log(this.props.bannerList, "this.props.bannerList")
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
                                        href="http://www.alipay.com"
                                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                    >
                                        <img
                                            src={item.pic}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top', height: "100%" }}
                                        />
                                    </a>
                                ))}
                            </Carousel>
                        </WingBlank>
                    </div>
                    <div className='listRow'>
                        <ContentTitle title="歌单分类" url='' />
                        <CatTypeList list={this.props.typeList} />
                    </div>
                    <div className='listRow'>
                        <ContentTitle title="精品歌单" url='' />
                        <CatList list={this.props.typeList} />
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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBannerList: (params, cb) => {
            return Service.getBannerList(dispatch, params, cb);
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer)