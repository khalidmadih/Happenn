import React from 'react';
import ReactDOM  from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import store from './store';
import App from './components/app';
import EventList from './components/event-list';
import Home from './components/home';
import Login from './components/login';
import PostEvent from './components/post-event';
import Profile from './components/profile';
import Registration from './components/registration';

// import '../scss/main.scss';
require("!style-loader!css-loader!sass-loader!../scss/main.scss");


// How do I get rid of pound sign?
// Play with browserHistory
const routes = (
  <Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={Login} />
			<Route path='/app' component={App}>
				<Route path="/app/home" component={Home} />
				<Route path="/app/events" component={EventList} />
				<Route path="/app/postevents" component={PostEvent} />		
				<Route path="/app/profile" component={Profile} />		
			</Route>		
			<Route path='/login' component={Login} />
			<Route path='/register' component={Registration} />	
		</Router>
	</Provider>
)

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(
		routes, document.getElementById('app')
	)
); 