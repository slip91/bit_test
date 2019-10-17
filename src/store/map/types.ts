// Describing the shape of the system's slice of state

export interface MapState {
    map: object; // todo тут точно можно указать нормальный тип
}

// Describing the different ACTION NAMES available
export const SET_MAP = "SET_MAP";

interface UpdateMapAction {
    type: typeof SET_MAP;
    payload: MapState;
}

export type MapActionTypes = UpdateMapAction;
