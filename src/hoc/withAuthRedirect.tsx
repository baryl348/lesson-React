import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});
type MapPropsType = {
    isAuth: boolean
}

export function withAuthRedirect<CP>(Component: React.ComponentType<CP>) {
    const RedirectComponent: React.FC<MapPropsType> = (props) => {
        const { isAuth, ...restProps } = props
        if (!isAuth) return <Redirect to='/login' />
        return <Component {...restProps as CP} />
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, { fake: () => {} }, CP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;

}