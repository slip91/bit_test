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
}

interface IState {
    send: boolean;
}

class App extends React.Component< IProps, IState> {
    public state: IState = {
        send: true,
    }

    private componentWillReceiveProps(nextProps) {
        if (!this.state.send) {
            console.log("nextProps.userAddressErr");
            console.log(nextProps.userAddressErr);
            this.state.send = !nextProps.userAddressErr;
        }
    }

    private submit() {
        console.log("this.props.validate()")
        console.log(this.props.validate())

        this.setState({ send: this.props.validate()})
    }

    private render() {
        return (
            <div className="container">
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
                <div className={"row"}>
                    <div className="col-6">
                        <MapCar/>
                    </div>
                    <div className="col-6">
                        <CarList/>
                    </div>
                </div>
                <div className={"row"}>
                    <Button variant="primary"  disabled={!this.state.send} onClick={this.submit.bind(this)}>Заказать</Button>
                </div>
            </div>
        );
    }
}

const dispatchProps = {
    validate: orderActions.validate,
};

export default connect(
    (state: AppState) => ({
        userAddressErr: state.order.userAddressErr,
    }), dispatchProps)(App);

// export default App;
