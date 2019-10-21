import * as React from "react";
import Button from "react-bootstrap/Button";
import { hot } from "react-hot-loader";
import {connect} from "react-redux";
import {AppState} from "../store";
import {orderActions} from "../store/order";
import MapCar from "./mapCar/MapCar";
import CarList from "./carList/carList";
import Wherefrom from "./wherefrom/wherefrom";
import SelectCar from "./selectCar/selectCar";
import "./../assets/scss/App.scss";

interface IProps {
    userAddressErr: boolean;
    validate: any;
    sendOrder: any;
}

interface IState {
    send: boolean;
}

class App extends React.Component< IProps, IState> {
    public state: IState = {
        send: true,
    }

    // depecated
    private componentWillReceiveProps(nextProps) {
        this.state.send = !nextProps.userAddressErr;
    }

    private async submit() {
        await this.setState({ send: this.props.validate()});
        if (this.state.send) {
            this.props.sendOrder();
        }
    }

    private render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Детали заказа</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Wherefrom />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <SelectCar/>
                    </div>
                </div>
                <div className={"row mapMain"}>
                    <div className="col-6">
                        <MapCar/>
                    </div>
                    <div className="col-6">
                        <CarList/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col-12 text-center">
                        <Button variant="primary"  disabled={!this.state.send} onClick={this.submit.bind(this)}>Заказать</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const dispatchProps = {
    validate: orderActions.validate,
    sendOrder: orderActions.send,
};

export default connect(
    (state: AppState) => ({
        userAddressErr: state.order.userAddressErr,
    }), dispatchProps)(App);

// export default App;
