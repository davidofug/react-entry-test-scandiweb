import { ADD_TO_CART } from "../actions/types";

const initialState = {
 items:[1]

}

export default function cartReducer(state =initialState, action){
  switch(action.type){
    case ADD_TO_CART:
        return {
           items: [action.payload, ...state.items],

        }
    default:
        return state
  }
}


