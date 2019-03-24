//action types
const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENTS = 'ADD_COMMENTS';
const DELETE_COMMENT = 'DELETE_COMMENT';

// reducer
export default function (state, action) {
    if (!state) {
        state = {comments: []}
    }
    switch (action.type) {
        case INIT_COMMENTS:
            return {comments: action.comments};
        case ADD_COMMENTS:
            return {
                comments: [...state.comments, action.comment]
            };
        case  DELETE_COMMENT:
            return {
                comments: [
                    ...state.comments.slice(0, action.commentIndex),
                    ...state.comments.slice(action.commentIndex + 1,)
                ]
            };
        default:
            return state
    }

}
//action creators
export const initComments = (comments) => {
    return {type: INIT_COMMENTS, comments}
};
export const addComments = (comment) => {
    return {type: ADD_COMMENTS, comment}
};
export const deleteComments = (commentIndex) => {
    return {type: DELETE_COMMENT, commentIndex}
};
