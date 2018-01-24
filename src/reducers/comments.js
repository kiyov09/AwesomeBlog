import { Map } from 'immutable';

import { 
    SAVE_COMMENT, SAVE_COMMENT_SUCCESS, SAVE_COMMENT_ERROR
} from '../constants/comments';

const initialState = Map({
    isSavingComment: false,
    errorMsg: ''
})

export default function commentsReducer (state = initialState, action) {
    switch (action.type) {
        case SAVE_COMMENT:
            return state.set('isSavingComment', true);
        case SAVE_COMMENT_SUCCESS:
            return state.set('isSavingComment', false)
                        .set('errorMsg', '');
        case SAVE_COMMENT_ERROR:
            return state.set('isSavingComment', false)
                        .set('errorMsg', action.payload.get('data').get('errorMsg'));
        default:
            return state;    
    }
}
