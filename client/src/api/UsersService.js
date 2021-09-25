import $api from "./index";

export default class UsersService {
    static async fetchUsers() {
        return $api.get('/api/v1/users');
    }

    static async addUser(username, password) {
        return $api.post('/api/v1/users', {username, password});
    }

    static async updateUser(id, username, password) {
        return $api.put('/api/v1/users/' + id, {username, password});
    }

    static async deleteUser(id, username, password) {
        return $api.delete('/api/v1/users/' + id);
    }
}