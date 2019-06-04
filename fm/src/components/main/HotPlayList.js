
import React, { Component } from 'react';

export default class extends Component {
    render() {
        return (
            <div className='hotPlayList'>
                <div className='inner'>
                    {
                        this.props.list.map((item, index) =>
                            <div key={index} className={'hotPlayRow hotPlayRowColor' + (index+1)}>
                                <div>
                                    <p>{item.name}</p>
                                    <div>
                                        <span>播放量</span>
                                        <span>{item.usedCount}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}