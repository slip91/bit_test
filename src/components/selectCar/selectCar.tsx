import * as React from "react";
import { hot } from "react-hot-loader";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {orderActions} from "../../store/order";
import {Card} from "react-bootstrap";
import {ICrewInfo} from "../../store/order/types";

const carLogo = require("./../../assets/img/sportive-car.svg");

interface IProps {
    selectedCar: ICrewInfo,
}

interface IState {
    coord: [];
    ymaps: any;
    input: string;
}

class SelectCar extends React.Component< IProps, IState> {
    public render() {
        // console.log(this.props.selectedCar);
        if ( this.props.selectedCar !== null) {
            return (
                <div className={"row selectCar"}>
                    <div className={"col-3 text-center"}>
                        <p>Подходящий экипаж: </p>
                    </div>
                    <div className={"col-9"}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Text>
                                    <div className={"row"}>
                                        <div className={"col-3"}>
                                            <img src={carLogo} height="60%"/>
                                        </div>
                                        <div className={"col-9"}>
                                            <h5>{this.props.selectedCar.car_mark} {this.props.selectedCar.car_model} </h5>
                                            <p>{this.props.selectedCar.car_color}</p>
                                            <span className="badge badge-pill badge-primary">{this.props.selectedCar.car_number}</span>
                                        </div>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                </div>
            );
        }

    }
}


declare let module: object;

const dispatchProps = {

};

export default connect(
    (state: AppState) => ({
        selectedCar: state.order.selectedCar,
    }), dispatchProps)(SelectCar);
