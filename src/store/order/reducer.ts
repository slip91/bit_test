import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";
import * as order from "./actions";
import {
  ADD,
  INCREMENT,
  SET_ADDRESS,
  SET_CREWS_LIST,
  SET_ADDRESS_FROM_STR,
  SET_MAP,
  SET_ADDRESS_ERR,
  SET_COORDINATES,
  SET_YANDEX_MAP,
  SET_SELECTED_CAT,
} from "./constants";
import {ICrewInfo, IOrderState, OrderAction} from "./types";

export const initialState: IOrderState = {
  coordinates: [],
  crewsList: [],
  userAddress: "",
  userAddressErr: false,
  yandexMap: {},
  selectedCar: null,
};

const orderReducer = (state: IOrderState = initialState, action: OrderAction) => {
  switch (action.type) {
    case SET_YANDEX_MAP: {
      return {
        ...state,
        yandexMap: action.payload,
      };
    },
    case SET_ADDRESS: {
      return {
        ...state,
        userAddress: action.payload,
      };
    },
    case SET_ADDRESS_ERR: {
      return {
        ...state,
        userAddressErr: action.payload,
      };
    },
    case SET_COORDINATES: {
        return {
          ...state,
          coordinates: action.payload,
        };
    },
    case SET_CREWS_LIST: {
      return {
        ...state,
        crewsList: action.payload,
      };
    }
    case SET_SELECTED_CAT: {
      return {
        ...state,
        selectedCar: action.payload,
      };
    }
    default:
      return state;
  }
};

export default orderReducer;
