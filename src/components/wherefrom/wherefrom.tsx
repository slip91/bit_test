import * as React from "react";
import { hot } from "react-hot-loader";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {orderActions} from "../../store/order";

interface IProps {
    findUserByStr: any;
    userAddress: any;
}

// interface IState {}

class Wherefrom extends React.Component< IProps, {}> {
    public handleChange(event) {
        this.props.findUserByStr(event.target.value);
    }

    public render() {
        return (
            <div className="app">
                <input value={this.props.userAddress} onChange={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

declare let module: object;

const dispatchProps = {
    findUserByStr: orderActions.findUserByStr,
    onSetAddressFromStr: orderActions.setAddress,
};

export default connect(
    (state: AppState) => ({
        userAddress: state.order.userAddress,
    }), dispatchProps)(Wherefrom);
