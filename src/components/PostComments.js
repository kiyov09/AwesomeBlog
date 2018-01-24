import React from 'react';
import { connect } from 'react-redux';

import { Tile } from 'bloomer';

import CommentForm from '../components/CommentForm';
import PostComment from './PostComment';

import '../styles/PostComments.css'

class PostComments extends React.Component {
    render() {
        let { comments, isSavingComment } = this.props;

        comments = comments.sort(
            ( comment1, comment2 ) => ( Number(comment1.get('timestamp')) - Number(comment2.get('timestamp')) ) * -1
        );

        return (
            <Tile>
                {
                    <div className="post-comments">
                        {
                            isSavingComment && 
                            <div className="post-comments__spinner-container has-text-centered">
                                <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                            </div>
                        }

                        {
                            <div>
                                <CommentForm postId={ this.props.postId } isSaving={ isSavingComment } />

                                {
                                    !comments.size && 
                                    <h3 className="post-comments__heading has-size-5">
                                        No Comments.
                                    </h3>
                                }

                                {
                                    !!comments.size &&
                                    <ul className="post-comments__list">
                                        { 
                                            comments.map( 
                                                comment => <PostComment key={ comment.get('id') } comment={ comment } />
                                            ) 
                                        }
                                    </ul>
                                }
                            </div>
                        }

                    </div>
                }
            </Tile>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSavingComment: state.get('commentsReducer').get('isSavingComment')
    }
}

export default connect(mapStateToProps)(PostComments);
