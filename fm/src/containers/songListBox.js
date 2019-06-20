import React, { Component } from 'react';
import { Icon } from 'antd';

class songListBox extends Component {
    
    render() {
        return (
            <div className='songListBox'>
                {this.props.songListDetail.tracks && this.props.songListDetail.tracks.map((item, index) =>
                    <div key={index} className='songListRow'>
                        <span>{index + 1}</span>
                        <div>
                            <span>{item.name}</span>
                            <span>{item.ar.map((arItem, arIndex) => { return arItem.name + " " })} - {item.al.name}</span>
                        </div>
                        <div>
                            <Icon type="play-square" />
                            <Icon type="more" />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
export default songListBox;