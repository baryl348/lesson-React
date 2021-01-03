import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { InitialStateType } from '../../redux/dialogs-reducer'

interface OwnProps {
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
  isAuth: boolean
}

export interface NewMessageForm {
  newMessageBody: string
}



const Dialogs: React.FC<OwnProps> = ({ dialogsPage, sendMessage, isAuth }) => {
  let state = dialogsPage;

  const dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));
  const messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  let addNewMessage = (values: NewMessageForm) => {
    sendMessage(values.newMessageBody);
  };

  // if (!isAuth) return <Redirect to={"/login"} />;

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
