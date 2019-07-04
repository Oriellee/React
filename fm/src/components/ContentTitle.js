
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class extends Component {
    render() {
        return (
            <div className='contentTitle'>
                <div>{this.props.title}</div>
                <Link to={this.props.url}>更多</Link>
            </div>
        )
    }
}
