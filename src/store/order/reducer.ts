import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";
import * as order from "./actions";
import {ADD, INCREMENT, SET_ADDRESS, SET_ADDRESS_FROM_STR, SET_MAP} from "./constants";
import {IOrderState, OrderAction} from "./types";

export const initialState: IOrderState = {
  userAddress: null,
  yandexMap: {},
};

const orderReducer = (state: IOrderState = initialState, action: OrderAction) => {
  switch (action.type) {
    case SET_MAP: {
      return {
        ...state,
        yandexMap: action.payload,
      };
    },
    case SET_ADDRESS: {
      console.log("SET_ADDRESS");
      console.log(action.payload);

      return {
        ...state,
        userAddress: action.payload,
      };
    }
    default:
      return state;
  }
};

export  default orderReducer;
