import { createStore,  applyMiddleware } from 'redux'; import thunk from 'redux-thunk';

import postsReducer from './reducers/posts';
import commentsReducer from './reducers/comments';

import { combineReducers } from 'redux-immutable';

const reducer = combineReducers({
    postsReducer,
    commentsReducer
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;
