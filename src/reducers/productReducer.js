import {GET_PRODUCT_DETAILS,SET_PRODUCT_DETAILS} from '../actions/types'

const initialState = {
    product: {}
}

export default function productReducer(state = initialState, action) {
    // console.log(products)
        switch(action.type) {
        case GET_PRODUCT_DETAILS:
            return {
                product: action.payload
            }
        case SET_PRODUCT_DETAILS:
            return {
                product: action.payload
            }
        default:
            return state;
    }
    
}

