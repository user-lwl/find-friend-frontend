import { AnyAction } from "redux"
import { User } from "../types"
import _ from 'lodash'

const initUser = {
    id: 0,
    username: null,
    userAccount: "",
    avatarUrl: null,
    gender: null,
    userPassword: null,
    phone: null,
    email: null,
    userStatus: 0,
    createTime: "",
    updateTime: "",
    isDelete: null,
    userRole: 0,
    planetCode: "",
    tags: null
}

const initialState: {
    user: User,
    isLoggedIn: boolean
} = {
    user: _.cloneDeepWith(initUser),
    isLoggedIn: false
}

export default function userReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'user/setUser': {
            return {
                ...state,
                user: action.user,
                isLoggedIn: true
            }
        }
        case 'user/deleteUser': {
            return {
                ...state,
                user: _.cloneDeepWith(initUser),
                isLoggedIn: false
            }
        }
        default:
            return state
    }
}