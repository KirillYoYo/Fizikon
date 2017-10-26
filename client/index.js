import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM  from 'react-dom';
import AppRouter from './routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import rootSaga from './sagas/sagas'
import configureStore from './store/configureStore';
const store = configureStore();
store.runSaga(rootSaga);

const render = function (Component) {
	return ReactDOM.render(
		<AppContainer>
			<Component store = {store} />
		</AppContainer>,
		document.getElementById('app')
	);
}


render(AppRouter);
if (module.hot) {
	module.hot.accept();
	render(AppRouter);
}