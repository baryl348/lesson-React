import React from "react";
import styles from "./FormsControls.module.css";
import { ValidatorsType } from "../../../utils/validators/validators";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";

type FormControlsParamsType = {
    meta: WrappedFieldMetaProps
}

// type FormControlType = (params: FormControlsParamsType) => React.ReactNode

const FormControl: React.FC<FormControlsParamsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}



export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const { input, meta, child, ...restProps } = props;
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    //  const { input, meta, child, ...restProps } = props;
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export function createField<formKeysType extends string>(placeholder: string | undefined, name: formKeysType,
    validators: Array<ValidatorsType>, component: React.FC<WrappedFieldProps>,
    props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder} name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>
}

