import { ResultCodeForCaptcha } from './../api/api';
import {authAPI, ResultCodeEnum, securityAPI} from "../api/api";
import { stopSubmit } from "redux-form";
import { BaseThunkType, InferActionsType } from './redux-store';
import { NullType } from '../types/types';


let initialState = {
    userId: null as NullType<number>,
    email: null as NullType<string>,
    login: null as NullType<string>,
    isAuth: false,
    captchaUrl: null as NullType<string>
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type ActionTypes = InferActionsType<typeof actions>


 const actions = {
     setAuthUserData : (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA', payload:
        {userId, email, login, isAuth}
} as const),

 getCaptchaUrlSuccess : (captchaUrl: string) => ({
    type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
} as const)
}


type ThunkType = BaseThunkType<ActionTypes | ReturnType<typeof stopSubmit>>

export const getAuthUserData = ():ThunkType  => async (dispatch) => {
    const meData = await authAPI.me();

    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.captchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const getCaptchaUrl = ():ThunkType  => async (dispatch) => {
    const captchaData = await securityAPI.getCaptchaUrl();
    const captchaUrl = captchaData.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = ():ThunkType => async (dispatch) => {
    let logoutData = await authAPI.logout();

    if (logoutData.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;
