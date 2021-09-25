import $api from "./index";

export default class UsersService {
    static async fetchUsers() {
        return $api.get('/api/v1/users');
    }

    static async addUser(username, password) {
        return $api.post('/api/v1/users', {username, password});
    }
}