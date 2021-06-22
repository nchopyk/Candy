import $api from '../http';

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export default class AuthService {
    static async login(login, password) {
        const loginValue = validateEmail(login) ? { email: login } : { username: login };
        return $api.post('auth/login', { ...loginValue, password });
    }

    static async registration(username, email, password) {
        return $api.post('auth/registration', { username, email, password });
    }

    static async logout() {
        return $api.post('auth/logout');
    }
}