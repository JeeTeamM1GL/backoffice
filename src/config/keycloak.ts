

import Keycloak from 'keycloak-js';
import { message } from 'antd';

let initOptions = {
    url: 'http://localhost:8080',
    realm: 'booking-realm',
    clientId: 'booking-client',
    onLoad: 'login-required',
    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
};

const keycloak = new Keycloak(initOptions);

let keycloakInitPromise;

const initKeycloak = () => {
    if (!keycloakInitPromise) {
        keycloakInitPromise = keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
            if (authenticated) {
                sessionStorage.setItem('accessToken', keycloak.token);
                message.success('Bienvenue cher utilisateur');
                return keycloak.loadUserInfo().then(userInfo => {
                    sessionStorage.setItem('userInfos', JSON.stringify(userInfo));
                    return authenticated;
                });
            } else {
                keycloak.login();
                return authenticated;
            }
        }).catch(err => {
            console.error('Keycloak init failed', err);
            throw err;
        });

        keycloak.onTokenExpired = () => {
            message.info('Session expirée');
            keycloak.updateToken(30).catch(() => {
                keycloak.login();
            });
        };
    }

    return keycloakInitPromise;
};

export { keycloak, initKeycloak };

