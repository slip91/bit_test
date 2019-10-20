import {ActionType} from "typesafe-actions";
import {actionOrder, default as orderActions} from "./actions"

export interface RootState {
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

export interface ISuitableCrewsResponse {
    code: number; // todo or enum
    descr: string;
    data: ICrewData;
}

export type RootActions = ActionType<typeof orderActions>;
export type OrderAction = ActionType<typeof orderActions>;
