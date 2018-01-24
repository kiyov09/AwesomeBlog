import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'bloomer';
import InfiniteScroll from 'react-infinite-scroller';

import '../styles/PostsList.css';

import { fetchPosts } from '../actions/posts';
import PostsListItem from '../components/PostsListItem';
import PostForm from '../components/PostForm';

class PostsList extends Component {

    constructor() {
        super();

        this._loadMorePost = this._loadMorePost.bind(this);
    }

    componentDidMount () {
        this.props.loadPosts(1);
    }

    _loadMorePost (page) {
        this.props.loadPosts(page);
    }

    render() {
        const { isFetching, isSavingPost, errorMsg, posts, page } = this.props;

        return (
            <Container className="posts-list">
            {
                !isFetching && errorMsg &&
                <span className="has-text-danger">{ errorMsg }</span>
            }
            {
                <div>
                    <PostForm isSavingPost={ isSavingPost }/>
                    <InfiniteScroll
                        pageStart={ 1 }
                        initialLoad={ false }
                        threshold={ 1 }
                        loadMore={ this._loadMorePost }
                        hasMore={ !isFetching && posts.size >= page * 5 }>
                        <ul className="posts-list__list">
                        {
                            posts.map( 
                                post => <li key={ post.get('id') }> <PostsListItem post={ post } /> </li>
                            )
                        }
                    </ul>
                    </InfiniteScroll>
                </div>
            }
            {
                isFetching && 
                <div className="posts-list__loading">
                    <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
                </div>
            }
            </Container>
      );
  }
}

const mapStateToProps = (state) => {
    const postsReducer = state.get('postsReducer');
    return {
        isFetching: postsReducer.get('isFetching'),
        isSavingPost: postsReducer.get('isSavingPost'),
        posts: postsReducer.get('posts'),
        errorMsg: postsReducer.get('errorMsg'),
        page: postsReducer.get('page'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPosts: (page) => {
            dispatch(fetchPosts(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
