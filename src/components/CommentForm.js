import React from 'react';
import { connect } from 'react-redux';

import { saveComment } from '../actions/comments';

import { Field, Control, Input, TextArea, Button } from 'bloomer';

import '../styles/CommentForm.css';

class CommentForm extends React.Component {
    constructor () {
        super();

        this.state = {
            username: '',
            comment: '',
        };

        this._saveComment = this._saveComment.bind(this);
    }

    _saveComment () {
        const { username, comment } = this.state;
        const { postId } = this.props;

        if (!username || !comment) {
            return;
        }

        const timestamp = new Date().valueOf();
        this.props.saveCommentAction({ postId, username, comment, timestamp });

        this.setState({ username: '', comment: '' });
    }

    render() {
        const { isSaving } = this.props;

        let buttonClass = '';
        if (this.state.username && this.state.comment) {
            buttonClass += 'is-info';
        }

        const buttonStyle = { opacity: isSaving ? '0' : '1' };

        return (
            <div className="comment-form">
                {
                    isSaving &&
                    <div className="comment-form__spinner-overlay"></div>
                }
                <h2 className="subtitle is-size-6 has-text-left">Leave a comment</h2>
                <Field>
                    <Control>
                        <Input type="text" placeholder="Username" 
                            value={ this.state.username }
                            onChange={ e => this.setState({ username: e.target.value }) }/>
                    </Control>
                </Field>
                <Field>
                    <Control className="control">
                        <TextArea type="text"  placeholder="Your Comment Here..."
                            value={ this.state.comment }
                            onChange={ e => this.setState({ comment: e.target.value }) }/>
                    </Control>
                </Field>
                {
                    <Field className="is-grouped is-grouped-right">
                        <Control>
                            <Button className={ buttonClass } style={ buttonStyle }
                                onClick={ this._saveComment }> 
                                Comment
                            </Button>
                        </Control>
                    </Field>
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveCommentAction: (data) => {
            dispatch(saveComment(data));
        }
    };
}

export default connect(null, mapDispatchToProps)(CommentForm);
