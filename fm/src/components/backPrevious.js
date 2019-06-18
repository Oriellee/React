
import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from "react-router-dom";


export default class extends Component {
    render() {
        return (
            <Link to={this.props.url} className='backPreviousBox'>
                <Icon type="arrow-left" />
            </Link>
        )
    }
}
