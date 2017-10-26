import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers/index'


export default function configureStore(initialState) {
	const sagaMiddleware = createSagaMiddleware()

	const persistState = require('redux-devtools').persistState;
	const DevTools = require('../../ReduxDevTools').default;

	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(
				sagaMiddleware,
			),
			DevTools.instrument(),
			persistState(
				window.location.href.match(
					/[?&]debug_session=([^&#]+)\b/
				)
			)
		)
	)

	if (process.env.NODE_ENV === 'development') {
		const persistState = require('redux-devtools').persistState;
		const DevTools = require('../../ReduxDevTools').default;

		if (module.hot) {
			module.hot.accept('../reducers', () =>
				store.replaceReducer(require('../reducers/index').default)
			);
		}
	}


	store.runSaga = sagaMiddleware.run
	store.close = () => store.dispatch(END)
	return store
}