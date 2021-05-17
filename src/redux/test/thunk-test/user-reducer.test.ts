import { ResultCodeEnum, ResponseType } from './../../../api/api';
import { usersAPI } from "../../../api/api"
import { actions, follow, unfollow } from "../../users-reducer"
jest.mock('../../../api/api')
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    //  чистить не обязательно но возможно без чистки идёт дополнительная нагрузка
    usersApiMock.follow.mockClear()
    usersApiMock.unfollow.mockClear()
})
const usersApiMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: ResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {},
}
usersApiMock.follow.mockReturnValue(Promise.resolve(result))
usersApiMock.unfollow.mockReturnValue(Promise.resolve(result))
test('follow thunk', async () => {
    const thunk = follow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
test('nofollow thunk', async () => {
    const thunk = unfollow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})