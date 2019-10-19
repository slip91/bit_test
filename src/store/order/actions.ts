import {Action, Dispatch} from "redux";
import {action, createAction, createCustomAction, StateType} from "typesafe-actions";
import store from "../index";
import {ADD, INCREMENT, SET_MAP, GET_ADDRESS, SET_ADDRESS_FROM_STR, SET_ADDRESS} from "./constants";
import { ThunkAction } from 'redux-thunk';
import {RootActions, RootState} from "./types";

export const setMap = (map: object) => action(SET_MAP, map);
export const setAddress = (addr: string) => action(SET_ADDRESS, addr);

export const asyncIncrement = (addr: string): ThunkAction<void, RootState, undefined, RootActions> => (
    dispatch: Dispatch<Action>,
    getState: any, // todo 2
) => {
    getState().order.yandexMap.geocode(addr).then((res) => {
      //  console.log("opppa");
      // console.log(res.geoObjects.get(0).geometry._coordinates);
        dispatch(setAddress(res.geoObjects.get(0).geometry._coordinates));

    });

    // dispatch(setEnable({ enable: false }));
    // setTimeout(() => {
    //     // dispatch(increment({ value: payload.value }));
    //     // dispatch(setEnable({ enable: true }));
    //     console.log('eeee');
    //     console.log(getState());
    // }, 1000);
};

// ALTERNATIVE API - allow to use reference to "action-creator" function instead of "type constant"
// e.g. case getType(increment): return { ... }
// This will allow to completely eliminate need for "constants" in your application, more info here:
// https://github.com/piotrwitek/typesafe-actions#constants

// OPTION 1 (with generics):
// import { createStandardAction } from 'typesafe-actions';
// export const increment = createStandardAction(INCREMENT)<void>();
// export const add = createStandardAction(ADD)<number>();

// OPTION 2 (with resolve callback):
// import { createAction } from 'typesafe-actions';
// export const increment = createAction(INCREMENT);
// export const add = createAction(ADD, resolve => {
//   return (amount: number) => resolve(amount);
// });
