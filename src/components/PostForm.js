import React from 'react';
import { connect } from 'react-redux';

import { savePost } from '../actions/posts';

import { Field, Control, Input, TextArea, Button } from 'bloomer';

import '../styles/PostForm.css';

class PostForm extends React.Component {
    constructor () {
        super();

        this.state = {
            username: '',
            body: '',
        };

        this._savePost = this._savePost.bind(this);
    }

    _savePost () {
        const { username, body } = this.state;

        if (!username || !body) {
            return;
        }

        const timestamp = new Date().valueOf();
        this.props.savePostAction({ username, body, timestamp });

        this.setState({ username: '', body: '' });
    }

    render() {
        const { isSavingPost } = this.props;

        let buttonClass = '';
        if (this.state.username && this.state.body) {
            buttonClass += 'is-info';
        }

        const buttonStyle = { opacity: isSavingPost ? '0' : '1' };

        return (
            <div className="post-form">
                {
                    isSavingPost &&
                    <div className="post-form__spinner-overlay">
                        <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i>
                    </div>
                }
                <h2 className="subtitle is-size-6 has-text-left">Tell us what you're thinking...</h2>
                <Field>
                    <Control>
                        <Input type="text" placeholder="Username" 
                            value={ this.state.username }
                            onChange={ e => this.setState({ username: e.target.value }) }/>
                    </Control>
                </Field>
                <Field>
                    <Control className="control">
                        <TextArea type="text"  placeholder="Text Here..."
                            value={ this.state.body }
                            onChange={ e => this.setState({ body: e.target.value }) }/>
                    </Control>
                </Field>
                {
                    <Field className="is-grouped is-grouped-right">
                        <Control>
                            <Button className={ buttonClass } style={ buttonStyle }
                                onClick={ this._savePost }> 
                                Save
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
        savePostAction: (data) => {
            dispatch(savePost(data));
        }
    };
}

export default connect(null, mapDispatchToProps)(PostForm);
