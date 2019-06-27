import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

import * as Sentry from '@sentry/browser';

Sentry.init({
    dsn: "http://c7140086be4345d28ef1f95858e9258c@127.0.0.1:9000/5",
    release: "001"
});

class CommentApp extends Component {
    componentDidCatch(error, errorInfo) {
        Sentry.withScope(scope => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
        });
    }
    render() {
        return (
            <div className='wrapper'>
                <CommentInput />
                <CommentList />
                <button onClick={() => { this.abc() }}>测试</button>
            </div>
        )
    }
}

export default CommentApp