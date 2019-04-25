import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Carousel, WingBlank } from 'antd-mobile';
import ContentTitle from '../components/index/ContentTitle';
import TypeList from '../components/index/TypeList';
import '../assets/styles/index.scss';

class IndexContainer extends Component {
    constructor() {
        super()
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
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
    render() {
        return (
            <div className='box'>
                <div className='title'>
                    <Icon type="menu-fold" />
                    <title>音乐馆</title>
                    <Icon type="search" />
                </div>
                <div className='content'>
                    <div className="carousel">
                        <WingBlank>
                            <Carousel
                                autoplay
                                infinite
                                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                afterChange={index => console.log('slide to', index)}
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
                                            style={{ width: '100%', verticalAlign: 'top' }}
                                            onLoad={() => {
                                                // fire window resize event to change height
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({ imgHeight: 'auto' });
                                            }}
                                        />
                                    </a>
                                ))}
                            </Carousel>
                        </WingBlank>

                    </div>
                    <div className='listRow'>
                        <ContentTitle title="歌单分类" url='' />
                        <TypeList data={this.props.typeList} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        typeList: []
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