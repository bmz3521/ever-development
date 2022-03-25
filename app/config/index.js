const env = process.env.NODE_ENV || 'defaultConfig';
let baseUrl = 'https://oma.consumer-hc-nonprod.everapp.io';
let strapiUrl = 'https://strapi.consumer-hc.everapp.io';

let config = {
  apiUrl: `${baseUrl}/api`,
  strapiUrl: `${strapiUrl}`,
};

if (env === 'production') {
  baseUrl = 'https://oma.consumer-hc-nonprod.everapp.io';
  strapiUrl = 'https://strapi.consumer-hc.everapp.io';
  config;
}

export default {
  ...config,
};
