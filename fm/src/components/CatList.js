
import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from "react-router-dom";


export default class extends Component {
    render() {
        // to={{ pathname: 'songListDetail', query: { id: item.id } }}
        return (
            <div className='typeList'>
                <div className='inner'>
                    {
                        this.props.list.map((item, index) =>
                            <Link to={this.props.goto + item.id} key={index} className='musicRow' >
                                <div>
                                    <img alt='' src={item[this.props.url]} />
                                    <Icon type="play-circle" width={'1.25em'} height={'1.25em'} />
                                </div>
                                <p>{item[this.props.name]}</p>
                            </Link>
                        )
                    }
                </div>
            </div>
        )
    }
}
