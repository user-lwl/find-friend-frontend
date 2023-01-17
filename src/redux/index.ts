import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { save, load } from "redux-localstorage-simple"
import userReducer from './userReducer'


const store = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState: load(),
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(save())
    }
})

export default store;