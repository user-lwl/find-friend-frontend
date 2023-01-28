import { AnyAction } from "redux"

const initialState: {
    username: string,
} = {
    username: "",
}

export default function currentUsernameFilterReduer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'currentUsernameFilter/setFilter': {
            return {
                ...state,
                username: action.username,
            }
        }
        case 'global/clearFilters': {
            return {
                ...state,
                username: "",
            }
        }
        default:
            return state
    }
}