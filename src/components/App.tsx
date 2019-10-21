import * as React from "react";
import Button from "react-bootstrap/Button";
import { hot } from "react-hot-loader";
import MapCar from "./mapCar/MapCar";
import CarList from "./carList/carList";
import Wherefrom from "./wherefrom/wherefrom";
import SelectCar from "./selectCar/selectCar";
import "./../assets/scss/App.scss";

class App extends React.Component< {}, {}> {
    private render() {
        return (
            <div className="container">
                <div className="row">
                    <div class="col-12">
                        <Wherefrom/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <SelectCar/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col-6">
                        <MapCar/>
                    </div>
                    <div className="col-6">
                        <CarList/>
                    </div>
                </div>
                <div className={"row"}>
                    <Button variant="primary">Заказать</Button>
                </div>
            </div>
        );
    }
}

declare let module: object;

export default hot(module)(App);
