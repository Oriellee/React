
import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from "react-router-dom";


export default class extends Component {
    render() {
        let item = this.props.item;
        let index = this.props.index;
        return (
            <Link to={this.props.goto + item.id} key={index} className='musicRow' >
                <div>
                    <img alt='' src={item[this.props.url]} />
                    <Icon type="play-circle" width={'1.25em'} height={'1.25em'} />
                </div>
                <p>{item[this.props.name]}</p>
            </Link>
        )
    }
}
