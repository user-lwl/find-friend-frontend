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
    isSet: boolean
} = {
    user: _.cloneDeepWith(initUser),
    isSet: false
}

export default function selectedUserReduer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'selectedUser/setUser': {
            return {
                ...state,
                user: action.user,
                isSet: true
            }
        }
        case 'selectedUser/clearUser': {
            return {
                ...state,
                user: _.cloneDeepWith(initUser),
                isSet: false
            }
        }
        default:
            return state
    }
}