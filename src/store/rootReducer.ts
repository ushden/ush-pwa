import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { alertReducer } from './alert/alertReducer';
import { userReducer } from './user/userReducer';
import { postsReducer } from './posts/postsReducer';
import { commentsReducer } from './comments/commentsReducer';
import { usersReducer } from './users/usersReducer';

const rootReducer = combineReducers({
	alert: alertReducer,
	user: userReducer,
	posts: postsReducer,
	comments: commentsReducer,
	users: usersReducer,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
