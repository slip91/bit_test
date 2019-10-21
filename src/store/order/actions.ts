import {Action, Dispatch} from "redux";
import {action, createAction, createCustomAction, StateType} from "typesafe-actions";
import store from "../index";
import {
    SET_ADDRESS,
    SET_COORDINATES,
    SET_YANDEX_MAP,
    SET_CREWS_LIST,
    SET_SELECTED_CAT,
    SET_ADDRESS_ERR,
} from "./constants";
import { ThunkAction } from 'redux-thunk';
import {RootActions, RootState, ICrewInfo, ISuitableCrewsResponse, ICrewInfo} from "./types";

export const setYandexMap = (map: object) => action(SET_YANDEX_MAP, map);
export const setCoordinates = (coordinates: any) => action(SET_COORDINATES, coordinates);
export const setAddress = (addr: string) => action(SET_ADDRESS, addr);
export const setAddressErr = (status: boolean) => action(SET_ADDRESS_ERR, status);
export const setCrewsList = (crewList: ICrewInfo[]) => action(SET_CREWS_LIST, crewList);
export const setSelectedCar = (car: ICrewInfo) => action(SET_SELECTED_CAT, car);

export const findUserByStr = (addr: string): ThunkAction<void, RootState, undefined, RootActions> => (
    dispatch: Dispatch<Action>,
    getState: any, // todo 2
) => {
    getState().order.yandexMap.geocode(addr).then((res) => {
        dispatch(setCoordinates(res.geoObjects.get(0).geometry._coordinates));
        dispatch(setAddress(addr));
        dispatch(searchCrews());
    });
};

export const findUserByCoordinates = (coordinates: any): ThunkAction<void, RootState, undefined, RootActions> => (
    dispatch: Dispatch<Action>,
    getState: any, // todo 2
) => {
    console.log("find");

    getState().order.yandexMap.geocode(coordinates).then((res) => {
        console.log("fulfilled");
        dispatch(setCoordinates(coordinates));
        console.log("fulfilled 2");

        // console.log(res.geoObjects.get(0).getThoroughfare());
        // res.geoObjects.get(0).getLocalities()[0]

        // можно не убирать
        const street = res.geoObjects.get(0).getThoroughfare();
        const house = res.geoObjects.get(0).getPremiseNumber();

        // проверяем валидность адреса, например если точка является озером
        if (street === undefined || house === undefined) {
            dispatch(setAddressErr(true));
            dispatch(setAddress(null));
        } else {
            street.replace("улица", "").trim();
            // todo 3
            const addr = street + ", " + house;
            dispatch(setAddressErr(false));
            dispatch(setAddress(addr));
            dispatch(searchCrews());
            console.log(addr);
        }
    });
};

export const searchCrews = (): ThunkAction<void, RootState, undefined, RootActions> => async (
    dispatch: Dispatch<Action>,
    getState: any, // todo 2
) => {
    // todo create send data
   const suitableCrewsResponse = await fetch("./src/mock/suitableCrews.json");
   const dataResponce: ISuitableCrewsResponse  = await suitableCrewsResponse.json();
   dispatch(setCrewsList(dataResponce.data.crews_info));
   // first element set to select
   if (dataResponce.data.crews_info.length > 0) {dispatch(setSelectedCar(dataResponce.data.crews_info[0]));}
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
