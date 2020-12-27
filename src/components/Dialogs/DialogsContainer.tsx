
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { actionsDialog } from "../../redux/dialogs-reducer";

type MapStateType = {
    dialogsPage: any
}
type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(actionsDialog.sendMessageCreator(newMessageBody));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);