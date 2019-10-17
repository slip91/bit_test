import {SET_MAP} from "./types";

export function setObjectMap(map: any) {
    return {
        type: SET_MAP,
        payload: map,
    };
}
