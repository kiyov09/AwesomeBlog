import { fromJS } from 'immutable';

import { saveNewComment } from '../api';

import { 
    SAVE_COMMENT, SAVE_COMMENT_SUCCESS, SAVE_COMMENT_ERROR,
} from '../constants/comments';

export const saveCommentRequest = () => {
    return {
        type: SAVE_COMMENT,
    };
}

export const saveCommentSuccess = (data) => {
    return {
        type: SAVE_COMMENT_SUCCESS,
        payload: fromJS({
            data
        })
    };
}

export const saveCommentError = (data) => {
    return {
        type: SAVE_COMMENT_ERROR,
        payload: fromJS({
            data
        })
    };
}

export const saveComment = ({ postId, username, comment, timestamp }) => {
    return dispatch => {
        // Dispatch to show the spinner
        dispatch(saveCommentRequest());

        // Wait of a second
        setTimeout(async () => {
            try {
                // await savePostComment(username, comment);
                const data = {
                    newComment: {
                        username, comment, postId, timestamp
                    }
                };
                const response = await saveNewComment(data.newComment);
                data.newComment.id = response.id;

                dispatch(saveCommentSuccess(data));
            } catch (e) {
                const data = { errorMsg: 'Error saving your comment!!!' }
                dispatch(saveCommentError(data));
            }
        }, 1000);
    }
}
