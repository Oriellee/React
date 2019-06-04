
import React, { Component } from 'react';
import { Icon } from 'antd';

export default class extends Component {
    render() {
        return (
            <div className='typeList'>
                <div className='inner'>
                    {
                        this.props.list.map((item, index) =>
                            <div key={index} className='musicRow'>
                                <div>
                                    <img alt='' src={item[this.props.url]} />
                                    <Icon type="play-circle" width={'1.25em'} height={'1.25em'} />
                                </div>
                                <p>{item[this.props.name]}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
