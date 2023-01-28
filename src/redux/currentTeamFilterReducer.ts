import { AnyAction } from "redux"
import { ListTeamRequest } from "../types"

const initialState: {
    filter: ListTeamRequest,
} = {
    filter: {},
}

export default function currentTeamFilterReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'currentTeamFilter/setFilter': {
            return {
                ...state,
                filter: action.filter,
            }
        }
        case 'global/clearFilters': {
            return {
                ...state,
                filter: {},
            }
        }
        default:
            return state
    }
}