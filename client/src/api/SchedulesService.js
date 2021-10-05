import $api from "./index";

export default class SchedulesService {
    static async fetchSchedules() {
        return $api.get('/api/v1/schedules');
    }

    static async addSchedule({title, description}) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        // formData.append('schedules', schedules);
        // formData.append('date', date);
        return $api.post('/api/v1/schedules', formData);
    }

    static async updateSchedule(id, title, description, schedules, date) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('schedules', schedules);
        formData.append('date', date);
        return $api.put('/api/v1/schedules/' + id, formData);
    }

    static async deleteSchedule(id) {
        return $api.delete('/api/v1/schedules/' + id);
    }

    static async getOneSchedule(id) {
        return  $api.get('/api/v1/schedules/' + id);
    }
}