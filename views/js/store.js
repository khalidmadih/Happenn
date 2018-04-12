import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

const store = createStore(
	allReducers, 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	compose(applyMiddleware(thunk))
);


export default store;