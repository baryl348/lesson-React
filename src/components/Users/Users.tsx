import React from 'react';
import { FilterType } from '../../redux/users-reducer';
import { UserType } from '../../types/types';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearch from './Users-Search';

interface UsersType {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (usersId: number) => void
    follow: (usersId: number) => void
    onFilterChanged: (filter: FilterType) => void
}

const Users: React.FC<UsersType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, onFilterChanged, ...props }) => {
    return <div>
        <UsersSearch onFilterChanged={onFilterChanged} />
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount} pageSize={pageSize} />
        <div>
            {
                users.map(u => <User user={u}
                    followingInProgress={props.followingInProgress}
                    key={u.id}
                    unfollow={props.unfollow}
                    follow={props.follow}
                />
                )
            }
        </div>
    </div>
}

export default Users;