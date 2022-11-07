import { SWITCH_CURRENCY } from "./types";

export const switchCurrency = (currency) => {
	return {
		type: SWITCH_CURRENCY,
		payload: currency,
	};
};
