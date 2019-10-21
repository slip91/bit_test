import * as React from "react";
// import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { Map, Placemark, YMaps } from "react-yandex-maps";
// import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from "redux";
import {AppState} from "../../store/index";
import { orderActions, orderSelectors } from "../../store/order";
import {ICrewInfo} from "../../store/order/types";

interface IProps {
    coordinates: number[];
    crewsList: ICrewInfo[];
    findUserByCoordinates: any;
    setYandexMap: any;
    userAddressErr: boolean;
}

// interface IState {}
class MapCar extends React.Component< IProps, {}> {
    // public state: IState = {}

    private onMapClick(event) {
        this.props.findUserByCoordinates(event.get("coords"));
    }

    private onLoadMap(ymaps: any) {
        this.props.setYandexMap(ymaps);
    }

    render() {
        return (
            <div className="map">
                <YMaps query ={{
                    apikey: "75297380-b1bd-4ffc-a589-654d79516174",
                }}>
                    <Map
                        defaultState={{ center: [55.751574, 37.573856], zoom: 11 }}
                        modules={["geolocation", "geocode"]}
                        apikey = "75297380-b1bd-4ffc-a589-654d79516174"
                        onLoad={this.onLoadMap.bind(this)}
                        onClick={this.onMapClick.bind(this)} >
                        <Placemark
                            geometry={this.props.coordinates}
                            options= {{iconColor: this.props.userAddressErr ? "red" : "yellow"}}
                        />
                        {this.props.crewsList.map((car) => {
                            const geometry = [car.lat, car.lon];
                            return ( <Placemark
                                    geometry={geometry}
                                />
                            );
                        })}
                    </Map>
                </YMaps>
            </div>
        );
    }
}

declare let module: object;

const dispatchProps = {
    findUserByCoordinates: orderActions.findUserByCoordinates,
    setYandexMap: orderActions.setYandexMap,
};

export default connect(
    (state: AppState) => ({
        coordinates: state.order.coordinates,
        crewsList: state.order.crewsList,
        userAddressErr: state.order.userAddressErr,
    }), dispatchProps)(MapCar);
