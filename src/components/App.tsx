import * as React from "react";
import { hot } from "react-hot-loader";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import MapCar from "./mapCar/MapCar";

const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";

interface IProps {}

interface IState {
    coord: [];
    ymaps: any;
    input: string;
}

class App extends React.Component< IProps, IState> {
    public state: IState = {
        coord: [],
        ymaps: {},
        input: "Борисоглебский переулок 10с1",
    }



    private onMapClick(event) {
        this.getAddress(event.get("coords"));
        this.setState(state => {
            return {
                coord: event.get("coords"),
            };
        });
    }

    private getAddressStr(addrStr) {
        this.state.ymaps.geocode(addrStr).then((res) => {

            console.log( res.geoObjects.get(0).getLocalities()[0]);
            console.log( res.geoObjects.get(0).getThoroughfare());
            console.log( res.geoObjects.get(0).getPremiseNumber());
        }
    }

    private getAddress(coords) {
        this.state.ymaps.geocode(coords).then((res) => {
            // console.log(res);
            console.log( res.geoObjects.get(0).getLocalities()[0]);
            console.log( res.geoObjects.get(0).getThoroughfare());
            console.log( res.geoObjects.get(0).getPremiseNumber());

            console.log("-----2----------");
            console.log(this.getAddressStr("Борисоглебский переулок 10с1"));

        });
    }

    public handleChange(event) {
        this.getAddressStr(event.target.value);
        this.setState({input: event.target.value});
    }

    private render() {
        return (
            <div className="app">
                <MapCar></MapCar>

                <input value={this.state.input} onChange={this.handleChange.bind(this)} />
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

export default hot(module)(App);
