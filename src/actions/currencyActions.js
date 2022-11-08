import { SWITCH_CURRENCY } from "./types";

export const switchCurrency = ({ position, symbol }) => {
	return {
		type: SWITCH_CURRENCY,
		payload: { position, symbol },
	};
};
