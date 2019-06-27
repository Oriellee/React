import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CommentInput from '../components/CommentInput'
import {addComments} from "../reduers/comments";

class CommentInputContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        onSubmit: PropTypes.func
    };

    constructor() {
        super();
        this.state = {username: ''}
    }

    componentWillMount() {
        this._loadUsername()
    }

    _loadUsername() {
        const username = localStorage.getItem('username');
        if (username) {
            this.setState({username})
        }
    }

    _saveUsername(username) {
        // 看看 render 方法的 onUserNameInputBlur
        // 这个方法会在用户名输入框 blur 的时候的被调用，保存用户名
        localStorage.setItem('username', username)
    }

    handleSubmitComment(comment) {
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名!');
        if (!comment.content) return alert('请输入评论内容!');
        const {comments} = this.props;
        const newComments = [...comments, comment];
        localStorage.setItem('comments', JSON.stringify(newComments));
        if (this.props.onSubmit) {
            this.props.onSubmit(comment)
        }
    }

    render() {
        return (
            <CommentInput username={this.state.username}
                          onSubmit={this.handleSubmitComment.bind(this)}
                          onUserNameInputBlur={this._saveUsername.bind(this)}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (comment) => {
            dispatch(addComments(comment))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentInputContainer)
