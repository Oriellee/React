import React, { Component } from 'react';

class ContentTitle extends Component {
    render() {
        return (
            <div>
                <title>{this.props.title}</title>
                <span>更多</span>
            </div>
        )
    }
}
export default ContentTitle;