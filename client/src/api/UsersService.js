import $api from "./index";

export default class UsersService {
    static async fetchUsers() {
        return $api.get('/api/v1/users');
    }

    static async addUser(username, password, avatar) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('avatar', avatar);
        return $api.post('/api/v1/users', formData);
    }

    static async updateUser(id, username, password, avatar) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('avatar', avatar);
        return $api.put('/api/v1/users/' + id, formData);
    }

    static async deleteUser(id) {
        return $api.delete('/api/v1/users/' + id);
    }

    static async getOneUser(id) {
        return  $api.get('/api/v1/users/' + id);
    }
}