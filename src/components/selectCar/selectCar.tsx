import * as React from "react";
import { hot } from "react-hot-loader";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {orderActions} from "../../store/order";
import {Card} from "react-bootstrap";
import {ICrewInfo} from "../../store/order/types";

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
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Text>
                            {this.props.selectedCar.car_mark}
                            {this.props.selectedCar.car_model}
                            {this.props.selectedCar.distance} metrov
                            {this.props.selectedCar.car_color}
                            {this.props.selectedCar.car_number}
                        </Card.Text>
                    </Card.Body>
                </Card>
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
