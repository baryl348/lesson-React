import { UserType } from "../../types/types"
import usersReducer, { InitialState, actions } from "../users-reducer"

let state: InitialState

beforeEach(() => {
    state = {
        users: [{ id: 0, name: 'andrey', followed: false, status: "status 0", photos: { large: null, small: null } }, { id: 1, name: 'sergey', followed: false, status: "status 0", photos: { large: null, small: null } }, { id: 2, name: 'maxim', followed: true, status: "status 0", photos: { large: null, small: null } }, { id: 3, name: 'artem', followed: true, status: "status 0", photos: { large: null, small: null } },] as Array<UserType>,
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [] as Array<number>,
    }
})

test('followSuccess', () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeTruthy()
})

test('unfollowSuccess', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})