import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { alertReducer } from './alert/alertReducer';
import { userReducer } from './user/userReducer';

const rootReducer = combineReducers({
	alert: alertReducer,
	user: userReducer,
});
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
