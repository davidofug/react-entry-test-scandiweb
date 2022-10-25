import {FETCH_NAV_ITEMS} from '../actions/types'
const initialState = {
    navItems: ['all']
}
export default function navReducer(state = initialState, action) {
        switch(action.type) {
        case FETCH_NAV_ITEMS:
        return {
            navItems: action.payload ?? state.navItems
        }
        default:
            return state;
    }
}