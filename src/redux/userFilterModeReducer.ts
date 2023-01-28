import { AnyAction } from "redux"
import { UserFilterOperations } from "../types"

const initialState: {
    operation: UserFilterOperations,
} = {
    operation: "recommend",
}

export default function userFilterModeReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'userFilterMode/setMode': {
            return {
                ...state,
                operation: action.operation,
            }
        }
        case 'global/clearFilters': {
            return {
                ...state,
                operation: "recommend",
            }
        }
        default:
            return state
    }
}