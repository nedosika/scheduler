import {schedulesActionType} from "../types";

const initialState = {
    isLoading: false,
    error: null,
    schedules: []
}

const schedulesReducer = (state = initialState, action) => {
    switch (action.type) {
        case schedulesActionType.SET_IS_SCHEDULES_LOADING:
            return {
                ...state,
                isLoading: action.payload,
                error: null
            };
        case schedulesActionType.SET_SCHEDULES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case schedulesActionType.SET_SCHEDULES:
            return {
                ...state,
                isLoading: false,
                error: null,
                schedules: action.payload
            };
        case schedulesActionType.ADD_SCHEDULE:
            return {
                ...state,
                isLoading: false,
                error: null,
                schedules: [...state.schedules, action.payload]
            };
        case schedulesActionType.UPDATE_SCHEDULE:
            return {
                ...state,
                error: null,
                isLoading: false,
                schedules: state.schedules.map((schedule) =>
                    schedule.id === action.payload.id
                        ? {...action.payload}
                        : {...schedule}
                )
            };
        case schedulesActionType.REMOVE_SCHEDULE:
            return {
                ...state,
                error: null,
                isLoading: false,
                schedules: [...state.schedules.filter((schedule) => schedule.id !== action.payload)]
            };
        default:
            return state
    }
}

export default schedulesReducer;