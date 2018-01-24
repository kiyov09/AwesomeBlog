import * as axios from 'axios';

export const getPosts = (page=1) => {
    return axios.get(`http://linux-0pfg:3001/posts?_page=${ page }&_limit=5
                                                  &_sort=timestamp&_order=desc
                                                  &_embed=comments`)
                .then( res => res.data );
}

export const getPostById = (postId) => {
    return axios.get(`http://linux-0pfg:3001/posts/${ postId }?_embed=comments`)
                .then( res => res.data );
}

export const saveNewPost = (data) => {
    return axios.post(`http://linux-0pfg:3001/posts`, data)
                .then( res => res.data );
}

export const saveNewComment = (data) => {
    return axios.post(`http://linux-0pfg:3001/comments`, data)
                .then( res => res.data );
}
