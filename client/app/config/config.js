const baseUrl = 'https://m.dev.kaze-d.fr';
const versionNumber = '0.3.0';

export class Config {
    static get baseUrl() {
        return baseUrl;
    }

    static get version() {
        let versionLabel = 'v' + versionNumber;

        if (baseUrl.indexOf('.dev.') > 0 || baseUrl.indexOf('localhost') > 0) {
            versionLabel += ' - DEV BUILD';
        }

        return versionLabel;
    }
}
