import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './views/app';
import Home from './views/home/index';
import NotFound from './components/404/index';
import { Provider } from 'react-redux';
import DevTools from '../ReduxDevTools';




export default (props) => (
	<Provider store={props.store}>
		<div className='provider-inner'>
			<BrowserRouter>
				<Switch>
					<Route path='/' component={App} />
				</Switch>
			</BrowserRouter>
			<DevTools/>
		</div>
	</Provider>
);
