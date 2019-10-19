import * as React from "react";
import { hot } from "react-hot-loader";
import MapCar from "./mapCar/MapCar";
import Wherefrom from "./wherefrom/wherefrom";

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

    private render() {
        return (
            <div className="app">
                <MapCar/>
                <Wherefrom/>
            </div>
        );
    }
}

declare let module: object;

export default hot(module)(App);
