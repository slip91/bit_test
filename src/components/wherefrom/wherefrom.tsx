import {stringify} from "querystring";
import * as React from "react";
import { hot } from "react-hot-loader";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {orderActions} from "../../store/order";

interface IProps {
    findUserByStr: any;
    userAddress: any;
}

interface IState {
    hasError: boolean;
    userAddress: string;
}

class Wherefrom extends React.Component< IProps, IState> {
    public state: IState = {
        hasError: false,
        userAddress: "",
    }

    public handleChange(event) {
        this.setState({userAddress: event.target.value});
        if (this.validate(event.target.value)) {
            this.props.findUserByStr(event.target.value);
            this.state.hasError = false;
        } else {
            this.state.hasError = true;
        }
    }
    public componentWillReceiveProps(props: IProps) {
        if (props.userAddress !== this.state.userAddress) {
            this.setState({userAddress: props.userAddress});
        }
    }

    public validate(val: string): boolean {
        return /[a-zA-zа-яА-Я]{1,}[\,]{1,1}[\s]{0,1}[a-zA-zа-яА-Я\d-]{1,}/gm.test(val);
    }

    private errorField() {
        if (this.state.hasError) {
            return (<p style={{color: "red"}}>1</p>);
        } else {
            return (<p></p>);
        }
    }

    public render() {
        return (
            <div className="app">
                <input value={this.state.userAddress} onChange={this.handleChange.bind(this)}/>
                {this.errorField()}
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
