import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  createField,
  Textarea,
} from "../../common/FormsControls/FormsControls";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { NewMessageForm } from '../Dialogs'

const maxLength50 = maxLengthCreator(50);
type FormValuesTypeKeys = Extract<keyof NewMessageForm, string>

const AddMessageForm: React.FC<InjectedFormProps<NewMessageForm>> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {createField<FormValuesTypeKeys>(
          "Enter your message",
          "newMessageBody",
          [required, maxLength50],
          Textarea
        )}
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

export default reduxForm<NewMessageForm>({ form: "dialog-add-message-form" })(AddMessageForm);
