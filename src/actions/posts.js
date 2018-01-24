import { fromJS } from 'immutable';

import { 
    // Collection
    FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR,
    // Item
    FETCH_POST, FETCH_POST_SUCCESS, FETCH_POST_ERROR,
    //Save
    SAVE_POST, SAVE_POST_SUCCESS, SAVE_POST_ERROR
} from '../constants/posts';

import { getPosts, getPostById, saveNewPost } from '../api'; 

// Collection
export const loadPosts = () => {
    return {
        type: FETCH_POSTS,
    };
}

export const postsLoaded = (data, page) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: fromJS({
            page,
            data
        })
    };
}

export const postsLoadError = (data) => {
    return {
        type: FETCH_POSTS_ERROR,
        payload: fromJS({
            data
        })
    };
}

export const fetchPosts = (page) => {
    return dispatch => {
        // Dispatch to show the spinner
        dispatch(loadPosts());

        // Wait of a second
        setTimeout(async () => {
            try {
                const posts = await getPosts(page);
                dispatch(postsLoaded(posts, page));
            } catch (e) {
                console.log(e);
                const data = { errorMsg: 'Error loading posts!!!' }
                dispatch(postsLoadError(data));
            }
        }, 1000);
    }
}

// Item
//
export const loadPost = () => {
    return {
        type: FETCH_POST,
    };
}

export const postLoaded = (data) => {
    return {
        type: FETCH_POST_SUCCESS,
        payload: fromJS({
            data
        })
    };
}

export const postLoadError = (data) => {
    return {
        type: FETCH_POST_ERROR,
        payload: fromJS({
            data
        })
    };
}

export const fetchPostById = (postId) => {
    return dispatch => {
        // Dispatch to show the spinner
        dispatch(loadPost());

        // Wait of a second
        setTimeout(async () => {
            try {
                const post = await getPostById(postId);
                dispatch(postLoaded(post));
            } catch (e) {
                const data = { errorMsg: 'Error loading the post info !!!' }
                dispatch(postLoadError(data));
            }
        }, 1000);
    }
}

// Save actions
export const savePostRequest = () => {
    return {
        type: SAVE_POST,
    };
}

export const savePostSuccess = (data) => {
    return {
        type: SAVE_POST_SUCCESS,
        payload: fromJS({
            data
        })
    };
}

export const savePostError = (data) => {
    return {
        type: SAVE_POST_ERROR,
        payload: fromJS({
            data
        })
    };
}

export const savePost = ({ username, body, timestamp }) => {
    return dispatch => {
        // Dispatch to show the spinner
        dispatch(savePostRequest());

        // Wait of a second
        setTimeout(async () => {
            try {
                // await savePostPost(username, comment);
                const data = {
                    newPost: {
                        user: username,
                        body, timestamp,
                        comments: []
                    }
                };

                const response = await saveNewPost(data.newPost);
                data.newPost.id = response.id;

                dispatch(savePostSuccess(data));

            } catch (e) {
                const data = { errorMsg: 'Error saving your post!!!' }
                dispatch(savePostError(data));
            }
        }, 1000);
    }
}
