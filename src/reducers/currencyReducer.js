import { SWITCH_CURRENCY } from "../actions/types";
const initialState = {
	currency: 0,
};
export default function currencyReducer(state = initialState, action) {
	switch (action.type) {
		case SWITCH_CURRENCY:
			return {
				currency: action.payload ?? state.currency,
			};
		default:
			return state;
	}
}
