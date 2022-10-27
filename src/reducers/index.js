import cartReducer from "./cartReducer";
import navReducer from "./navReducer";
import productReducer from "./productReducer";

import { combineReducers } from "redux";

const reducers = combineReducers({
    cartReducer,
    navReducer,
    productReducer
})

export default reducers;