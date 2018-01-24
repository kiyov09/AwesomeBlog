import { List, Map } from 'immutable';

import { 
    // Collection
    FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR,
    // Item
    FETCH_POST, FETCH_POST_SUCCESS, FETCH_POST_ERROR,
    // Save
    SAVE_POST, SAVE_POST_SUCCESS, SAVE_POST_ERROR 

} from '../constants/posts';

import { SAVE_COMMENT_SUCCESS } from '../constants/comments';

const initialState = Map({
    posts: List(),
    page: 1,
    isFetching: false,
    isSavingPost: false,
    errorMsg: ''
})

export default function postsReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_POST:
        case FETCH_POSTS:
            return state.set('isFetching', true);

        case FETCH_POST_SUCCESS:
            let existingPosts = state.get('posts');
            const loadedPost = action.payload.get('data');

            const postAlreadyInState = existingPosts.find(
                (post) => post.get('id') === loadedPost.get('id')
            );

            if (!postAlreadyInState) {
                existingPosts = existingPosts.push(loadedPost);
            }

            return state.set('isFetching', false)
                        .set('errorMsg', '')
                        .set('page', action.payload.get('page'))
                        .set('posts', existingPosts);

        case FETCH_POSTS_SUCCESS:
            let posts = state.get('posts');

            if (action.payload.get('page') === 1) {
               posts = action.payload.get('data');
            } else {
               posts = posts.concat(action.payload.get('data'));
            }

            return state.set('isFetching', false)
                        .set('errorMsg', '')
                        .set('page', action.payload.get('page'))
                        .set('posts', posts);

        case FETCH_POST_ERROR:
        case FETCH_POSTS_ERROR:
            return state.set('isFetching', false)
                        .set('errorMsg', action.payload.get('data').get('errorMsg'))

        case SAVE_COMMENT_SUCCESS:
            const newComment = action.payload.get('data').get('newComment');
            const postId = newComment.get('postId');

            let existingPosts1 = state.get('posts');
            existingPosts1 = existingPosts1.update(
                existingPosts1.findIndex(
                    post => post.get('id') === postId
                ),
                (post) => { 
                    let postComments = post.get('comments') || List();
                    postComments = postComments.push(newComment) 

                    return post.set('comments', postComments);
                }
            );

            return state.set('posts', existingPosts1);

        case SAVE_POST:
            return state.set('isSavingPost', true);

        case SAVE_POST_SUCCESS:
            let existingPosts2 = state.get('posts');
            existingPosts2 = existingPosts2.splice(
                0, 0, action.payload.get('data').get('newPost')
            );

            return state.set('isSavingPost', false)
                        .set('errorMsg', '')
                        .set('posts', existingPosts2)

        case SAVE_POST_ERROR:
            return state.set('isSavingPost', false)
                        .set('errorMsg', action.payload.get('data').get('errorMsg'));
        default:
            return state;    
    }
}
