import { SWITCH_CURRENCY } from "../actions/types";
const initialState = {
	currency: 0,
	symbol: "$",
};
export default function currencyReducer(state = initialState, action) {
	switch (action.type) {
		case SWITCH_CURRENCY:
			return {
				currency: action.payload.position ?? state.currency,
				symbol: action.payload.symbol ?? state.symbol,
			};
		default:
			return state;
	}
}
