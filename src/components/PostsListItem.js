import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'bloomer';

import '../styles/PostListItem.css';

export default class PostsListItem extends React.Component {
    render() {
        const { post } = this.props;
        return (
            <Box className="post-item">
                <Link to={ `/post/${ post.get('id') }` }>
                    <div className="post-item__header">
                        <span className="has-text-info is-size-7 post-item__username">
                            @{ post.get('user') } { post.get('id') }
                        </span>
                        <span className="is-size-7 post-item__comments">
                            { post.get('comments').size }
                            <i className="fa fa-comment-o"></i>
                        </span>
                    </div>
                    <p className="post-item__text">
                        { post.get('body') }
                    </p>
                </Link>
            </Box>
        );
    }
}
