import * as React from "react";
import { hot } from "react-hot-loader";

interface IProps {}

interface IState {
    coord: [];
    ymaps: any;
    input: string;
}

class СarList extends React.Component< IProps, IState> {
    public render() {
        return (
            <div className="app">
                carList
            </div>
        );
    }
}

declare let module: object;

export default hot(module)(СarList);
