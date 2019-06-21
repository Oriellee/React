import React, { Component } from 'react';
import { Icon, Drawer } from 'antd';

class songListBox extends Component {

    render() {
        const playOperateDrawerTitle =
            <div className='playOperateDrawerTitle'>
                <img src={this.props.checkedSong.al && this.props.checkedSong.al.picUrl} alt='' />
                <div>
                    <span>歌曲 : {this.props.checkedSong.name}</span>
                    <span>{this.props.checkedSong.ar && this.props.checkedSong.ar.map((item, index) => { return item.name + " " })}</span>
                </div>
            </div>
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
                <Drawer
                    title={playOperateDrawerTitle}
                    placement='bottom'
                    closable={false}
                    onClose={() => this.changeSongPlayListStatus(false)}
                    visible={this.state.isSongPlayListShow}
                    height={500}
                    maskClosable={true}
                >
                    <div className='songPlayListDrawer'>
                        {
                            this.props.songPlayList.map((item, index) =>
                                <p key={index} >
                                    <span className={(item.id === this.props.nowPlaySongId) && "nowPlaySong"}>{item.name} - {item.ar.map((arItem, arIndex) => { return arItem.name + " " })}</span>
                                    <Icon type="close" onClick={() => this.delSongPlayRow(item)} />
                                </p>
                            )
                        }
                    </div>
                    <div className='songPlayListColseDrawer' onClick={() => this.changeSongPlayListStatus(false)}>关闭</div>
                </Drawer>
            </div>
        )
    }
}
export default songListBox;