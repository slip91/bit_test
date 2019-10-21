import {
  SET_ADDRESS,
  SET_ADDRESS_ERR,
  SET_COORDINATES,
  SET_CREWS_LIST,
  SET_SELECTED_CAT,
  SET_YANDEX_MAP,
} from "./constants";
import {IOrderState, OrderAction} from "./types";

export const initialState: IOrderState = {
  coordinates: [],
  crewsList: [],
  selectedCar: null,
  userAddress: "",
  userAddressErr: false,
  yandexMap: {},
};

const orderReducer = (state: IOrderState = initialState, action: OrderAction) => {
  switch (action.type) {
    case SET_YANDEX_MAP: {
      return {
        ...state,
        yandexMap: action.payload,
      };
    }
    case SET_ADDRESS: {
      return {
        ...state,
        userAddress: action.payload,
      };
    }
    case SET_ADDRESS_ERR: {
      return {
        ...state,
        userAddressErr: action.payload,
      };
    }
    case SET_COORDINATES: {
        return {
          ...state,
          coordinates: action.payload,
        };
    }
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
