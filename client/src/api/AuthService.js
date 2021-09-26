import $api from "./index";

export default class AuthService {
    static async login(username, password) {
        return $api.post('/api/v1/auth/login', {username, password})
    }

    static async checkAuth() {
        return $api.post('/api/v1/auth/check')
    }
}