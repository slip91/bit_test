import * as React from "react";
import { connect } from "react-redux";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import {AppState} from "../../store/index";
import { orderActions} from "../../store/order";
import {ICrewInfo} from "../../store/order/types";

interface IProps {
    coordinates: number[];
    crewsList: ICrewInfo[];
    findUserByCoordinates: any;
    setYandexMap: any;
    userAddressErr: boolean;
}

class MapCar extends React.Component< IProps, {}> {
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
                        width={550}
                        height={300}
                        apikey = "75297380-b1bd-4ffc-a589-654d79516174"
                        onLoad={this.onLoadMap.bind(this)}
                        onClick={this.onMapClick.bind(this)}>
                        <Placemark
                            geometry={this.props.coordinates}
                            properties = {{iconCaption: this.props.userAddressErr ? "Адрес не найден" : ""}}
                            options= {{
                                iconColor: this.props.userAddressErr ? "red" : "yellow"}}
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
