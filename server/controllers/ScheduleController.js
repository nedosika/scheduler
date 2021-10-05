import ScheduleService from "../services/ScheduleService.js";

class ScheduleController {
    static async getAll(req, res) {
        try {
            const schedules = await ScheduleService.getAll();
            res.status(200).json(schedules);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async create(req, res) {
        try {
            console.log(req.body)
            const addedSchedule = await ScheduleService.addSchedule(req.body);

            res.status(201).json(addedSchedule);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async getOne(req, res) {
        try {
            const schedule = await ScheduleService.getScheduleById(req.params.id);

            return res.status(200).json(schedule);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async update(req, res) {
        try {
            const schedule = await ScheduleService.updateSchedule(req.params.id, req.body);

            return res.status(200).json(schedule);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    static async delete(req, res) {
        try {
            const schedule = await ScheduleService.removeSchedule(req.params.id);
            return res.status(200).json(schedule)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default ScheduleController;
