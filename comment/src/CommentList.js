import React, {Component} from 'react'
import Comment from './Comment'

class CommentList extends Component {
    static comments = [];

    render() {
        return (
            <div>{this.props.comments.map((comment, i) =>
                <Comment key={i} comment={comment}/>
            )}</div>
        )
    }
}

export default CommentList