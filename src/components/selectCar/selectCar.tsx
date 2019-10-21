import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {Card} from "react-bootstrap";
import {ICrewInfo} from "../../store/order/types";

const carLogo = require("./../../assets/img/sportive-car.svg");

interface IProps {
    selectedCar: ICrewInfo;
}

class SelectCar extends React.Component< IProps, {}> {
    public render() {
        if ( this.props.selectedCar !== null) {
            return (
                <div className={"row selectCar"}>
                    <div className={"col-5 leftTextSelectCar"}>
                        <span className="align-middle">Подходящий экипаж:</span>
                    </div>
                    <div className={"col-7"}>
                        <Card style={{ width: "18rem" }}>
                            <Card.Body>
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
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            );
        } else {
            return (null);
        }
    }
}

const dispatchProps = {};

export default connect(
    (state: AppState) => ({
        selectedCar: state.order.selectedCar,
    }), dispatchProps)(SelectCar);
