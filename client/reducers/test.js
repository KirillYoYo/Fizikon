
import {
	TEST,
	TEST_SUCCESS,
} from '../actions/test';

const initialState = {
	banks: []
};

export default function test(state = initialState, action = {}) {
	switch (action.type) {
		case TEST_SUCCESS:
			return {
				...state,
				test: 'TEST TEST'
			};

		default:
			return state;
	}
}
