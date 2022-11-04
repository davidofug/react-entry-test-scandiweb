import { ADD_TO_CART, ADD_TO_QUANTITY, REDUCE_TO_QUANTITY } from "./types";

export const addToCart = (item) => {
	const newItem = { ...item, quantity: 1, setAttributes: [] };
	return {
		type: ADD_TO_CART,
		payload: newItem,
	};
};

export const addToQuantity = (index) => {
	return {
		type: ADD_TO_QUANTITY,
		payload: {
			item_position: index,
			quantity: 1,
		},
	};
};

export const reduceToQuantity = (index) => {
	return {
		type: REDUCE_TO_QUANTITY,
		payload: {
			item_position: index,
			quantity: 1,
		},
	};
};
