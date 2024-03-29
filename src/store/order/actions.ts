import { Dispatch} from "redux";
import {action} from "typesafe-actions";
import {
    SET_ADDRESS,
    SET_ADDRESS_ERR,
    SET_COORDINATES,
    SET_CREWS_LIST,
    SET_SELECTED_CAT,
    SET_YANDEX_MAP,
} from "./constants";

import {ThunkAction} from "redux-thunk";
import {ICrewInfo,  IRootState, ISuitableCrewsResponse, RootActions, IOrder, IAddresses, ISearchCrews} from "./types";

export const setYandexMap = (map: object) => action(SET_YANDEX_MAP, map);
export const setCoordinates = (coordinates: any) => action(SET_COORDINATES, coordinates);
export const setAddress = (addr: string) => action(SET_ADDRESS, addr);
export const setAddressErr = (status: boolean) => action(SET_ADDRESS_ERR, status);
export const setCrewsList = (crewList: ICrewInfo[]) => action(SET_CREWS_LIST, crewList);
export const setSelectedCar = (car: ICrewInfo) => action(SET_SELECTED_CAT, car);

export const findUserByStr = (addr: string): ThunkAction<void, IRootState, undefined, RootActions> => (
    dispatch: Dispatch<RootActions>,
    getState: any,
) => {
    // даем яндексу адресс и получаем координаты и другую информацию.
    getState().order.yandexMap.geocode(addr).then((res) => {
        if (res.metaData.geocoder.found > 0) {
            dispatch(setCoordinates(res.geoObjects.get(0).geometry._coordinates));
            // dispatch(setAddress(addr));
            dispatch(searchCrews());
        } else {
            dispatch(setCoordinates([]));
            dispatch(searchCrews(false));
        }
    });
};

export const findUserByCoordinates = (coordinates: any): ThunkAction<void, IRootState, undefined, RootActions> => (
    dispatch: Dispatch<RootActions>,
    getState: any,
) => {
    // даем яндексу координаты, и получаем улицу и т.д.
    getState().order.yandexMap.geocode(coordinates).then((res) => {
        dispatch(setCoordinates(coordinates));
        const street = res.geoObjects.get(0).getThoroughfare();
        const house = res.geoObjects.get(0).getPremiseNumber();
        // проверяем валидность адреса, например если точка является озером => невалидно
        if (street === undefined || house === undefined) {
            dispatch(setAddressErr(true));
            dispatch(setAddress(""));
            dispatch(searchCrews(false));
        } else {
            street.replace("улица", "").trim(); // только для визуала
            const addr = street + ", " + house;
            dispatch(setAddressErr(false));
            dispatch(setAddress(addr));
            dispatch(searchCrews(true));
        }
    });
};

export const searchCrews = (status: boolean = true): ThunkAction<void, IRootState, undefined, RootActions> => async (
    dispatch: Dispatch<RootActions>,
    getState: any,
) => {
    const state = getState().order;
    const currDate = new Date();

    const currAddresses: IAddresses = {
        address: state.userAddress,
        lat: state.coordinates[0],
        lon: state.coordinates[1],
    };
    const findCrews: ISearchCrews = {
        addresses: [currAddresses],
        source_time: currDate.getFullYear() + "" +
            currDate.getMonth() + "" +
            currDate.getDate() + "" +
            currDate.getHours() + "" +
            currDate.getMinutes() + "" +
            currDate.getSeconds(), // формат времени ГГГГММДДччммсс

    };

    console.log(findCrews);

    const suitableCrewsResponse = await fetch("./src/mock/suitableCrews.json",  {
        method: "GET", // GET т.к. мок файликом а вообще POST
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify(findCrews), // тип данных в body должен соответвовать значению заголовка "Content-Type"
    });
    const dataResponce: ISuitableCrewsResponse = await suitableCrewsResponse.json();

    // очищаем если false
    if (status) {
        dispatch(setCrewsList(dataResponce.data.crews_info));
        // первая машина, становиться предпочитаемым вариантом, но возможно тут с учетом сортировки
        if (dataResponce.data.crews_info.length > 0) {
            dispatch(setSelectedCar(dataResponce.data.crews_info[0]));
        }
    } else {
        dispatch(setCrewsList([]));
        dispatch(setSelectedCar(null));
    }
};

export const validate = (): ThunkAction<void, IRootState, undefined, RootActions> => (
    dispatch: Dispatch<RootActions>,
    getState: any,
) => {
    const newAddr = getState().order.userAddress;
    const statusRegexpValidate = /[a-zA-zа-яА-Я]{1,}[\,]{1,1}[\s]{0,1}[a-zA-zа-яА-Я\d-]{1,}/gm.test(newAddr);
    if (statusRegexpValidate) {
        dispatch(setAddressErr(false)); // нету ошибок
        dispatch(findUserByStr(newAddr));
        return true;
    } else {
        // clear all
        dispatch(setSelectedCar(null));
        dispatch(setCrewsList([]));
        dispatch(setAddressErr(true));
        return false;
    }
};

export const send = (): ThunkAction<void, IRootState, undefined, RootActions> => async (
    dispatch: Dispatch<RootActions>,
    getState: any,
) => {
    const state = getState().order;
    const currDate = new Date();

    const currAddresses: IAddresses = {
        address: state.userAddress,
        lat: state.coordinates[0],
        lon: state.coordinates[1],
    };
    const order: IOrder = {
        crew_id: state.selectedCar.crew_id,
        source_time: currDate.getFullYear() + "" +
            currDate.getMonth() + "" +
            currDate.getDate() + "" +
            currDate.getHours() + "" +
            currDate.getMinutes() + "" +
            currDate.getSeconds(), // формат времени ГГГГММДДччммсс
        addresses: [currAddresses],
    };

    console.log(order);

    fetch("./src/mock/submitOrder.json", {
        method: "GET", // GET т.к. мок файликом а вообще POST
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify(order), // тип данных в body должен соответвовать значению заголовка "Content-Type"
    }).then((response) => response.json());
};
