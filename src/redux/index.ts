import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { save, load } from "redux-localstorage-simple"
import userReducer from './userReducer'
import selectedUserReduer from "./selectedUserReduer"
import currentUsernameFilterReduer from "./currentUsernameFilterReducer"
import currentTagsFilterReducer from "./currentTagsFilterReducer"
import currentTeamFilterReducer from "./currentTeamFilterReducer"
import userFilterModeReducer from "./userFilterModeReducer"

const store = configureStore({
    reducer: {
        user: userReducer,
        selectedUser: selectedUserReduer,
        currentUsernameFilter: currentUsernameFilterReduer,
        currentTagsFilter: currentTagsFilterReducer,
        currentTeamFilter: currentTeamFilterReducer,
        userFilterMode: userFilterModeReducer
    },
    preloadedState: load(),
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(save({ ignoreStates: ["selectedUser", "currentUsernameFilter", "currentTagsFilter", "currentTeamFilter", "userFilterMode"] }))
    }
})

export default store;