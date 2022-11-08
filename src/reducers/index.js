import cartReducer from "./cartReducer";
import navReducer from "./navReducer";
import productReducer from "./productReducer";
import currencyReducer from "./currencyReducer";

import { combineReducers } from "redux";

const reducers = combineReducers({
	cartReducer,
	navReducer,
	productReducer,
	currencyReducer,
});

export default reducers;
