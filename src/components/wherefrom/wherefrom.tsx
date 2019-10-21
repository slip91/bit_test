import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {orderActions} from "../../store/order";
import {OrderAction} from "../../store/order/types";

interface IProps {
    findUserByStr: OrderAction;
    userAddress: OrderAction;
    validateAddr: OrderAction;
    userAddressErr: OrderAction;
    setAddress: OrderAction;
}

// interface IState {}
class Wherefrom extends React.Component< IProps, {}> {
    // public state: IState = {}

    public handleChange(event) {
        this.props.setAddress(event.target.value);
        this.props.validateAddr();
    }

    private errorField() {
        if (this.props.userAddressErr) {
            return (<p style={{color: "red"}}>Место заказа не указано</p>);
        } else {
            return (null);
        }
    }
    render() {
        return (
            <div className={"wherefrom"}>
                <label htmlFor={"wherefrom"}>Откуда</label>
                <input value={this.props.userAddress}
                       className={"form-control"}
                       id={"wherefrom"}
                       onChange={this.handleChange.bind(this)}/>
                {this.errorField()}
            </div>
        );
    }
}

const dispatchProps = {
    findUserByStr: orderActions.findUserByStr,
    setAddress: orderActions.setAddress,
    validateAddr: orderActions.validate,
};

export default connect(
    (state: AppState) => ({
        userAddress: state.order.userAddress,
        userAddressErr: state.order.userAddressErr,
    }), dispatchProps)(Wherefrom);
