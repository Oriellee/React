
import React, { Component } from 'react';

export default class extends Component {
    render() {
        return (
            <div className='contentTitle'>
                <div>{this.props.title}</div>
                <span>更多</span>
            </div>
        )
    }
}
