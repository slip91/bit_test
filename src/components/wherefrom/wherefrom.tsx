import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {orderActions} from "../../store/order";

interface IProps {
    findUserByStr: any;
    userAddress: any;
    validateAddr: any;
    userAddressErr: boolean;
    setAddress: any;
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
            return (<p></p>);
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
