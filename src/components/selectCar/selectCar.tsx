import * as React from "react";
import { hot } from "react-hot-loader";

interface IProps {}

interface IState {
    coord: [];
    ymaps: any;
    input: string;
}

class SelectCar extends React.Component< IProps, IState> {
    public render() {
        return (
            <div className="app">
                map
            </div>
        );
    }
}

declare let module: object;

export default hot(module)(SelectCar);