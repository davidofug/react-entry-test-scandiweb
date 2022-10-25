import { FETCH_NAV_ITEMS } from "./types";

export const fetchNavItems = (navItems) => {
    // console.log(navItems)
    return {
        type: FETCH_NAV_ITEMS,
        payload: navItems
    }
}


