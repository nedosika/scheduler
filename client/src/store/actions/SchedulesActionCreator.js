import {schedulesActionType} from "../types";
import SchedulesService from "../../api/SchedulesService";


const SchedulesActionCreator = {
    setSchedulesIsLoad: (payload) => {
        return {type: schedulesActionType.SET_IS_SCHEDULES_LOADING, payload}
    },
    setError: (payload) => {
        return {type: schedulesActionType.SET_SCHEDULES_ERROR, payload}
    },
    setSchedules: (payload) => {
        return {type: schedulesActionType.SET_SCHEDULES, payload}
    },
    getSchedules: () => (dispatch) => {
        dispatch(SchedulesActionCreator.setSchedulesIsLoad(true));
        return SchedulesService.fetchSchedules()
            .then((response) => dispatch(SchedulesActionCreator.setSchedules(response?.data)))
            .catch((e) => dispatch(SchedulesActionCreator.setError(e)))
    },
    addSchedule: ({title, description, schedules, date}) => (dispatch) => {
        dispatch(SchedulesActionCreator.setSchedulesIsLoad(true));
        return SchedulesService.addSchedule(title, description, schedules, date)
            .then(({data}) => dispatch({type: schedulesActionType.ADD_SCHEDULE, payload: data}))
            .catch((e) => dispatch(SchedulesActionCreator.setError(e)))
    },
    updateSchedule: ({id, title, description, schedules, date}) => (dispatch) => {
        dispatch(SchedulesActionCreator.setSchedulesIsLoad(true));
        return SchedulesService.updateSchedule(id, title, description, schedules, date)
            .then(({data}) => dispatch({type: schedulesActionType.UPDATE_SCHEDULE, payload: data}))
            .catch((e) => dispatch(SchedulesActionCreator.setError(e)))
    },
    deleteSchedule: (id) => (dispatch) => {
        dispatch(SchedulesActionCreator.setSchedulesIsLoad(true));
        return SchedulesService.deleteSchedule(id)
            .then(({data}) => dispatch({type: schedulesActionType.REMOVE_SCHEDULE, payload: data.id}))
            .catch((e) => dispatch(SchedulesActionCreator.setError(e)))
    }
};

export default SchedulesActionCreator;