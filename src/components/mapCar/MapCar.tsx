import * as React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from "redux";
import {AppState} from "../../store/index";
import { countersActions, countersSelectors } from "../../store/counters";

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
        console.log(this.props.map);

        this.setState(state => {
            return {
                coord: event.get("coords"),
            };
        });
    }

    render() {
        return (
            <div className="map">
                {/*{this.props.map}*/}
                <YMaps query ={{
                    apikey: "75297380-b1bd-4ffc-a589-654d79516174",
                }}>
                    <Map
                        defaultState={{ center: [55.751574, 37.573856], zoom: 11 }}
                        modules={["geolocation", "geocode"]}
                        apikey = "75297380-b1bd-4ffc-a589-654d79516174"
                        onLoad={(ymaps) => {this.state.ymaps = ymaps; this.props.onSetMap(ymaps);}}

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

const dispatchProps = {
    onIncrement: countersActions.increment,
    onSetMap: countersActions.setMap,
};

export default connect(
    (state: AppState) => ({
        counter: state.map.reduxCounter,
        map: state.map.reduxMap,
    }), dispatchProps)(MapCar);

// export default hot(module)(MapCar);
