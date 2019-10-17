import * as React from "react";
import { hot } from "react-hot-loader";
import { YMaps, Map, Placemark } from "react-yandex-maps";

interface IProps {}

interface IState {
    coord: [];
    ymaps: any;
    input: string;
}

class MapCar extends React.Component< IProps, IState> {
    public state: IState = {
        coord: [],
        ymaps: {},
        input: "Борисоглебский переулок 10с1",
    }

    private onMapClick(event) {
        // this.getAddress(event.get("coords"));
        this.setState(state => {
            return {
                coord: event.get("coords"),
            };
        });
    }

    public render() {
        return (
            <div className="map">
                <YMaps query ={{
                    apikey: "75297380-b1bd-4ffc-a589-654d79516174",
                }}>
                    <Map
                        defaultState={{ center: [55.751574, 37.573856], zoom: 11 }}
                        modules={["geolocation", "geocode"]}
                        apikey = "75297380-b1bd-4ffc-a589-654d79516174"
                        onLoad={(ymaps) => {this.state.ymaps = ymaps;}}

                        onClick={this.onMapClick.bind(this)} >
                        <Placemark
                            geometry={this.state.coord}
                        />
                    </Map>
                </YMaps>
            </div>
        );
    }
}

declare let module: object;

export default hot(module)(MapCar);
