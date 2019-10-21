import * as React from "react";
import { ListGroup } from "react-bootstrap";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {orderActions} from "../../store/order";
import {ICrewInfo} from "../../store/order/types";

const carLogo = require("./../../assets/img/sportive-car.svg");

interface IProps {
    crewsList: ICrewInfo[];
    setSelectedCar: any;
    selectedCar: ICrewInfo;
}

class CarList extends React.Component< IProps, {}> {
    public handleClickCar(car: ICrewInfo) {
        this.props.setSelectedCar(car);
    }

    public render() {
        return  this.props.crewsList.length > 0 ? (
            <ListGroup >
                {this.props.crewsList.map((car) => {
                    return (<ListGroup.Item
                            key = {car.crew_id}
                            onClick={() => this.handleClickCar(car)}
                            active = {this.props.selectedCar != null ? this.props.selectedCar.crew_id === car.crew_id : false}
                        >
                        <div className={"row"}>
                            <div className={"col-2"}>
                                <img src={carLogo} height={"60%"} width={"50px"}/>
                            </div>
                            <div className={"col-10"}>
                                <h4>{car.car_mark} {car.car_model} {}</h4>
                                <p>{car.car_color} --- {car.distance} m</p>
                            </div>
                        </div>
                    </ListGroup.Item>
                    );
                })}
            </ListGroup>
        ) : (null);
    }
}

const dispatchProps = {
    setSelectedCar: orderActions.setSelectedCar,
};

export default connect(
    (state: AppState) => ({
        crewsList: state.order.crewsList,
        selectedCar: state.order.selectedCar,
    }), dispatchProps)(CarList);
