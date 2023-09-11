import Client from './Client';

const Api = new Client({
  baseurl: process.env.VUE_APP_API_BASEURL,
  timeout: process.env.VUE_APP_API_TIMEOUT
});

export default Api;