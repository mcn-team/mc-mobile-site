import { browserHistory } from 'react-router';

import { SessionStorage, LocalStorage } from './browser-storages';

class AuthenticationHelper {
    constructor() {
        this.selectedStorage = SessionStorage;

        this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
        this.keepLoggedIn = this.keepLoggedIn.bind(this);
        this.saveCredentials = this.saveCredentials.bind(this);
        this.dropCredentials = this.dropCredentials.bind(this);
        this.getUserToken = this.getUserToken.bind(this);
    }

    isUserLoggedIn() {
        if (!!(SessionStorage.getItem('user') && SessionStorage.getItem('token'))) {
            this.selectedStorage = SessionStorage;
        } else if (!!(LocalStorage.getItem('user') && LocalStorage.getItem('token'))) {
            this.selectedStorage = LocalStorage;
        }

        return !!(this.selectedStorage.getItem('user') && this.selectedStorage.getItem('token'));
    }

    keepLoggedIn(value) {
        this.selectedStorage = value ? LocalStorage : SessionStorage;
    }

    saveCredentials(user, token) {
        this.selectedStorage.setItem('user', user);
        this.selectedStorage.setItem('token', token);
    }

    dropCredentials() {
        SessionStorage.removeItem('user');
        SessionStorage.removeItem('token');
        LocalStorage.removeItem('user');
        LocalStorage.removeItem('token');
        browserHistory.push('/');
    }

    getUserToken() {
        return this.selectedStorage.getItem('token');
    }
}

export const Authentication = new AuthenticationHelper();
