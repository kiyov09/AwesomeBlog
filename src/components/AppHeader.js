import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from 'bloomer';

import { fetchPosts } from '../actions/posts';

import '../styles/AppHeader.css';

class AppHeader extends React.Component {
    render() {
        const { loadPosts } = this.props;

        let hideRefreshButton = /post\/\d/.test(window.location.pathname);
        hideRefreshButton = true;

        return (
            <header className="app-header is-flex">
                <Link to="/" className="app-header__link">Awesome Blog</Link>
                {
                    !hideRefreshButton &&
                    <Button className="fa fa-refresh is-dark"
                        onClick={ loadPosts }>
                    </Button>
                }
            </header>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPosts: () => {
            dispatch(fetchPosts())
        }
    }
}

export default connect(null, mapDispatchToProps)(AppHeader);
