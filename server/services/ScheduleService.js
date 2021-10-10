import Schedule from "../models/Schedule.js";
import User from "../models/User.js";
import moment from "moment";
import {WorkShifts} from "../utils/consts.js";

class ScheduleService {
    static async getAll() {
        return await Schedule.find();
    }

    static async getScheduleById(id) {
        return  await Schedule.findOne({_id: id});
    }

    static async getScheduleByName(title) {
        return  await Schedule.findOne({title});
    }

    static async addSchedule(schedule) {
        const candidate = await Schedule.findOne({title: schedule.title});

        if (candidate) {
            throw new Error("Already exist");
        }

        const {date} = schedule;

        const users = await User.find();

        const numberDaysOfMonth = moment(date).daysInMonth();
        const fullYear = moment(date).format('YYYY');
        const month = moment(date).format('M');
        const days = [];

        users.map(({_id}) => {
            for(let day = 1; day <= numberDaysOfMonth; day++){
                const date = moment(`${fullYear}-${month}-${day}`);
                const dow = date.day();
                if(dow === 6 || dow === 0){
                    days.push({
                        userId: _id,
                        date,
                        workShift: WorkShifts.WEEK_END
                    })
                }
            }
        });

        const newSchedule = new Schedule({...schedule, days});
        await newSchedule.save();
        return newSchedule;
    }

    static async updateSchedule(id, schedule) {
        return await Schedule.findOneAndUpdate(
            {_id: id},
            schedule,
            {new: true}
        );
    }

    static async removeSchedule(id) {
        return await Schedule.findOneAndDelete({_id: id});
    }
}

export default ScheduleService;