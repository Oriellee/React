
import React, { Component } from 'react';

class ContentTitle extends Component {
    render() {
        return (
            <div className='contentTitle'>
                <div>{this.props.title}</div>
                <span>更多</span>
            </div>
        )
    }
}
export default ContentTitle;
