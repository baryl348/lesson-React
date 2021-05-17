import { Field, Form, Formik } from 'formik';
import React from 'react'
import { FilterType } from '../../redux/users-reducer';

interface UsersSearchType {
    onFilterChanged: (filter: FilterType) => void
}
interface FormType {
    term: string
    friend: 'true' | 'false' | 'null'
}

const UsersSearch: React.FC<UsersSearchType> = ({ onFilterChanged }) => {
    const submit = (values: FormType, { setSubmitting }: any) => {
        console.log(JSON.stringify(values, null, 2));
        console.log(values)
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        onFilterChanged(filter)
        setSubmitting(false);
    }
    return <div>
        <Formik
            initialValues={{ term: '', friend: 'null' }}
            validate={values => {
                const errors = {};
                return errors;
            }}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">only friend</option>
                        <option value="false">only not friend</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
           </button>
                </Form>
            )}
        </Formik>
    </div>
}
React.memo(UsersSearch)
export default UsersSearch