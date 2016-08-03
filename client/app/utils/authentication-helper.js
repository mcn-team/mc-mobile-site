import { SessionStorage } from './browser-storages';

export class Authentication {
    static isUserLoggedIn() {
        return !!(SessionStorage.getItem('user') && SessionStorage.getItem('token'));
    }

    static saveCredentials(user, token) {
        SessionStorage.setItem('user', user);
        SessionStorage.setItem('token', token);

    }

    static dropCredentials() {
        SessionStorage.removeItem('user');
        SessionStorage.removeItem('token');
    }

    static getUserToken() {
        return SessionStorage.getItem('token');
    }
}
