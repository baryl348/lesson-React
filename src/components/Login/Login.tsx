import React from 'react';
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css"
import { AppStateType } from '../../redux/redux-store';

type LoginFormOwnProps = {
    captchaUrl: string | null
}

export type loginValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type loginValuesKeyTypes = Extract<keyof loginValuesType, string>

const LoginForm: React.FC<InjectedFormProps<loginValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<loginValuesKeyTypes>("Email", "email", [required], Input)}
            {createField<loginValuesKeyTypes>("Password", "password", [required], Input, { type: "password" })}
            {createField<loginValuesKeyTypes>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}

            { captchaUrl && <img src={captchaUrl} alt='captcha' />}
            { captchaUrl && createField<loginValuesKeyTypes>("Symbols from image", "captcha", [required], Input, {})}


            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<loginValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)


type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: loginValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);