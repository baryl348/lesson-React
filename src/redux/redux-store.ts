import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducer = typeof rootReducer
export type AppStateType =ReturnType<RootReducer>

type PropertiesType<GenericType> = GenericType extends {[key:string]: infer U} ? U :never
export type InferActionsType<GenericType extends {[key:string]: (...args:any[])=>any}> = ReturnType <PropertiesType<GenericType>>
export type BaseThunkType< A extends Action, P=Promise<void>> = ThunkAction<P, AppStateType, unknown, A>
//@ts-ignore
// window.__store__ = store;
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
