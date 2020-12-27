import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from '../types/types';
import { BaseThunkType,  InferActionsType } from "./redux-store";




let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};
export type InitialStateType = typeof initialState;

type ActionTypes = InferActionsType<typeof actionsProfile> 

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {
        case 'ADD_POST': {
            const newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }

        case 'DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}

        case 'SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state;
    }
}


export const actionsProfile = {
 addPostActionCreator : (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
 setUserProfile : (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
 setStatus : (status: string) => ({type: 'SET_STATUS', status} as const),
 deletePost : (postId: number) => ({type: 'DELETE_POST', postId} as const),
 savePhotoSuccess : (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)  
}


type ThunkType = BaseThunkType<ActionTypes | ReturnType<typeof stopSubmit>>

export const getUserProfile = (userId: number):ThunkType => async (dispatch) => {
    const ProfileData = await usersAPI.getProfile(userId);
    dispatch(actionsProfile.setUserProfile(ProfileData));
}

export const getStatus = (userId: number):ThunkType => async (dispatch) => {
    let StatusData = await profileAPI.getStatus(userId);
    dispatch(actionsProfile.setStatus(StatusData));
}

export const updateStatus = (status: string):ThunkType => async (dispatch) => {
    try {
        let UpdateStatusData = await profileAPI.updateStatus(status);

        if (UpdateStatusData.data.resultCode === 0) {
            dispatch(actionsProfile.setStatus(status));
        }
    } catch(error) {
        //
    }
}
export const savePhoto = (file: File):ThunkType => async (dispatch) => {
    let SavePhotoData = await profileAPI.savePhoto(file);
    if (SavePhotoData.resultCode === 0) {
        dispatch(actionsProfile.savePhotoSuccess(SavePhotoData.data.photos));
    }
}

export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        if (userId != null){
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('id can`t be null') 
        } 
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;
