import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { alertReducer } from './alert/alertReducer';
import { userReducer } from './user/userReducer';
import { postsReducer } from './posts/postsReducer';

const rootReducer = combineReducers({
	posts: postsReducer,
	user: userReducer,
	alert: alertReducer,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
