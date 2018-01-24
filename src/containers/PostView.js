import React from 'react';
import { connect } from 'react-redux';

import { Container, Tile } from 'bloomer';

import { fetchPostById } from '../actions/posts';
import PostComments from '../components/PostComments';

import '../styles/PostView.css';

class PostView extends React.Component {

    componentDidMount () {
        this.props.loadPost(this.props.match.params.id);
    }

    render() {
        const { isFetching, errorMsg, post } = this.props;
        return (
            <Container className="post-view">
                {
                    isFetching && 
                    <div className="has-text-centered">
                        <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
                    </div>
                }
                {
                    !isFetching && errorMsg &&
                    <span className="has-text-danger">{ errorMsg }</span>
                }
                {
                    !isFetching && !errorMsg && post &&
                    <Tile className="is-vertical is-parent post-view__content">
                        <span className="is-size-7 has-text-left post-view__username">
                            Posted by 
                            <span className="has-text-info">{ ' @' + post.get('user') + ' ' }</span>
                            on { new Date( Number( post.get('timestamp') ) ).toDateString() }
                        </span>
                        <p className="post-view__text">
                            { post.get('body') }
                        </p>
                        <PostComments postId={ post.get('id') } comments={ post.get('comments') } />
                    </Tile>
                }
            </Container>
        );
    }
}

const mapStateToProps = (state, props) => {
    const postsReducer = state.get('postsReducer');
    return {
        isFetching: postsReducer.get('isFetching'),
        post: postsReducer.get('posts').find(
            (post) => Number( props.match.params.id ) === post.get('id')
        ),
        errorMsg: postsReducer.get('errorMsg'),
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadPost: () => {
            dispatch(fetchPostById(props.match.params.id));
        }
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
