import React from "react";
import MyPostsMemo, { DispatchPropsType, MapPropsType } from "./MyPosts";
import { connect } from "react-redux";
import { actionsProfile } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";



const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,

  };
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { addPost: actionsProfile.addPostActionCreator })(MyPostsMemo);

export default MyPostsContainer;
