import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon,Input } from 'antd';
import '../assets/styles/main.scss';
import Service from '../services/service';
import BackPrevious from '../components/backPrevious';
import SongListBox from './SongListBox';

class SearchListContainer extends Component {
    constructor() {
        super()
        this.state = {
            keywords: ""
        }
    }

    componentWillUnmount(){
        // 离开页面清空搜索列表.
        this.props.getSearchList(); 
    }

    // 获取搜索列表.
    getSearchList=()=> {
        let params = {
            keywords: this.state.keywords
        }
        this.props.getSearchList(params);
    }

    
    changeKeywords=(e)=>{
        this.setState({
            keywords:e.target.value
        })
    }
    render() {
        let searchList = this.props.searchList;
        return (
            <div className='searchListBox '>
                <div className='searchInfo'>
                    <div className='backBox'>
                        <BackPrevious url='/home' />
                    </div>
                    <Input
                        value={this.state.keywords}
                        onChange={this.changeKeywords}
                        onPressEnter={this.getSearchList}
                        placeholder="搜索音乐"
                        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                <div className='searchContent'>
                    <SongListBox {...this.props} songList={searchList.songs ? searchList.songs : []} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchList: state.searchList,
        songPlayListIds: state.songPlayListIds,
        all: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSearchList: (params, cb) => {
            return Service.getSearchList(dispatch, params, cb);
        },
        changeSongPlayListIds: (params, cb) => {
            return Service.changeSongPlayListIds(dispatch, params, cb);
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchListContainer)