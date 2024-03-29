import {ActionType} from "typesafe-actions";
import * as orderActions from "./actions";

export interface IRootState {
    order: IOrderState;
}

export interface ICoordinates {
    lat: number;
    long: number;
}

export interface IOrderState {
    yandexMap: object;
    userAddress: string;
    coordinates: [];
    crewsList: ICrewInfo[];
    selectedCar: ICrewInfo | null;
    userAddressErr: boolean;
}

export interface ICrewInfo {
    crew_id: number;
    car_mark: string;
    car_model: string;
    car_color: string;
    car_number: string;
    driver_name: string;
    driver_phone: string;
    lat: number;
    lon: number;
    distance: number;
}
export interface ICrewData {
    crews_info: ICrewInfo[];
}

export interface IAddresses {
    address: string;
    lat: number;
    lon: number;
}

export interface ISearchCrews {
    source_time: string; // формат времени ГГГГММДДччммсс
    addresses: IAddresses[];
}
export interface IOrder extends ISearchCrews {
    crew_id: number;
}

export interface ISuitableCrewsResponse {
    code: number; // or enum
    descr: string;
    data: ICrewData;
}

export type RootActions = ActionType<typeof orderActions>;
export type OrderAction = ActionType<typeof orderActions>;
