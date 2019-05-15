import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Input } from 'antd';
import { Carousel, WingBlank, Flex } from 'antd-mobile';
import ContentTitle from '../components/index/ContentTitle';
import TypeList from '../components/index/TypeList';
import '../assets/styles/index.scss';


class IndexContainer extends Component {
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
    }
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
                                {this.state.data.map(val => (
                                    <a
                                        key={val}
                                        href="http://www.alipay.com"
                                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                    >
                                        <img
                                            src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top', height: "100%" }}
                                        // onLoad={() => {
                                        //     // fire window resize event to change height
                                        //     window.dispatchEvent(new Event('resize'));
                                        //     this.setState({ imgHeight: 'auto' });
                                        // }}
                                        />
                                    </a>
                                ))}
                            </Carousel>
                        </WingBlank>
                    </div>
                    <div className='listRow'>
                        <ContentTitle title="歌单分类" url='' />
                        <TypeList list={this.props.typeList} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        typeList: [1, 2, 3, 4, 5, 6, 7]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // initComments: (comments) => {
        //     dispatch(initComments(comments))
        // },
        // onDeleteComment: (commentIndex) => {
        //     dispatch(deleteComments(commentIndex))
        // }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexContainer)