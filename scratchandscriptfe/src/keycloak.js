import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'sscript',
    clientId: 'api',
    clientSecret: 'CUOoKmSmzsn8xoEkRphrJxpfBZ9rDg5G'

});

export default keycloak;