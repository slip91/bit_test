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
    userAddress: ICoordinates | null;
}

export type RootActions = ActionType<typeof orderActions>;
export type OrderAction = ActionType<typeof orderActions>;
