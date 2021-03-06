import React from 'react';
import { connect } from 'react-redux';
import {
    follow,
    unfollow, requestUsers, FilterType
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
    filterTerm,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStateUserType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    followingInProgress: Array<number>
    users: Array<UserType>
    isFetching: boolean
    filter: FilterType
}

type MapDispatchUserType = {
    getUsers: (currentPage: number,
        pageSize: number, filter: FilterType) => void
    unfollow: (usersId: number) => void
    follow: (usersId: number) => void
}

type OwnPropsUsersContainerType = {
    pageTitle: string
}

type UsersContainerType = MapStateUserType & MapDispatchUserType & OwnPropsUsersContainerType


class UsersContainer extends React.Component<UsersContainerType> {
    componentDidMount() {
        const { currentPage, pageSize, filter } = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize, filter } = this.props;
        this.props.getUsers(pageNumber, pageSize, filter);
    }

    onFilterChanged = (filter: FilterType) => {
        const { pageSize } = this.props
        this.props.getUsers(1, pageSize, filter);
    }

    render() {

        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateUserType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: filterTerm(state)
    }
}


export default compose(
    //  <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<MapStateUserType, MapDispatchUserType, OwnPropsUsersContainerType, AppStateType>(mapStateToProps, { follow, unfollow, getUsers: requestUsers })
)(UsersContainer)