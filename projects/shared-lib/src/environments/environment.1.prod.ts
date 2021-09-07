import env from './.env';

export const environment = {
  production: true,
  version: env.microfi_x_version,
  microfiPlatformTenantId: 'default',  // For connecting to server running elsewhere update the tenant identifier
  baseApiUrl: JSON.parse(localStorage.getItem('microfiXServerBranch')) || 'https://demo.fineract.dev',  // For connecting to server running elsewhere update the base API URL
  allowServerSwitch: env.allow_switching_backend_instance,
  apiProvider: '/fineract-provider/api',
  apiVersion: '/v1',
  serverUrl: '',
  oauth: {
    enabled: false,  // For connecting to Mifos X using OAuth2 Authentication change the value to true
    serverUrl: ''
  },
  defaultLanguage: 'en-US',
  supportedLanguages: [
    'en-US',
    'fr-FR'
  ],
  //By_steve_waffeu',
  api_url: 'http://localhost:8003',
  documentation_folder: './assets/'
};
