import Schedule from "../models/Schedule.js";

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

        const newSchedule = new Schedule(schedule);
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