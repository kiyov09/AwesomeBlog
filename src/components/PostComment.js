import React from 'react';

import { Box, Media } from 'bloomer';

export default class PostComment extends React.Component {
    render() {
        const { comment } = this.props;
        const dateString = new Date(Number(comment.get('timestamp'))).toDateString() ;

        const liStyle = { marginBottom: '1em' };
        const flexContainerStyle = { alignItems: 'baseline' };
        const strongStyle = { marginRight: '0.2em' };

        return (
            <li style={ liStyle }>
                <Box>
                    <Media>
                        <div className="media-content">
                            <div className="content">
                                <div className="is-flex" style={ flexContainerStyle }>
                                    <strong className="has-text-info" style={ strongStyle }>
                                        @{ comment.get('username') }
                                    </strong>
                                    <span className="is-size-7">on { dateString }</span>
                                </div>
                                <p>
                                    { comment.get('comment') }
                                </p>
                            </div>
                        </div>
                    </Media>
                </Box>
            </li>
        );
    }
}
