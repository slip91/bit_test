import * as React from "react";
import { hot } from "react-hot-loader";
import { ListGroup } from "react-bootstrap";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {ICrewInfo} from "../../store/order/types";
import {orderActions} from "../../store/order";

interface IProps {
    crewsList: ICrewInfo[];
}

interface IState {
    coord: [];
    ymaps: any;
    input: string;
}

class СarList extends React.Component< IProps, IState> {
    public handleClickCar(car: ICrewInfo) {
        this.props.setSelectedCar(car);
    }

    public render() {
        console.log(this.props.crewsList);
        return (
            <ListGroup >
                {this.props.crewsList.map((car) => {
                    return (<ListGroup.Item key={car.crew_id} id={car.crew_id} onClick={() => this.handleClickCar(car)}>
                        {car.car_mark}
                        {car.car_model}
                        {car.distance} metrov
                        {car.car_color}</ListGroup.Item>
                    );
                })}
            </ListGroup>
        );
    }
}

declare let module: object;

const dispatchProps = {
    setSelectedCar: orderActions.setSelectedCar,
};

export default connect(
    (state: AppState) => ({
        crewsList: state.order.crewsList,
    }), dispatchProps)(СarList);
