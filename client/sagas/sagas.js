// noinspection JSAnnotator
import { put, takeEvery , call, take, all, takeLatest} from 'redux-saga/effects'

function getTestApi () {
	//return Promise.resolve(	api.get('/some') );
	return Promise.resolve(	() => {'stringTest'});
}

export function* fetchTest() {
	try {
		const test = yield call(getTestApi);
		yield put({type: 'TEST_SUCCESS', payload: test});
	} catch(error) {
		yield put({type: 'TEST_FAILED', error});
	}
}


function* watchTest() {
	yield takeEvery("TEST", fetchTest);
}


export default function* rootSaga() {
	yield all([
		watchTest(),
	])
}