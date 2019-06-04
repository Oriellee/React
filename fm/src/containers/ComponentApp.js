import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Carousel, WingBlank, Flex } from 'antd-mobile';
import ContentTitle from '../components/main/ContentTitle';
import HotPlayList from '../components/main/HotPlayList';
import CatList from '../components/main/CatList';
import HomeContainer from './HomeContainer';
import '../assets/styles/main.scss';
import Service from '../services/service';

class ComponentApp extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount() {

    }




    render() {
        return (
            <div className='componentApp'>
                <HomeContainer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComponentApp)