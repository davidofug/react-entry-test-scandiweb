import { SWITCH_CURRENCY } from "../actions/types";
const currencySettings = JSON.parse(localStorage.getItem("currency")) || null;
console.log(currencySettings);
const initialState = {
	currency: currencySettings?.currency || 0,
	symbol: currencySettings?.symbol || "$",
};

export default function currencyReducer(state = initialState, action) {
	switch (action.type) {
		case SWITCH_CURRENCY:
			localStorage.setItem(
				"currency",
				JSON.stringify({
					currency: action.payload.position ?? state.currency,
					symbol: action.payload.symbol ?? state.symbol,
				})
			);

			return {
				currency: action.payload.position ?? state.currency,
				symbol: action.payload.symbol ?? state.symbol,
			};

		default:
			return state;
	}
}
