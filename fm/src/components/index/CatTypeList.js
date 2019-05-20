
import React, { Component } from 'react';
import { Icon } from 'antd';

export default class extends Component {
    render() {
        return (
            <div className='typeList'>
                <div className='inner'>
                    {
                        this.props.list.map((item, index) =>
                            <div key={index} className='catTypeRow'>
                                <div>
                                    <p>流行歌曲</p>
                                    <span></span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}