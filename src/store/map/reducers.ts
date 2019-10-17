import {MapState, MapActionTypes, SET_MAP} from "./types";

const initialState: MapState = {
    map: {},
};

export function mapReducer(
    state = initialState,
    action: MapActionTypes,
): MapState {
    switch (action.type) {
        case SET_MAP: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}
