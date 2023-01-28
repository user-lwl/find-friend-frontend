import { AnyAction } from "redux"
import _ from 'lodash'

const initialState: {
    tags: string[]
} = {
    tags: []
}

export default function currentTagsFilterReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'currentTagsFilter/setFilter': {
            return {
                ...state,
                tags: _.cloneDeepWith(action.tags)
            }
        }
        case 'global/clearFilters': {
            return {
                ...state,
                tags: [],
            }
        }
        default:
            return state
    }
}