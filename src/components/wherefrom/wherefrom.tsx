import * as React from "react";
import { hot } from "react-hot-loader";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {orderActions} from "../../store/order";

interface IProps {}

interface IState {
    input: string;
}

class Wherefrom extends React.Component< IProps, IState> {
    public state: IState = {
        input: "Борисоглебский переулок 10с1",
    }

    public handleChange(event) {
        this.props.onSetAddressFromStr(event.target.value);
        this.props.asyncIncrement(event.target.value);

        console.log("handleChange");
        console.log(this.props.userAddress);

        this.setState({input: event.target.value});
    }

    public render() {
        return (
            <div className="app">
                <input value={this.state.input} onChange={this.handleChange.bind(this)} />
            </div>
        );
    }
}

declare let module: object;

const dispatchProps = {
    onSetAddressFromStr: orderActions.setAddress,
    asyncIncrement: orderActions.asyncIncrement,
};

export default connect(
    (state: AppState) => ({
        userAddress: state.order.userAddress,
    }), dispatchProps)(Wherefrom);
