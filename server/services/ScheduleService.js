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

    static async addSchedule({title, description}) {
        const newSchedule = await Schedule.findOne({title});

        if (newSchedule) {
            throw new Error("Already exist");
        }

        const schedule = new Schedule({
            title,
            description
        });
        await schedule.save();

        return schedule;
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