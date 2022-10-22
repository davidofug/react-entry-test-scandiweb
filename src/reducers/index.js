import cartReducer from "./cartReducer";
import navReducer from "./navReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    cartReducer,
    navReducer
})

export default reducers;