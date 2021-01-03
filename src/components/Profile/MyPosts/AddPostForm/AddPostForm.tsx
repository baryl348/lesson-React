import React from 'react';
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Textarea } from '../../../common/FormsControls/FormsControls';
import { FormPropsType } from '../MyPosts';

type AddpostFormValuesKeyType = Extract<keyof FormPropsType, string>

const AddPostForm: React.FC<InjectedFormProps<FormPropsType>> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<AddpostFormValuesKeyType>(undefined, 'newPostText', [], Textarea)}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<FormPropsType>({ form: 'profile-add-post' })(AddPostForm)
