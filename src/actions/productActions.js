import {GET_PRODUCT_DETAILS} from "./types";
import { SET_PRODUCT_DETAILS } from "./types";

export const getProductDetails = (product) => {
     console.log(product)
    return {
        type: GET_PRODUCT_DETAILS,
        payload: product
    }

}

export const setProductDetails = (product) =>{
    return{
        type:SET_PRODUCT_DETAILS,
        payload: product
    }
}