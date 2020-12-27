import { BaseThunkType, InferActionsType } from './redux-store';
import {getAuthUserData} from "./auth-reducer";



let initialState = {
    initialized: false as boolean
};

const appReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

type ActionTypes = InferActionsType<typeof actions>

const actions = {
     initializedSuccess : ()=> ({type: 'INITIALIZED_SUCCESS'} as const)
}

type ThunkType =  BaseThunkType<ActionTypes>

export const initializeApp = ():ThunkType => (dispatch):any => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}


export default appReducer;
