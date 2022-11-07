import {
	ADD_TO_CART,
	ADD_TO_QUANTITY,
	REDUCE_TO_QUANTITY,
} from "../actions/types";

const initialState = {
	items: JSON.parse(localStorage.getItem("cart")) || [],
};

export default function cartReducer(state = initialState, action) {
	let newQuantity, item, itemPosition;
	switch (action.type) {
		case ADD_TO_CART:
			localStorage.setItem(
				"cart",
				JSON.stringify([action.payload, ...state.items])
			);
			return {
				items: [action.payload, ...state.items],
			};
		case ADD_TO_QUANTITY:
			itemPosition = action.payload.item_position;
			item = state.items[itemPosition];
			newQuantity = item["quantity"] + action.payload.quantity;
			item["quantity"] = newQuantity;
			state.items[itemPosition] = item;

			localStorage.setItem("cart", JSON.stringify([...state.items]));
			return {
				items: [...state.items],
			};
		case REDUCE_TO_QUANTITY:
			itemPosition = action.payload.item_position;
			item = state.items[itemPosition];
			newQuantity = item["quantity"] - action.payload.quantity;
			item["quantity"] = newQuantity <= 0 ? 1 : newQuantity;
			state.items[itemPosition] = item;
			localStorage.setItem("cart", JSON.stringify([...state.items]));

			return {
				items: [...state.items],
			};
		default:
			return state;
	}
}
